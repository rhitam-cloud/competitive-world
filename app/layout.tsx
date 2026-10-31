import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ModeBanner } from "@/components/layout/ModeBanner";

export const metadata: Metadata = {
  title: "Competitive World - Premier SSC CGL & CHSL Mock Test Platform",
  description:
    "Ace SSC CGL and SSC CHSL with India's premier online examination preparation engine. Real examination interface, TCS pattern mocks, step-by-step bilingual explanations, and accurate national ranking.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen flex-col font-sans antialiased bg-slate-50 text-slate-900">
        <ModeBanner />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
