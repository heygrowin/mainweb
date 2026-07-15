import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HeyGrow | Business Growth Systems",
  description: "We study businesses, identify operational bottlenecks, design intelligent systems, and build connected products that help businesses unlock their hidden potential. Bringing AI, automation, and software into one connected ecosystem.",
  keywords: ["Business Growth Systems", "Workflow Automation", "Custom CRM", "Operations Intelligence", "Business Optimization", "Enterprise Dashboard", "HeyGrow"],
  authors: [{ name: "HeyGrow" }],
  openGraph: {
    title: "HeyGrow | Business Growth Systems",
    description: "We study businesses, identify operational bottlenecks, design intelligent systems, and build connected products that help businesses unlock their hidden potential.",
    url: "https://heygrow.in",
    siteName: "HeyGrow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeyGrow | Business Growth Systems",
    description: "We study businesses, identify operational bottlenecks, design intelligent systems, and build connected products that help businesses unlock their hidden potential.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} antialiased h-full`}>
      <body className="font-sans bg-neutral-bg text-secondary min-h-full flex flex-col selection:bg-primary/20 selection:text-primary">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
