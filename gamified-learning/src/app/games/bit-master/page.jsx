"use client";

import { BitMasterLogo, BitMasterUI } from "."
import { DARK_GAME_CARDS } from "@/styles";

export default function BitMaster() {
    return (
        <div className={DARK_GAME_CARDS.grayDarkMidPadding} >
            <BitMasterLogo />
            <BitMasterUI />
        </div>
    );
}

