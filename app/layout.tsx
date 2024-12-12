import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ReduxProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FakerShop",
  description:
    "A modern, responsive e-commerce application using Next.js, Tailwind CSS, and React technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const classes = clsx(geistSans.variable, geistMono.variable, "antialiased");

  return (
    <html lang="en">
      <ReduxProvider>
        <body className={classes}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
