import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Site metadata
export const metadata: Metadata = {
  title: {
    default: "nexpay Hub – Multi-Payment Integration",
    template: "%s | nexpay Hub",
  },
  description:
    "A modern Next.js application showcasing seamless integration with multiple payment gateways like Razorpay, PayPal, PhonePe, and Cashfree. Built by Syed Adnan Ali.",
  authors: [
    {
      name: "Syed Adnan Ali",
      url: "https://adnanthecoder.com",
    },
  ],
  keywords: [
    "Next.js",
    "Payment Integration",
    "Stripe",
    "Razorpay",
    "Cashfree",
    "PayPal",
    "PhonePe",
    "React",
    "Tailwind CSS",
    "TypeScript",
  ],
  metadataBase: new URL("https://nexpayhub.vercel.app"), // replace with your actual deployed domain
  openGraph: {
    title: "nexpay Hub – Multiple Payment Gateway Integration",
    description:
      "Explore a powerful starter template for integrating multiple payment providers using Next.js, TypeScript, and Tailwind CSS.",
    url: "https://nex--pay.vercel.app",
    siteName: "nexpay Hub",
    images: [
      {
        url: "/og-image.png", // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "nexpay Hub – Multi-Payment Integration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nexpay Hub",
    description:
      "Multiple payment gateway integration demo with Razorpay, PayPal, PhonePe & more – built with Next.js by Syed Adnan Ali.",
    creator: "@adnanthecoder",
    images: ["/og-image.png"],
  },
  creator: "Syed Adnan Ali",
  publisher: "Syed Adnan Ali",
  themeColor: "#0f172a",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
