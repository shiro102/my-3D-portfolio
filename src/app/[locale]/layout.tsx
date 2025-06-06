import type { Metadata } from "next";
import { Tai_Heritage_Pro, Poppins } from "next/font/google";
import "../../app/globals.css";
import TransitionProvider from "@/components/react/transitionProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import DarkModeClientProvider from "@/components/react/context/DarkModeClientProvider";
import TranslationsProvider from "@/lib/translator/TranslationsProvider";
import initTranslation from "../i18n";

// namespaces for translations
const i18nNamespaces = ["default"];

// font for the website
const taipro = Tai_Heritage_Pro({
  weight: ["400", "700"],
  subsets: ["tai-viet"],
  variable: "--font-tai-heritage-pro",
});
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Khai Hung Luong - Portfolio",
  description:
    "A mix between a designer and a developer, I am a creative and tech-savvy individual with a passion for innovation and problem-solving. With a background in 2D/3D graphic design and full-stack development, I am well-versed in creating visually stunning and functional websites.",
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
    type: "website",
    url: "https://khaihung.dev",
    title: "Khai Hung Luong - Portfolio",
    description:
      "A mix between a designer and a developer, I am a creative and tech-savvy individual with a passion for innovation and problem-solving. With a background in 2D/3D graphic design and full-stack development, I am well-versed in creating visually stunning and functional websites.",
    images: [
      {
        url: "https://drive.google.com/thumbnail?id=1X7d1TV0N68MAEhTxzgjnEMyFlEg5MrO3&sz=w1000",
        width: 1200,
        height: 630,
        alt: "Khai Hung Luong - Portfolio",
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { resources } = await initTranslation(locale, i18nNamespaces);

  return (
    <TranslationsProvider // Wrap to translate any client side component using useTranslation hook from react-i18next
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <html lang="en">
        <body className={`antialiased ${poppins.className} ${taipro.variable}`}>
          <DarkModeClientProvider>
            <TransitionProvider locale={locale}>{children}</TransitionProvider>
          </DarkModeClientProvider>
          <SpeedInsights />
          <Analytics />
          <Toaster />
        </body>
      </html>
    </TranslationsProvider>
  );
}
