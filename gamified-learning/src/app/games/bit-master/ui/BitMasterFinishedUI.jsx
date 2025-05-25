import { BUTTON_STYLES } from "@/styles"
import { secondsPerGame } from "../util"
import GameStats from "./GameStats"

export default function BitMasterFinishedUI({ games, onRestart, level, onReset = () => { }, onDownload = () => { } }) {
    return (
        <div className="text-emerald-500">
            <div className="mb-2 p-2 bg-emerald-950 rounded text-center text-lg">
                {games.at(-1) ?
                    <><span className="text-emerald-200 font-bold">
                        {secondsPerGame(games.at(-1))}
                    </span> seconds per guess </> : ""
                }
            </div>
            <GameStats games={games} level={level} />
            <button
                className={`${BUTTON_STYLES.neutralFourth} mr-2`} onClick={onRestart}
            >
                RESTART
            </button>
            <button
                className={`${BUTTON_STYLES.neutralFourth} mr-2`} onClick={onReset}
            >
                RESET
            </button>
            <button
                className={`${BUTTON_STYLES.neutralFourth}`} onClick={onDownload}
            >
                DOWNLOAD
            </button>
        </div>
    )
}

