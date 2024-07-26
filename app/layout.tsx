/** @format */

import type { Metadata } from "next";
import { ThemeProvider } from "@/modules/common/components/theme-provider";
import "@fontsource-variable/raleway";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
