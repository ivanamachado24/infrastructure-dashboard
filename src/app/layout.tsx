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
          <div className="flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden">
            
            {/* Mobile Top Header (replaces hamburger bar) */}
            <header className="md:hidden sticky top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-[#333333]/30 z-40 flex items-center justify-center p-4">
              <span className="text-sm font-bold tracking-widest text-[#EDEDED] uppercase">
                Infra
              </span>
            </header>

            {/* Desktop Sidebar (Hidden on mobile) */}
            <aside className="hidden md:flex flex-col z-40 w-64 md:w-56 border-r border-[#333333]/30 items-start py-10 px-8 bg-[#000000] md:sticky md:top-0 md:h-screen">
              <div className="mb-20">
                <span className="text-xs font-bold tracking-widest text-[#EDEDED] uppercase block">
                  Infra
                </span>
              </div>

              <nav className="flex flex-col gap-8 w-full items-start">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`text-sm font-light transition-colors duration-300 ${
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

            {/* Main Content Area */}
            {/* Added bottom padding on mobile to account for the fixed nav bar */}
            <main className="flex-1 w-full min-w-0 px-4 py-8 md:p-10 lg:p-16 pb-28 md:pb-10 overflow-x-hidden">
              {children}
            </main>

            {/* Mobile Bottom Navigation Bar (Appears only on mobile) */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#000000]/95 backdrop-blur-lg border-t border-[#333333]/50 z-50 flex items-center justify-around px-2 py-4 pb-safe">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    pathname === item.path 
                      ? "text-white" 
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-wider">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </NodeMonitorProvider>
      </body>
    </html>
  );
}
