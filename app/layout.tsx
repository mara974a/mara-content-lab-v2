import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mara Content Lab",
  description: "Source-grounded editorial support for founders and operators.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
