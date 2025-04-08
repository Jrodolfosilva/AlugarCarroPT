
import React from "react";

import {Poppins} from "next/font/google";
import "./globals.css";
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import { ApiContext } from "@/component/context/useContext";
import { Metadata } from "next";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600"]
});

export const metadata: Metadata = {
  title: "Luxury Wheels",
  description: "Alugue seu Carro em Lisboa - Portugal",
};




export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    
        <html lang="pt-PT">
          <ApiContext>           
              <body className={poppins.className}>
                <Header/>
                <main>
                  {children}
                </main>
                <Footer/>
              </body>
            </ApiContext>
        </html>
   
  );
}


