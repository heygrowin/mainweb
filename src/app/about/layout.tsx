import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | HeyGrow",
  description: "Learn more about HeyGrow and our mission to optimize and automate business workflows with intelligent systems.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
