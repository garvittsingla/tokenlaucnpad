"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { BorderTrail } from "@/components/motion-primitives/border-trail";

export default function Connect(){

    return(
        <div className="p-5   w-full  flex items-center flex-col gap-3 justify-center">
            <h1 className="font-sans font-medium text-xl">Connect Your wallet to Continue :</h1>
            <WalletMultiButton />
            <div className="w-full flex gap-6 bg--900 h-1/2 px-20 py-5 space-y-5">
                <div className="bg--900 h-full border p-6 rounded-md w-1/2 flex  flex-col gap-5">
                <h1 className="text-3xl font-[boldonse]">What we Do?</h1>
                    <div className="text-xl -y-1 ml-10 text-white">
                        <h3>-We send you faucets for testing</h3>
                        <h3>-We create custom tokens for your projects</h3>
                        <h3>-Let you mint tokens seamlessly</h3>
                        <h3>-Manage your token supply</h3>
                        <h3>-Create token metadata</h3>
                        <h3>-Set custom token properties</h3>
                        <h3>-Monitor token transactions</h3>
                        <h3>-Simple and user-friendly interface</h3>
                    </div>
                </div>
                <div className="bg--900 h-82 border p-6 rounded-md w-1/2 flex flex-col gap-5">
                    <h1 className="text-3xl font-[boldonse]">Benefits.</h1>
                    <div className="text-xl -y-1 ml-10 text-white">
                        <h3>-Zero technical knowledge required</h3>
                        <h3>-Fast and efficient token creation</h3>
                        <h3>-Secure token management</h3>
                        <h3>-Cost-effective solution</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}