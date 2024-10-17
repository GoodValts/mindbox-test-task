import { B612 } from "next/font/google";

import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Mindbox test task",
  description: "TODO app",
};

const b612 = B612({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={b612.className}>
      <body>{children}</body>
    </html>
  );
}
