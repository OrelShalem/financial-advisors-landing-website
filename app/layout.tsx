import type { Metadata, Viewport } from "next";
import { Heebo, Rubik, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: "LMM - Love, Mind & Money by Oshri Shalem",
  description: "Professional financial consulting for young couples - Financial planning, budget management, and long-term investments | ייעוץ כלכלי מקצועי לזוגות צעירים",
  icons: {
    icon: [
      {
        url: "/images/lmm-icon.png",
        type: "image/png",
        sizes: "32x32"
      },
      {
        url: "/images/lmm-icon.png",
        type: "image/png",
        sizes: "16x16"
      }
    ],
    apple: [
      {
        url: "/images/lmm-icon.png",
        type: "image/png",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/images/lmm-icon.png" }],
    other: [
      {
        rel: "icon",
        url: "/images/lmm-icon.png",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/lmm-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/lmm-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/lmm-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-heebo bg-gradient-to-b from-rose-50/50 to-white">
        {children}
      </body>
    </html>
  );
}
