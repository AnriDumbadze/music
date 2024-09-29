"use client"
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Player from "./Components/ComputerPlayer/ComputerPlayer"; // Import the Player component
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname

  // Log the current path for debugging
  console.log("Current Path:", pathname);

  // Check if the current path is NOT '/adminArtist'
  const showPlayer = pathname !== '/adminArtist';
  const showLoginPlayer = pathname !== '/Login'
  const showsignPlayer = pathname !== '/Login'
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        {children}
        {showPlayer || showLoginPlayer || showsignPlayer && <Player />} {/* Render Player only if the path is not '/adminArtist' */}
      </body>
    </html>
  );
}
