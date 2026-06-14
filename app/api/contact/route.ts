import { Resend } from "resend";
import { NextResponse } from "next/server";

import {
  buildContactEmailHtml,
  validateContactPayload,
} from "@/lib/contact-email";

export const runtime = "nodejs";

const DEFAULT_TO = "Contact@fourwaymedia.com";
const DEFAULT_FROM = "Fourwaymedia <Contact@fourwaymedia.com>";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured. Set RESEND_API_KEY in the environment.",
        code: "CONTACT_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = validateContactPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: parsed.data.email,
    subject: `[Fourwaymedia Contact] ${parsed.data.subject}`,
    html: buildContactEmailHtml(parsed.data),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Could not send your message. Try again later.", code: "SEND_FAILED" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
