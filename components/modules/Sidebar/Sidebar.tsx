/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Calendar", icon: CalendarDays, href: "/calendar" },
  ];

  return (
    <aside
      className={cn(
        "relative h-screen bg-white border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Image src="/images/logo.png" alt="site_logo" width={32} height={32} />
        {!collapsed && (
          <h1 className="text-xl font-bold text-foreground">Scheduler</h1>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-5 z-10 p-1 bg-white border border-border rounded-full shadow hover:bg-gray-100"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Menu */}
      <nav className="flex flex-col mt-4 space-y-2 px-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors duration-200",
                  isActive
                    ? "bg-black text-white hover:bg-black"
                    : "hover:bg-muted text-foreground"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 w-full p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-foreground">
                Craig Franci
              </p>
              <p className="text-xs text-muted-foreground">cfranci@mail.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
