import { RoomsProvider } from "@/providers/Rooms";
import { SearchBarProvider } from "@/providers/SearchBarValues";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProviderWrapper from "../providers/ThemeProviderWrapper";
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
          <SearchBarProvider>
            <RoomsProvider>{children}</RoomsProvider>
          </SearchBarProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
