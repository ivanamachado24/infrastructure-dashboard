import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infra | Dashboard",
  description: "Minimalist Infrastructure Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased text-[#EDEDED] bg-[#000000] selection:bg-[#00FF41] selection:text-black`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-16 md:w-56 border-r border-[#333333]/30 flex flex-col items-center md:items-start py-10 px-0 md:px-8 transition-all duration-500 ease-in-out bg-[#000000]">
            <div className="mb-16 md:mb-20">
              <span className="text-xs font-bold tracking-widest text-[#EDEDED] uppercase hidden md:block">
                Infra
              </span>
              <span className="text-xs font-bold tracking-widest text-[#EDEDED] uppercase md:hidden">
                IN
              </span>
            </div>

            <nav className="flex flex-col gap-8 w-full items-center md:items-start">
              <a
                href="#"
                className="text-xs text-[#EDEDED] font-light transition-colors duration-300"
              >
                Overview
              </a>
              <a
                href="#"
                className="text-xs text-white/40 hover:text-white/80 font-light transition-colors duration-300"
              >
                Nodes
              </a>
              <a
                href="#"
                className="text-xs text-white/40 hover:text-white/80 font-light transition-colors duration-300"
              >
                Network
              </a>
              <a
                href="#"
                className="text-xs text-white/40 hover:text-white/80 font-light transition-colors duration-300"
              >
                Alerts
              </a>
            </nav>
          </aside>

          {/* Main Area */}
          <main className="flex-1 p-8 md:p-16 lg:p-24 overflow-x-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
