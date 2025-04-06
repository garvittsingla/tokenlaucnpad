import { useWallet } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui"
import { toast } from "sonner"
import Airdrop from "./Airdrop"
import { Clipboard } from "lucide-react"
import Token from "./Token"

export default function Main(){
    const wallet = useWallet()
    async function copypublickey(){
        
        await navigator.clipboard.writeText((wallet.publicKey?.toString())??(""))
        toast.success("Public key has been copied to your clipboard")
    }
    return(
        <div className="w-full ">
        <div className="flex items-center justify-center w-full  gap-4 flex-col">
        <h1>Your Public key : <span onClick={copypublickey} className="hover:text-purple-500 transition-all cursor-pointer flex gap-2">{wallet.publicKey?.toString()} <Clipboard size={20} /> </span></h1>
        <WalletDisconnectButton/>
        </div>
        <div className="w-full flex  items-center ">
            <Airdrop/>
           <Token/>
        </div>
      </div>
    )
}