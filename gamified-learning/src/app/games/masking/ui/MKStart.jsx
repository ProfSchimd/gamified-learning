"use client";

import { BUTTON_STYLES } from "@/styles";

export default function({ onStart }) {
    return (
        <div>
            <button className={BUTTON_STYLES.neutralFourth} onClick={onStart}>Play</button>
        </div>
    );
}