import type { Metadata } from "next";
import { Bitter, Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { themeInitScript, THEME_STORAGE_KEY } from "@/lib/theme-init";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fourwaymedia",
  description: "Fourwaymedia is a creative agency that provides branding, content creation, web and mobile development, and social media management services.",
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
      <body className={`${bitter.variable} ${lexend.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey={THEME_STORAGE_KEY}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
