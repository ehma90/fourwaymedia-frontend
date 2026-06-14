export type ContactFormPayload = {
  name: string;
  company?: string;
  phone?: string;
  email: string;
  subject: string;
  message: string;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmailHtml(payload: ContactFormPayload): string {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "—"],
    ["Phone", payload.phone || "—"],
    ["Subject", payload.subject],
  ] as const;

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
      <h2 style="margin:0 0 16px;font-size:20px;">New contact form message</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e5e7eb;">
        ${tableRows}
      </table>
      <p style="margin:20px 0 8px;font-weight:600;">Message</p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();
}

export function validateContactPayload(body: unknown):
  | { ok: true; data: ContactFormPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;
  const name = String(record.name ?? "").trim();
  const email = String(record.email ?? "").trim();
  const subject = String(record.subject ?? "").trim();
  const message = String(record.message ?? "").trim();
  const company = String(record.company ?? "").trim();
  const phone = String(record.phone ?? "").trim();

  if (!name) return { ok: false, error: "Name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!subject) return { ok: false, error: "Subject is required." };
  if (!message || message.length < 10) {
    return { ok: false, error: "Message must be at least 10 characters." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      subject,
      message,
      ...(company ? { company } : {}),
      ...(phone ? { phone } : {}),
    },
  };
}
