import type { Metadata } from "next";
import "./globals.css";
import { fontFaces } from "./fonts";

import { asset } from '@/lib/asset';
export const metadata: Metadata = {
  title: "Steps AI: Your AI agent for marketing, sales and support",
  description: "Send campaigns, answer customer questions, capture leads and book appointments. Your AI agent, customer messages and follow-ups in one platform.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: asset("/steps-favicon.png"),
    shortcut: asset("/steps-favicon.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontFaces }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

