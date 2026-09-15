import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Digital Experiences & Software`,
  description:
    "I build websites, web applications, and software that are fast, functional, and thoughtfully crafted.",
  openGraph: {
    title: `${profile.name} — Digital Experiences & Software`,
    description:
      "I build websites, web applications, and software that are fast, functional, and thoughtfully crafted.",
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
      className={`${inter.variable} ${fraunces.variable} ${mono.variable} antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-primary">
        {children}
      </body>
    </html>
  );
}