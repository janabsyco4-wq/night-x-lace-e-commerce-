import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile-responsive.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Night x Lace - Women's Undergarments",
  description: "Unlock Your Midnight Desire - Premium women's undergarments, lingerie, and intimate wear",
  keywords: "lingerie, bras, panties, sleepwear, shapewear, women undergarments",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-y-auto overflow-x-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
