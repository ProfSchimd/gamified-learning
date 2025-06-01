"use client";

import { useCallback, useState } from "react"
import { GameStatus } from "./definitions";
import MKPlaying from "./ui/MKPlaying";
import MKStart from "./ui/MKStart";
import MKEnd from "./ui/MKEnd";

export default function MasKingUI() {
    const [status, setStatus] = useState(GameStatus.START_MENU);

    const handleStart = useCallback(() => {
        setStatus(GameStatus.PLAYING)
    }, []);

    const handleStop = useCallback(() => {
        setStatus(GameStatus.END_GAME);
    }, []);

    const handleRestart = useCallback(() => {
        setStatus(GameStatus.START_MENU)
    }, []);

    return(
        <div>
            {status === GameStatus.START_MENU && <MKStart onStart={handleStart} />}
            {status === GameStatus.PLAYING && <MKPlaying onStop={handleStop} /> }
            {status === GameStatus.END_GAME && <MKEnd onRestart={handleRestart} /> }
        </div>
    )
}