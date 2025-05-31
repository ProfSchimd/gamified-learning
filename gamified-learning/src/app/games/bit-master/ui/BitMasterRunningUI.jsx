import { useState, useEffect } from "react"

import { Timer } from "@/components/clock";
import Progress from "@/components/progress";
import { BinaryNumber } from "@/components/binary";

import { BUTTON_STYLES } from "@/styles";
import { Levels } from "@/components/levels";

export default function BitMasterRunningUI({ level, showGuess = true, onStop }) {
    const [theNumber, setTheNumber] = useState(null);
    const [currentGuess, setCurrentGuess] = useState(undefined);
    const [completedGuess, setCompletedGuess] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isGameEnding, setIsGameEnding] = useState(false);
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
        if (completedGuess.length === gamesToComplete && !isGameEnding) {
            setIsGameEnding(true);
            // Delay the onStop call to allow progress animation to complete
            setTimeout(() => {
                onStop(true, completedGuess, elapsedTime);
            }, 800); 
        }
    }, [completedGuess, onStop, elapsedTime, isGameEnding]);

    const handleNewGuess = (guess) => {
        if (isGameEnding) return;
        
        setCurrentGuess(guess);
        if (guess !== theNumber) {
            return;
        }
        setCompletedGuess([...completedGuess, guess]);
        
        // Only generate new number if we haven't completed all games
        if (completedGuess.length + 1 < gamesToComplete) {
            setTheNumber(randomNumber(digits));
        }
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
                className={BUTTON_STYLES.neutralFull}
                onClick={() => onStop(false, completedGuess, elapsedTime)}
                disabled={isGameEnding}
            >
                {isGameEnding ? "FINISHING..." : "STOP"}
            </button>
        </div>
    );
}

function randomNumber(digits) {
    // with many bits, don't use low numbers
    const min = digits > 6 ? digits * 6 + 1 : 0;
    const max = (2 ** digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // return 1;
}