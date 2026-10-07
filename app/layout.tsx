import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./corrections.css";
import "./industries.css";
import "./reviews.css";
import "./hero-channels.css";

export const metadata: Metadata = {
  title: "Steps AI — Your AI agent for marketing, sales and support",
  description: "Send campaigns, answer customer questions, capture leads and book appointments. Your AI agent, customer messages and follow-ups in one platform.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}




import "./integrations.css";
