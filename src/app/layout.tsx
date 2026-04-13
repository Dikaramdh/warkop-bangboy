import type { Metadata } from "next";
import { Nunito_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/layoutClient";   
import { CartProvider } from "@/components/cartContext";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Warkop bangboy - Kopi Asli',
  description: 'Nikmati cita rasa kopi tradisional dengan suasana hangat dan ramah',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${playfairDisplay.variable} antialiased`}
      >
        <LayoutClient>
          <CartProvider>
            {children}
          </CartProvider>
        </LayoutClient>
      </body>
    </html>
  );
}
