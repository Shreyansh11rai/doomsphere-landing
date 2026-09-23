import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { brand } from "@/config/brand";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const PoppinsFont = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: brand.name,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  keywords: [
    "digital services",
    "web design",
    "business automation",
    "WhatsApp automation",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: brand.icons.favicon, sizes: "48x48", type: "image/x-icon" },
      { url: brand.icons.icon, sizes: "96x96", type: "image/png" },
      { url: brand.icons.svgIcon, sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: brand.icons.favicon,
    apple: [{ url: brand.icons.apple, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
    title: brand.name,
    description: brand.description,
  },
  twitter: {
    card: "summary",
    title: brand.name,
    description: brand.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: "digital services",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`max-h-screen relative bg-canvas font-sans text-foreground ${PoppinsFont.className}`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
