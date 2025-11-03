import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalkulatory PCz - Politechnika Częstochowska",
  description: "Kalkulatory ocen z przedmiotów na Politechnice Częstochowskiej",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
