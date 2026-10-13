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

import "./inbox-preview.css";

import "./journey-polish.css";
import "./typography.css";
import "./team-story.css";

import "./inbox-finish.css";

import "./team-story-options.css";

import "./focused-inbox.css";
import "./product-story.css";
import "./engage-story.css";
import "./setup-story.css";
import "./subpages.css";
import "./integration-pages.css";
import "./integrations-hub.css";
import "./case-studies.css";
import "./compare.css";
import "./site-motion.css";
import "./broadcast-page.css";
import "./premium.css";
import "./company.css";
import "./analytics-mock.css";
import "./app-mocks.css";
import "./connect-flow.css";
import "./book-demo.css";
import "./blog-help.css";
import "./help-hub.css";
import "./case-studies-clean.css";
import "./v2.css";
import "./nav-pill.css";
import "./motion.css";
import "./journey-stack.css";
import "./broadcast.css";
import "./surfaces.css";
import "./v2-mockups-messaging.css";
import "./capability-stage.css";
import "./visual-stories.css";
import "./setup-journey.css";
