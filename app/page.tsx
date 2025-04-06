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
    <div className="bg-black h-screen flex items-center justify-center w-full text-white ">
      <Toaster/>
      <div className="border backdrop-blur-sm bg-black/50 shadow-lg shadow-purple-500/10 border-white/20 h-11/12 w-15/16 rounded-xl">
      
      <div className=" max-w-screen-xl mx-auto p-10  ">
        <h1 className="font-mono text-4xl font-bold text-center flex gap-2 items-center justify-center">Token Lanchpad <Ticket size={30}/></h1>
        <h6 className="text-end w-1/2 mx-auto  text-lg cursor-pointer mt-2"><Link className="flex justify-end gap-1" href={"https://github.com/garvittsingla"}>-Designed and  Developed by <Github size={20}/> Garvit Singla</Link> </h6>
      </div>

      
      {wallet.publicKey? (<Main/>): (<Connect/>)}     
      </div>
    </div>
  );
}
