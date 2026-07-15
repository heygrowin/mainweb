import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Products | HeyGrow",
  description: "Explore HeyGrow's suite of interconnected SaaS products, including CRM engines, billing systems, and inventory suites.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
