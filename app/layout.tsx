/** @format */

import type { Metadata } from "next";
import { ThemeProvider } from "@/modules/common/components/theme-provider";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/dancing-script";
import "@fontsource-variable/raleway";
import "./globals.css";
import ClientProvider from "@/layout/components/client-provider";
import { Toaster } from "@/modules/common/ui/sonner";

export const metadata: Metadata = {
  title: "ReelBlend",
  description:
    "Discover the latest movies and build your personalized watchlist with our movie app. Explore trending films, get detailed movie info, and track your favorites—all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            disableTransitionOnChange>
            <div id='overlay' />
            <ClientProvider>{children}</ClientProvider>
            
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
