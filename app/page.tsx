"use client";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Connect from "./_components/Connect";
import { Divide, Github, Ticket } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import Main from "./_components/Main";
import { Toaster } from "@/components/ui/sonner";





export default function Home() {
  const wallet = useWallet()
  console.log(wallet)
  return (
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center w-full text-white ">
      <Toaster/>
      <div className="border backdrop-blur-sm bg-black/50 shadow-lg shadow-purple-500/10 border-white/20 h-11/12 w-15/16 rounded-xl">
      
      <div className=" max-w-screen-xl mx-auto py-10 px-2 ">
        <h1 className="font-[boldonse] text-3xl font-bold md:gap-2 text-center flex  items-center justify-center ]">Token Lanchpad <Ticket className="hidden md:block" size={40}/></h1>
        <h6 className="md:text-end text-center  w-3/4 md:w-1/2  mx-auto bg--900 text-lg cursor-pointer mt-2"><Link className="md:flex  justify-end gap-1" href={"https://github.com/garvittsingla"}>-Designed and  Developed by <Github className=" md:block hidden underline-offset-1" size={30}/> Garvit Singla</Link> </h6>
      </div>

      
      {wallet.publicKey? (<Main/>): (<Connect/>)}     
      </div>
    </div>
  );
}
