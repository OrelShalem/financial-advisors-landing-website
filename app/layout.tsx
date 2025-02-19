import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import "./globals.css";

const heebo = Heebo({ 
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-heebo',
})

const rubik = Rubik({ 
  subsets: ['latin', 'hebrew'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-rubik',
})

export const metadata: Metadata = {
  title: "אושרי שלם - ייעוץ כלכלי לזוגות צעירים",
  description: "ייעוץ כלכלי מקצועי לזוגות צעירים - תכנון פיננסי, ניהול תקציב והשקעות לטווח ארוך",
  icons: {
    icon: [
      {
        url: "/images/idevibelogo.png",
        type: "image/png",
        sizes: "32x32"
      },
      {
        url: "/images/idevibelogo.png",
        type: "image/png",
        sizes: "16x16"
      }
    ],
    apple: [
      {
        url: "/images/idevibelogo.png",
        type: "image/png",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/images/idevibelogo.png" }],
    other: [
      {
        rel: "icon",
        url: "/images/idevibelogo.png",
      },
    ],
  },
  manifest: "/manifest.json",
  viewport: {
    width: 'device-width',
    initialScale: 1
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/idevibelogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/idevibelogo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/idevibelogo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${heebo.variable} ${rubik.variable} font-heebo bg-gradient-to-b from-rose-50/50 to-white`}>
        {children}
      </body>
    </html>
  );
}
