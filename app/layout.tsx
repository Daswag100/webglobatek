import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const creatoDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/CreatoDisplay-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/CreatoDisplay-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../assets/fonts/CreatoDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/CreatoDisplay-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/CreatoDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/CreatoDisplay-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/CreatoDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/CreatoDisplay-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/CreatoDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/CreatoDisplay-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/CreatoDisplay-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/CreatoDisplay-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../assets/fonts/CreatoDisplay-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/CreatoDisplay-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-creato-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Globatek Security Portal",
  description: "Supervisor dashboard for managing security guards and assignments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={creatoDisplay.variable}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}