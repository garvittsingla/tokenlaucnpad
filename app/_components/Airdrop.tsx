"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";
export default function Airdrop(){
    const wallet = useWallet();
    const { connection } = useConnection();

    const [value,setvalue] = useState("")
    const [loading,setloading] = useState(false)

    async function buttonclick(){
        if (value == "") return;
        if (wallet.publicKey == null) return;
        console.log(value) 
        let amount = parseInt(value)
        setloading(true)
        const response = await connection.requestAirdrop(wallet.publicKey,amount*LAMPORTS_PER_SOL)
        .then(()=>{
            toast.success("Faucet airdroped")
        })
        .catch(()=>{
            toast.error("Maximum limit reached")

        })
        .finally(()=>{
            setloading(false)
            setvalue("")
        })
        
        console.log(typeof response)
    }


    return(
        <div className="w-1/2 bg--900 p-10  bg--900">
                <h1 className="flex px-45 mb-10 text-xl font-[boldonse]">Faucet Mine  </h1>
                <div className="flex flex-col items-center w-1/2  flex-shrink  h-32 ml-20  gap-2   ">
                   <div className="flex gap-2  ">
                   <button onClick={()=>setvalue("0.1")} className={`${value=="0.1" ? "bg-zinc-900/90":null} border-1 cursor-pointer rounded-md hover:bg-zinc-900/80 border-white/10 px-6 py-3`}>0.1 Sol</button>
                   <button onClick={()=>setvalue("0.2")} className={`${value=="0.2" ? "bg-zinc-900/90":null} border-1 cursor-pointer rounded-md hover:bg-zinc-900/80 border-white/10 px-6 py-3`}>0.2 Sol</button>
                   <button onClick={()=>setvalue("0.5")} className={`${value=="0.5" ? "bg-zinc-900/90":null} border-1 cursor-pointer rounded-md hover:bg-zinc-900/80 border-white/10 px-6 py-3`}>0.5 Sol</button>
                   </div>
                   <div className="flex gap-2">
                   <button onClick={()=>setvalue("1")} className={`${value=="1" ? "bg-zinc-900/90":null} border-1 cursor-pointer rounded-md hover:bg-zinc-900/80 border-white/10 px-8 py-3`}>1 Sol</button>
                   <button onClick={()=>setvalue("2")} className={`${value=="2" ? "bg-zinc-900/90":null} border-1 cursor-pointer rounded-md hover:bg-zinc-900/80 border-white/10 px-8 py-3`}>2 Sol</button>
                   <button onClick={()=>setvalue("5")} className={`${value=="5" ? "bg-zinc-900/90":null} border-1 cursor-pointer rounded-md hover:bg-zinc-900/80 border-white/10 px-8 py-3`}>5 Sol</button>

                   </div>
                  <button onClick={buttonclick} className={`${value == "" ? "bg-purple-900 cursor-not-allowed":"bg-purple-600 cursor-pointer"}  text-whote mt-10 px-5 font-semibold  rounded-md py-3 `}>{loading?("Loading..."):("Request airdrop")}</button>
                </div>
            </div>
    )
}