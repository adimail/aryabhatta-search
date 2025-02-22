import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Nav, Footer } from "@/components/common";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const siteConfig = {
  name: "Aryabhatta Search",
  description: "Search for anything with Aryabhatta Search",
  url: "http://localhost:3000",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["Aryabhatta Search", "Search", "Tools"],
  authors: [
    {
      name: "Aditya Godse",
      url: "https://adimail.github.io",
    },
    {
      name: "Rishabh Kothari",
    },
    {
      name: "Rohit Kshirsagar",
    },
    {
      name: "Shreya Kulkarni",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <SessionProvider>
        <body className="mt-20 bg-gray-100 md:mt-32">
          <Nav />
          {children}
          <Footer />
          <Toaster position="top-center" richColors />
        </body>
      </SessionProvider>
    </html>
  );
}
