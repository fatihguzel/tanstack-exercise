import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";  


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tanstack Exercise",
  description: "Tanstack Exercise",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <Providers> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 max-w-screen-2xl mx-auto`}
      >
         
            <Navbar />
            {children}
      </body>
    </Providers>
    </html>
  );
}
