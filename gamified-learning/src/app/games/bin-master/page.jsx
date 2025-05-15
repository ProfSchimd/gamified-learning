'use client';

import { Timer } from "@/components/clock";
import { BinaryNumber } from "@/components/binary";
import { useState, useEffect } from "react";
import BitMasterLogo from "./title";
import { Levels, DifficultySelector } from "@/components/levels";

export default function BitMaster() {
    return (
        <div className="p-10 bg-gray-900 drop-shadow-xl drop-shadow-gray-800" >
            <BitMasterLogo/>
            <BitMasterUI></BitMasterUI>
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

    const startGame = function () {
        setGameState(GameStatus.RUNNING);
    };

    const stopGame = function () {
        setGameState(GameStatus.FINISHED);
    }

    const difficultyChange = function (level) {
        setLevel(level);
    }

    return (<div>
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
                onEnd={stopGame}>
            </BitMasterRunningUI>
        )}
        {gameState === GameStatus.PAUSE && "Pause"}
        {/* At the moment this is the same as INITIAL. Later will contain info about last game */}
        {gameState === GameStatus.FINISHED && (
            <BitMasterInitialUI
                level={level}
                onDifficultySelect={difficultyChange}
                onGo={startGame}>
            </BitMasterInitialUI>
        )}
    </div>);
}


function BitMasterInitialUI({ level, onDifficultySelect, onGo }) {

    return (
        <div>
            <DifficultySelector difficulty={level} onDifficultyChange={onDifficultySelect}></DifficultySelector>
            <button className="w-130 my-2 px-4 py-2 border border-gray-300 rounded font-semibold bg-gray-300 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-500" onClick={() => onGo()} >GO!</button>
        </div>
    );
}

function BitMasterRunningUI({ level, showGuess = true, onStop }) {
    const [theNumber, setTheNumber] = useState(null);
    const [currentGuess, setCurrentGuess] = useState(undefined);
    const [completedGuess, setCompletedGuess] = useState([]);


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
        default:
            break;
    }
    const min = 50;
    const max = (2 ** digits) - 1;

    useEffect(() => {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        setTheNumber(random);
    }, []);

    const handleNewGuess = function (v) {
        setCurrentGuess(v);
    }

    return (
        <div className="text-emerald-300">
            <span className="mr-2 py-2 px-4 text-white text-xl rounded-full bg-teal-800">{theNumber}</span>
            <BinaryNumber
                digits={digits}
                onValueChange={handleNewGuess}
            />

            {showGuess && currentGuess ? <span className={`ml-2 py-2 px-4 text-xl rounded-full ${currentGuess === theNumber ? "bg-green-800" : "bg-red-800"}`}>{currentGuess}</span> : ""}
            <br />
            {/* <Timer legend=""></Timer> */}
            <button
                className="w-130 my-2 px-4 py-2 border border-gray-300 rounded font-semibold bg-gray-300 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-500" onClick={onStop}
            >
                STOP
            </button>
            <ul>
                {completedGuess.map((g) => {<li>g.value</li>})}
            </ul>
        </div>
    );
}

