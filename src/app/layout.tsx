import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });


export const metadata: Metadata = {
  title: "Khai Hung Luong - Portfolio",
  description: "A mix between a designer and a developer, I am a creative and tech-savvy individual with a passion for innovation and problem-solving. With a background in 2D/3D graphic design and full-stack development, I am well-versed in creating visually stunning and functional websites.",
  openGraph: {
    type: "website",
    url: "https://khaihungluong.com",
    title: "Khai Hung Luong - Portfolio",
    description: "A mix between a designer and a developer, I am a creative and tech-savvy individual with a passion for innovation and problem-solving. With a background in 2D/3D graphic design and full-stack development, I am well-versed in creating visually stunning and functional websites.",
    images: [
      {
        url: "https://khaihungluong.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Khai Hung Luong - Portfolio",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
