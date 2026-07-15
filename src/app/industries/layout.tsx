import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | HeyGrow",
  description: "Discover how HeyGrow tailors custom business growth systems for logistics, healthcare, real estate, and more.",
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
