"use client";
import NavBar from "@/components/shared/NavBar";
import React from "react";
import StoreProvider from "../StoreProvide";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StoreProvider>
        <NavBar />
        <div className="min-h-screen">{children}</div>
        {/* <Footer /> */}
      </StoreProvider>
    </>
  );
}
