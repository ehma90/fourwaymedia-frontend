import type { Metadata } from "next";
import { Bitter, Lexend } from "next/font/google";
import "./globals.css";
import { ImageProtection } from "@/components/ImageProtection";
import { ThemeProvider } from "@/context/theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { themeInitScript, THEME_STORAGE_KEY } from "@/lib/theme-init";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const FAVICON_URL =
  "https://res.cloudinary.com/drrluhcad/image/upload/v1786667623/2026-08-14_1.33.18_AM_uplo2z.jpg";

export const metadata: Metadata = {
  title: "Fourlabs Studio",
  description:
    "Fourlabs Studio is a creative agency that provides branding, content creation, web and mobile development, and social media management services.",
  icons: {
    icon: FAVICON_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${bitter.variable} ${lexend.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey={THEME_STORAGE_KEY}
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <ImageProtection />
      </body>
    </html>
  );
}
