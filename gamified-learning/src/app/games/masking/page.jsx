"use client";

import { DARK_GAME_CARDS } from "@/styles"
import MasKingLogo from "./MasKingLogo";
import { MK_STYLES } from "./definitions";
import MasKingUI from "./MasKingUI";

export default function MasKing() {
    return (
        <div className={DARK_GAME_CARDS.grayDarkMidPadding}>
            
            <div className="w-full max-w-xl mx-auto text-center">
                <MasKingLogo />
            </div>
            <div className={`${MK_STYLES.textColor} mt-4 border-t-1 border-gray-400`}>
                <MasKingUI />
            </div>
        </div>
    );
}