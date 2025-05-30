import { SearchBarProvider } from "@/components/providers/SearchBarValues";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProviderWrapper from "../components/providers/ThemeProviderWrapper";
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
  title: "HotelGo",
  description: "Na wszystkie Twoje podróże",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProviderWrapper>
          <SearchBarProvider>{children}</SearchBarProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
