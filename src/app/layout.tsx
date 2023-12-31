import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trello-clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="background-gradient">
      <body className="relative">
        {children}
      </body>
    </html>
  );
}
