"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NodeMonitorProvider } from "@/hooks/useNodeMonitor";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", path: "/" },
    { name: "Nodes", path: "/nodes" },
    { name: "Network", path: "/network" },
    { name: "Alerts", path: "/alerts" },
  ];

  return (
    <html lang="en">
      <head>
        <title>Infra | Dashboard</title>
        <meta name="description" content="Minimalist Infrastructure Monitoring Dashboard" />
      </head>
      <body
        className={`font-sans antialiased text-[#EDEDED] bg-[#000000] selection:bg-[#00FF41] selection:text-black`}
      >
        <NodeMonitorProvider>
          <div className="flex min-h-screen">
            {/* Sidebar Toggle for Mobile */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-zinc-950 border-b border-zinc-800 z-50 flex items-center justify-between p-4 px-6 relative">
              <span className="text-sm font-bold tracking-widest text-[#EDEDED] uppercase">
                Infra
              </span>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-400 p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 md:w-56 border-r border-[#333333]/30 flex flex-col items-start py-10 px-8 transition-transform duration-500 ease-in-out bg-[#000000]
              ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:sticky md:top-0 md:h-screen
            `}>
              <div className="mb-20 mt-10 md:mt-0">
                <span className="text-xs font-bold tracking-widest text-[#EDEDED] uppercase block">
                  Infra
                </span>
              </div>

              <nav className="flex flex-col gap-8 w-full items-start">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm md:text-xs font-light transition-colors duration-300 ${
                      pathname === item.path
                        ? "text-white"
                        : "text-white/40 hover:text-white/80"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </aside>
            
            {/* Mobile Overlay */}
            {mobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Main Area */}
            <main className="flex-1 p-8 md:p-16 lg:p-24 overflow-x-hidden">
              {children}
            </main>
          </div>
        </NodeMonitorProvider>
      </body>
    </html>
  );
}
