"use client";
import Sidebar from "@/components/modules/Sidebar/Sidebar";
import React from "react";
import StoreProvider from "../StoreProvide";
export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </StoreProvider>
  );
}
