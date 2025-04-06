"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    createInitializeMint2Instruction, 
    getMinimumBalanceForRentExemptAccount, 
    MINT_SIZE, 
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddressSync,
    createMintToInstruction
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "sonner";

export default function Token(){
    const {connection} = useConnection()
    const wallet = useWallet()

    const [tokenname,settokenname] = useState("")
    const [symbol,setsymbol] = useState("")
    const [image,setimage] = useState("")
    const [initial,setinitial] = useState("")

    async function createtoken() {
        try {
            if (!wallet.publicKey) {
                toast.error("Please connect your wallet first");
                return;
            }
            
            if (tokenname == "" || symbol == "" || image == "" || initial == "") {
                toast.error("Fill all necessary fields")
                return;
            }
    
            toast.info("Preparing transaction...");
            
            const mintkeypair = Keypair.generate();
            const lamports = await getMinimumBalanceForRentExemptAccount(connection);
            
            // Calculate initial supply (converting to smallest units with 9 decimal places)
            const initialSupply = Number(initial) * Math.pow(10, 9);
            
            // Get the associated token account address for the user
            const associatedTokenAccount = getAssociatedTokenAddressSync(
                mintkeypair.publicKey,
                wallet.publicKey
            );
    
            const transaction = new Transaction().add(
                // Create the mint account
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintkeypair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId: TOKEN_PROGRAM_ID
                }),
                // Initialize the mint account
                createInitializeMint2Instruction(
                    mintkeypair.publicKey,
                    9, // 9 decimals
                    wallet.publicKey,
                    wallet.publicKey,
                    TOKEN_PROGRAM_ID
                ),
                // Create the associated token account for the user
                createAssociatedTokenAccountInstruction(
                    wallet.publicKey, // payer
                    associatedTokenAccount, // associated token account address
                    wallet.publicKey, // owner
                    mintkeypair.publicKey, // mint
                ),
                // Mint tokens to the user's associated token account
                createMintToInstruction(
                    mintkeypair.publicKey, // mint
                    associatedTokenAccount, // destination
                    wallet.publicKey, // mint authority
                    BigInt(initialSupply) // amount in smallest units
                )
            );
    
            transaction.feePayer = wallet.publicKey;
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            
            // Sign with the mint keypair
            transaction.partialSign(mintkeypair);
            
            // Send and await the transaction signature
            const signature = await wallet.sendTransaction(transaction, connection);
            
            // Wait for confirmation
            toast.info("Confirming transaction...");
            await connection.confirmTransaction(signature, "confirmed");
            
            toast.success("Token created and minted successfully!");
            console.log("Mint address:", mintkeypair.publicKey.toString());
            console.log("Token account:", associatedTokenAccount.toString());
        } catch (error:any) {
            console.error("Transaction error:", error);
            toast.error(`Transaction failed: ${error.message}`);
        }
    }

    return(
        <div className="w-1/2 bg--900">
        <div className="w-full ">
            <h1 className="px-45 mb-6 text-xl font-[boldonse]">Token Launchpad</h1>
        </div>
        <div className="flex w-1/2 mx-auto flex-col gap-5">
            <div className="flex flex-col gap-2">
            <Label htmlFor="tokenname">Enter your token name:</Label>
            <Input value={tokenname} onChange={(e)=>settokenname(e.target.value)} type="text" id="tokenname" placeholder="DOGE coin" />
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="symbol">Enter your Symbol:</Label>
            <Input value={symbol} onChange={(e)=>setsymbol(e.target.value)}  type="text" id="symbol" placeholder="Sybmol" />
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="image">Enter your Image Url</Label>
            <Input value={image} onChange={(e)=>setimage(e.target.value)}  type="text" id="image" placeholder="Image Url" />
            </div>
            <div className="flex flex-col gap-2">
            <Label htmlFor="initial">Enter your Initial supply:</Label>
            <Input value={initial}  onChange={(e)=>setinitial(e.target.value)}  type="text" id="initial" placeholder="1000" />
            </div>
        </div>
        <button 
            onClick={createtoken} 
            disabled={!wallet.publicKey}
            className={`px-4 ml-70 mt-5 py-2 rounded-md ${wallet.publicKey ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
            {wallet.publicKey ? 'Create token' : 'Connect wallet to create token'}
        </button>
    </div>
    )
}