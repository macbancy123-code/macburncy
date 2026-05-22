import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://macbancy.com"),
  title: "Mac Bancy Perfume | Exquisite Fragrances",
  description: "Experience the art of luxury perfumery with Mac Bancy Perfume.",
  openGraph: {
    title: "Mac Bancy Perfume | Exquisite Fragrances",
    description: "Experience the art of luxury perfumery with Mac Bancy Perfume.",
    url: "https://macbancy.com",
    siteName: "Mac Bancy Perfume",
    images: [
      {
        url: "/mac-og.jpg",
        width: 1200,
        height: 630,
        alt: "Mac Bancy Perfume",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mac Bancy Perfume | Exquisite Fragrances",
    description: "Experience the art of luxury perfumery with Mac Bancy Perfume.",
    images: ["/mac-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Mac Bancy Perfume",
              url: "https://macbancy.com",
              logo: "https://macbancy.com/icon.png",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
