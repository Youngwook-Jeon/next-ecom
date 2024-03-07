import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Notification from "@components/Notification";
import AuthSession from "@components/AuthSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Ecom",
  description: "Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSession>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Notification />
        </body>
      </html>
    </AuthSession>
  );
}
