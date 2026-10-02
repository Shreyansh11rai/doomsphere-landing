import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { brand } from "@/config/brand.config";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { QueryProvider } from "@/components/layout/QueryProvider";
import { Toaster } from "sonner";

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
        <Toaster position="top-center" />
        {/* <ThemeProvider> */}
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
        {/* </ThemeProvider> */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
