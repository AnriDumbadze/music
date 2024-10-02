// RootLayout.jsx
import React from "react";
import { Cookie, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();



  const showPlayer = pathname !== '/adminArtist' && pathname !== '/Login' && pathname !== '/SignUp' && pathname !== '/userList' && pathname !== '/adminMusic';
  const showExitButton = pathname !== '/Login' && pathname !== '/SignUp';

  const handleLogout = () => {
    Cookies.remove('userToken');
    router.replace("/Login");
  
  };

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
