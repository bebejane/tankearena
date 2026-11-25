import "./globals.scss";
import type { Metadata } from "next";
import { DraftModeContentLink } from 'next-dato-utils/components';

export const metadata: Metadata = {
  title: "TankeArena för Kultur",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body>{children}</body>
      <DraftModeContentLink />
    </html>
  );
}
