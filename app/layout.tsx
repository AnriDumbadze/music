import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Player from "./Components/ComputerPlayer/ComputerPlayer"; // Import the Player component

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        {children}
        <Player /> 
      </body>
    </html>
  );
}
