import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit as it resembles the font in the image
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"; // Import
import { PendingPaymentBar } from "@/components/donation/PendingPaymentBar";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayoutWrapper } from "@/components/layout/MainLayoutWrapper";

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
      <body className="font-sans transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayoutWrapper
            navbar={<Navbar />}
            footer={<Footer />}
            mobileNav={<MobileBottomNav />}
            pendingBar={<PendingPaymentBar />}
          >
            {children}
          </MainLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
