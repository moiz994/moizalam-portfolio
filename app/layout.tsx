import type { Metadata } from "next";
import { Oxygen } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

// GA4 measurement ID. Safe to keep in source: it ships in the page HTML either
// way, and this is a static export so there is no server to read an env var.
// Paste the "G-" ID from Google Analytics > Admin > Data streams here.
const GA_MEASUREMENT_ID = "G-73Y853PV1S";

const oxygen = Oxygen({
  variable: "--font-oxygen",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moizalam.com"),
  title: "Moiz Alam · Product Manager",
  description: "Product Manager focused on building intuitive products that solve real-world problems.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Moiz Alam · Product Manager",
    description: "Product Manager focused on building intuitive products that solve real-world problems.",
    url: "https://moizalam.com",
    siteName: "Moiz Alam",
    type: "website",
    locale: "en_US",
    // a static file rather than a generated route: GitHub Pages picks the
    // content-type from the extension, and share crawlers require image/png
    images: ["/og-card.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moiz Alam · Product Manager",
    description: "Product Manager focused on building intuitive products that solve real-world problems.",
    images: ["/og-card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oxygen.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          // Fontshare rejects requests with a localhost referer, which silently
          // dropped Satoshi in local dev — so send no referer at all
          referrerPolicy="no-referrer"
        />
      </head>
      <body style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>{children}</body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
