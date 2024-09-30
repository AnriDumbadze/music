"use client"; // Make sure to include this at the top if you're using React hooks

import React from "react";
import { Cookie, Inter } from "next/font/google";
import "./globals.css";
import Player from "./Components/ComputerPlayer/ComputerPlayer"; // Import the Player component
import { usePathname } from 'next/navigation';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import Icon from "./Components/Icon/Icon";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter() 
  // Log the current path for debugging
  console.log("Current Path:", pathname);

  // Check if the current path is NOT '/adminArtist', '/Login', or '/SignIn'
  const showPlayer = pathname !== '/adminArtist' && pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/userList' && pathname !== '/adminMusic';
  const showexit =  pathname !== '/Login' && pathname !== '/SignUp';
  const click = () => {
    Cookies.remove('userToken')
    router.replace("http://localhost:3000/Login")
  }
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        {children}
        {showPlayer &&
        <>
       
          <Player />
        </>
      } 
      {showexit && 
         <FloatButton
         shape="circle"
         onClick={click}
         style={{ insetInlineEnd: 94 }}
         icon={<Icon name="exit"/>}
       />
      }
      {/* Render Player only if the path is not '/adminArtist', '/Login', or '/SignIn' */}
      </body>
    </html>
  );
}
