import type { Metadata } from "next";
import { Oxygen } from "next/font/google";
import "./globals.css";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Moiz Alam · Product Manager",
    description: "Product Manager focused on building intuitive products that solve real-world problems.",
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
    </html>
  );
}
