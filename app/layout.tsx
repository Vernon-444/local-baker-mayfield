import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baker Mayfield's Cheesecakes",
  description: "Delicious handmade cheesecakes, baked with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
