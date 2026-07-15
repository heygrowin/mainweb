import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | HeyGrow",
  description: "Frequently asked questions about HeyGrow's consulting, custom systems, and SaaS product integration.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
