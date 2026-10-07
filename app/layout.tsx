import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mara Content Lab | Source-Grounded B2B Editorial Studio",
  description:
    "Mara turns talks, essays, interviews, and podcasts into 1–2 high-authority, defensible LinkedIn posts for independent B2B founders, operators, and consultants.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://maracontentlab.com"),
  openGraph: {
    title: "Mara Content Lab | Source-to-Authority Sprint",
    description:
      "Turn one strong source into clear, authoritative LinkedIn content. Fixed $297 Sprint, delivered within 5 business days.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF9F6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
