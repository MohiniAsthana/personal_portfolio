import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohini Asthana — Technical Product Leader",
  description: "Technical Product Leader, Human-AI Systems Researcher, and simplifier of complex technology for the humans who use it.",
  keywords: ["Mohini Asthana", "Product Manager", "Technical Product Leader", "Human-AI", "Research", "NTU", "Delphix", "Cisco"],
  openGraph: {
    title: "Mohini Asthana — Technical Product Leader",
    description: "Technical Product Leader, Human-AI Systems Researcher, and simplifier of complex technology for the humans who use it.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
