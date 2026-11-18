import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "TankeArena för Kultur",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
