import type { Metadata } from "next";
import {Poppins} from "next/font/google";


import "./globals.css";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600"]
});


export const metadata: Metadata = {
  title: "Alugar Carro em Lisboa - PT",
  description: "Alugue seu Carro em Lisboa - Portugal",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="pt-PT">
      <body className={poppins.className}>
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
