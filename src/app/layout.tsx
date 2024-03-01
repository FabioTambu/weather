import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBmtGZZRnvIsHDwNRaQ9-H328YOzYrB-F0",
  authDomain: "weather-6be17.firebaseapp.com",
  projectId: "weather-6be17",
  storageBucket: "weather-6be17.appspot.com",
  messagingSenderId: "812756390786",
  appId: "1:812756390786:web:5a2c0f705752cc2257f59b"
};

const app = initializeApp(firebaseConfig);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
