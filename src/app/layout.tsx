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
  title: "JsonXmlBeatifuer | Real-Time JSON & XML Formatter & Validator Studio",
  description: "Free, lightning-fast JSON and XML beautifier, formatter, minifier, real-time validator, interactive tree explorer, and bidirectional converter built with Next.js 15 and React 19.",
  keywords: ["JSON Beautifier", "XML Beautifier", "JSON Formatter", "XML Formatter", "JSON Validator", "XML to JSON", "JSON to XML Converter", "Tree View", "Next.js"],
  authors: [{ name: "mertyunus", url: "https://github.com/mertyunus" }],
  openGraph: {
    title: "JsonXmlBeatifuer | Professional JSON & XML Studio",
    description: "Format, minify, validate, explore, and convert JSON and XML data in real-time with a modern 3-column dual-editor studio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
