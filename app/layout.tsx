import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { AppProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MLera · Linear Regression Learning Module",
  description:
    "Interactive linear regression module built with Next.js, Tailwind CSS, and a persistent dark/light theme toggle.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans text-foreground", inter.className)}>
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-primary/5 dark:to-primary/10" />
            <Navbar />
            <main className="flex-1 pb-16">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}

