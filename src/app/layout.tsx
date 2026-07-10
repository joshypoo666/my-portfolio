import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joshua D. Taylor — Designer",
  description: "Design portfolio of Joshua D. Taylor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.className} h-full`}>
      <body className="min-h-full flex flex-col">
        {/* CRT overlay layers */}
        <div className="crt-scanlines" />
        <div className="crt-vignette" />
        <div className="crt-grain" />
        <div className="crt-bar" />
        <div className="crt-wrap" />
        <div className="crt-glitch-overlay" />

        {/* Page content */}
        <div className="crt-content flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
