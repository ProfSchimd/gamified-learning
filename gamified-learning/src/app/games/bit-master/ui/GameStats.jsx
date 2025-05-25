import { useState, useMemo } from "react";

import { Levels } from "@/components/levels";
import { secondsPerGame } from "../util";

export default function GameStats({ games, level }) {
    const [shownLevel, setShownLevel] = useState(level);

    const handleChangeShownLevel = (newShownLevel) => {
        setShownLevel(newShownLevel);
    };

    const filteredGames = useMemo(() => {
        return games
            .filter((g) => g.completed && g.level === shownLevel)
            .sort((a, b) => secondsPerGame(a) - secondsPerGame(b));
    }, [games, shownLevel]);

    return (
        <>
            <div className="flex space-x-2 mb-4 border-b border-gray-400">
                {Object.values(Levels).map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() => handleChangeShownLevel(lvl)}
                        className={`font-thin px-4 py-2 border-b-2 ${lvl === shownLevel ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent hover:text-gray-300'
                            }`}
                    >
                        {lvl}
                    </button>
                ))}
            </div>
            <ul>
                {filteredGames.map((g, i) => {
                    return (
                        <li className={`p-2 font-thin ${i % 2 ? "bg-emerald-900" : "bg-emerald-950"}`} key={i}>
                            <span className="text-white inline-flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-emerald-700">{i + 1}</span>
                            <><span className="font-bold text-emerald-100">
                                {secondsPerGame(g)}
                            </span> seconds per guess
                            </>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}
