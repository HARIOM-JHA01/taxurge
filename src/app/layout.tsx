"use client";
import { Inter } from "next/font/google";
import "../styles/index.css";
import "node_modules/react-modal-video/css/modal-video.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" data-theme="dark">
      <head />
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
