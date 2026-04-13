import type { Metadata } from "next";
import { Poppins, Anton, Alex_Brush, Passion_One } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav"; // Import
import { PendingPaymentBar } from "@/components/donation/PendingPaymentBar";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayoutWrapper } from "@/components/layout/MainLayoutWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

const passionOne = Passion_One({
  subsets: ["latin"],
  variable: "--font-passion",
  weight: ["400", "700", "900"],
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
    <html lang="id" className={`${poppins.variable} ${anton.variable} ${alexBrush.variable} ${passionOne.variable}`} suppressHydrationWarning>
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
