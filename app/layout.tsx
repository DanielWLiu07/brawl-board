import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam, Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { RootWrapper } from "@/components/root-wrapper";
import { LandingProvider } from "@/providers/landing-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-handwriting-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const caveat = Caveat({
  variable: "--font-handwriting-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-handwriting-patrick",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Game Strategy Whiteboard | Plan Your Team's Victory",
  description: "Real-time collaborative whiteboard for competitive gaming. Plan strategies for Brawl Stars, Clash Royale, League of Legends, and more with 1000+ game assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} ${caveat.variable} ${patrickHand.variable} antialiased`}>
          <LandingProvider>
            <RootWrapper>{children}</RootWrapper>
          </LandingProvider>
      </body>
    </html>
  );
}
