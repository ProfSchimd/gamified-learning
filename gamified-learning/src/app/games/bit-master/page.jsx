'use client';

import { Timer } from "@/components/clock";
import { BinaryNumber } from "@/components/binary";
import { useState, useEffect } from "react";
import BitMasterLogo from "./title";
import { Levels, DifficultySelector } from "@/components/levels";
import Progress from "@/components/progress";

const STYLES = {
    neutralColorButtonFull: "w-full my-4 px-4 py-2 border border-gray-500 rounded font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700",
};

export default function BitMaster() {
    return (
        <div className="px-20 py-4 bg-gray-900 drop-shadow-xl drop-shadow-gray-800" >
            <BitMasterLogo />
            <BitMasterUI />
        </div>
    );
}

const GameStatus = Object.freeze({
    INITIAL: "INITIAL",
    RUNNING: "RUNNING",
    PAUSE: "PAUSED",
    FINISHED: "FINISHED",
});


function BitMasterUI() {
    const [gameState, setGameState] = useState(GameStatus.INITIAL);
    const [level, setLevel] = useState(Levels.EASY);
    const [games, setGames] = useState([]);

    const initGame = function () {
        setGameState(GameStatus.INITIAL);
    }

    const startGame = function () {
        setGameState(GameStatus.RUNNING);
    };

    const stopGame = function (completed, game, time) {
        setGames([...games, {
            completed: completed,
            game: game,
            time: time,
        }]);
        setGameState(GameStatus.FINISHED);
    }

    const difficultyChange = function (level) {
        setLevel(level);
    }

    return (
        <div>
            {gameState === GameStatus.INITIAL && (
                <BitMasterInitialUI
                    level={level}
                    onDifficultySelect={difficultyChange}
                    onGo={startGame}>
                </BitMasterInitialUI>
            )}
            {gameState === GameStatus.RUNNING && (
                <BitMasterRunningUI
                    level={level}
                    onStop={stopGame}
                />
            )}
            {gameState === GameStatus.FINISHED && (
                <BitMasterFinishedUI
                    elapsed={(games) ? games.at(-1).time : undefined}
                    onRestart={initGame}
                    games={games}
                />
            )}
        </div>
    );
}


function BitMasterInitialUI({ level, onDifficultySelect, onGo }) {

    return (
        <div>
            <DifficultySelector difficulty={level} onDifficultyChange={onDifficultySelect}></DifficultySelector>
            <button className={STYLES.neutralColorButtonFull} onClick={() => onGo()} >GO!</button>
        </div>
    );
}

function BitMasterRunningUI({ level, showGuess = true, onStop }) {
    const [theNumber, setTheNumber] = useState(null);
    const [currentGuess, setCurrentGuess] = useState(undefined);
    const [completedGuess, setCompletedGuess] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const gamesToComplete = 2;

    let digits = 8;
    switch (level) {
        case Levels.EASY:
            digits = 8;
            break;
        case Levels.MEDIUM:
            digits = 10;
            break;
        case Levels.HARD:
            digits = 12;
            break;
        case Levels.INSANE:
            digits = 16;
            break;
        default:
            break;
    }


    useEffect(() => {
        setTheNumber(randomNumber(digits));
    }, []);

    useEffect(() => {
        if (completedGuess.length === gamesToComplete) {
            onStop(true, completedGuess, elapsedTime);
        }
    }, [completedGuess, onStop]);

    const handleNewGuess = (guess) => {
        setCurrentGuess(guess);
        if (guess !== theNumber) {
            return;
        }
        setCompletedGuess([...completedGuess, currentGuess]);
        setTheNumber(randomNumber(digits));

    }

    return (
        <div className="flex-col text-emerald-300">
            <div className="flex">
                <Progress
                    percentage={100 * completedGuess.length / gamesToComplete}
                    bg_color="bg-gray-800"
                    bg_fill_color="bg-emerald-700"
                />
            </div>
            <div className="w-1/4 mt-4 text-center text-gray-300 rounded-md bg-gray-600 mx-auto flex flex-col">
                <span className="font-thin text-sm" >CONVERT</span>
                <span className="text-2xl">{theNumber}</span>
            </div>

            <div>
                <BinaryNumber
                    digits={digits}
                    onValueChange={handleNewGuess}
                />
            </div>
            {showGuess ?
                <div className={`w-1/4 mb-4 text-center text-gray-300 rounded-md bg-gray-600 mx-auto flex flex-col`}>
                    <span className="font-thin text-sm" >YOUR GUESS</span>
                    <span className="text-2xl">{showGuess && currentGuess ? currentGuess : "-"}</span>
                </div>
                : ""}
            <Timer
                legend=""
                className="text-4xl text-center text-emerald-500 mb-4"
                onElapsedChange={(t) => setElapsedTime(t)}
            />
            <button
                className={STYLES.neutralColorButtonFull}
                onClick={() => onStop(false, completedGuess, elapsedTime)}
            >
                STOP
            </button>
        </div>
    );
}

export function BitMasterFinishedUI({ elapsed, onRestart, games }) {
    return (
        <div className="text-emerald-500">
            {games ? `Ended in ${(elapsed / 1000).toFixed(2)} seconds!` : ""}
            <button
                className={STYLES.neutralColorButtonFull} onClick={onRestart}
            >
                RESTART
            </button>
            <ul>
                {games.map((g, i) => (
                    <li key={i}>Game #{i + 1} in {(g.time / 1000).toFixed(2)} seconds!</li>
                ))}
            </ul>
        </div>
    )
}

function randomNumber(digits) {
    // with many bits, don't use low numbers
    const min = digits > 6 ? digits * 6 + 1 : 0;
    const max = (2 ** digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // return 1;
}

