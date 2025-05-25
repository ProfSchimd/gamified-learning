import { Levels } from "@/components/levels";
import { useState, useCallback } from "react";

import BitMasterFinishedUI from "./ui/BitMasterFinishedUI.jsx";
import BitMasterInitialUI from "./ui/BitMasterInitialUI.jsx";
import BitMasterRunningUI from "./ui/BitMasterRunningUI.jsx";

export const GameStatus = Object.freeze({
    INITIAL: "INITIAL",
    RUNNING: "RUNNING",
    FINISHED: "FINISHED",
});

export default function BitMasterUI() {
    const [gameState, setGameState] = useState(GameStatus.INITIAL);
    const [level, setLevel] = useState(Levels.EASY);
    const [games, setGames] = useState([]);

    const initGame = useCallback(() => {
        setGameState(GameStatus.INITIAL);
    }, []);

    const startGame = useCallback(() => {
        setGameState(GameStatus.RUNNING);
    }, []);

    const stopGame = useCallback((completed, game, time) => {
        setGames(prevGames => [...prevGames, {
            completed,
            level, 
            game,
            time,
        }]);
        setGameState(GameStatus.FINISHED);
    }, [level]); 

    const difficultyChange = useCallback((newLevel) => {
        setLevel(newLevel);
    }, []);

    return (
        <div>
            {gameState === GameStatus.INITIAL && (
                <BitMasterInitialUI
                    level={level}
                    onDifficultySelect={difficultyChange}
                    onGo={startGame}
                />
            )}
            {gameState === GameStatus.RUNNING && (
                <BitMasterRunningUI
                    level={level}
                    onStop={stopGame}
                />
            )}
            {gameState === GameStatus.FINISHED && (
                <BitMasterFinishedUI
                    onRestart={initGame}
                    games={games}
                    level={level}
                />
            )}
        </div>
    );
}