import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "weather-6be17.firebaseapp.com",
  projectId: "weather-6be17",
  storageBucket: "weather-6be17.appspot.com",
  messagingSenderId: "812756390786",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather"
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
