import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme_provider";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Separator } from "@/components/ui/separator";
import { CodeProvider } from "./context/codeContext";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Judge",
  description: "Simulation of an Online Judge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
          <CodeProvider>
            <Navbar/>
            <Separator/>
            {children}
            <Separator/>
            <Footer/>
          </CodeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
