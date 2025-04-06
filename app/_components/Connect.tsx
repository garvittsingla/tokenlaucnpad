"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Connect(){

    return(
        <div className="p-5   w-full  flex items-center flex-col gap-3 justify-center">
            <h1 className="font-sans font-medium text-xl">Connect Your wallet to Continue :</h1>
            <WalletMultiButton />
            <div className="w-full h-1/2 px-20 py-10 space-y-5">
                <h1 className="text-3xl font-[boldonse]">What we Do?</h1>
                    <div className="text-lg ml-10 text-white">
                        <h3>-We send you faucets</h3>
                        <h3>-We create token for you</h3>
                        <h3>-Let you mint tokens</h3>
                    </div>
            </div>
        </div>
    )
}