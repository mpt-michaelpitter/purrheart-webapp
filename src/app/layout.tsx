import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit as it resembles the font in the image
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"; // Import
import { PendingPaymentBar } from "@/components/donation/PendingPaymentBar";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "purrhearth - Platform Donasi Terpercaya",
  description: "Bantu sesama, wujudkan harapan. Donation platform for a better future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={outfit.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 bg-slate-50/50 dark:bg-background pb-20 md:pb-0"> {/* Added pb-20 for mobile bottom nav space */}
            {children}
          </main>
          <Footer />
          <PendingPaymentBar />
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
