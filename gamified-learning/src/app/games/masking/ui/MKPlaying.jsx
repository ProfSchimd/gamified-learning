"use client";

import { useMemo, useState } from "react";
import { BUTTON_STYLES } from "@/styles";

const INPUT_STYLE =
    "bg-sky-800 text-sky-200 text-4xl border-2 border-sky-200 text-center w-32 h-16 rounded";
const CONTROLS_STYLE = "bg-sky-600 hover:bg-sky-800 text-2xl text-sky-200 disabled:bg-gray-800 disabled:text-gray-500 p-4 rounded w-32";

export default function MKPlaying({ count = 4, onStop = () => { } }) {
    const [values, setValues] = useState(["", "", "", ""]);
    const masks = useMemo(() => shuffledMasks(count), []);
    const [currentMask, setCurrentMask] = useState(0);
    const mask = masks[currentMask];
    console.log(`Masks: ${masks}`);
    console.log(`Values: ${values}`);
    console.log(`currentMask: ${currentMask} -> ${mask}`);

    const handleChange = (index, newValue) => {
        // Only allow digits
        if (!/^\d*$/.test(newValue)) return;

        // Parse number or fallback to empty string
        const num = Number(newValue);
        if (newValue === "" || (num >= 0 && num <= 255)) {
            const newValues = [...values];
            newValues[index] = newValue;
            setValues(newValues);
        }
    };

    const handleNext = () => {
        const nextMask = currentMask + 1;
        if (nextMask === count) {
            // TODO: manage ending
            return;
        }
        setCurrentMask(nextMask);
        setValues(["","","",""]);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-4 flex flex-col items-center">
                {/* Centered circle */}
                <div className="flex justify-center w-full mb-4">
                    <div className="w-24 h-24 text-4xl flex items-center justify-center bg-sky-700 rounded-full text-sky-100">
                        /{mask ? mask : 24}
                    </div>
                </div>

                {/* Centered controlled inputs with spacing */}
                <div className="flex justify-center gap-4 my-6">
                    {values.map((val, i) => (
                        <input
                            key={i}
                            className={INPUT_STYLE}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={val}
                            onChange={(e) => handleChange(i, e.target.value)}
                        />
                    ))}
                </div>
                <div>
                    <button 
                        className={CONTROLS_STYLE}
                        onClick={handleNext}
                        disabled={!(values.join(".") === maskToString[mask])}
                    >
                        ▶
                    </button>
                    
                </div>
            </div>

            {/* Stop button */}
            <div className="w-full">
                <button className={BUTTON_STYLES.neutralFourth} onClick={onStop}>
                    Stop
                </button>
            </div>
        </div>
    );
}


function shuffledMasks(count) {
  const range = [];

  for (let i = 8; i <= 30; i++) {
    range.push(i);
  }

  // Shuffle using Fisher-Yates algorithm
  for (let i = range.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [range[i], range[j]] = [range[j], range[i]];
  }

  return range.slice(0, count);
}


const maskToString = [
    "0.0.0.0",   // /0
    "128.0.0.0", // /1
    "192.0.0.0", // /2
    "224.0.0.0", // /3
    "240.0.0.0", // /4
    "248.0.0.0", // /5
    "252.0.0.0", // /6
    "254.0.0.0", // /7
    "255.0.0.0", // /8
    "255.128.0.0", // /9
    "255.192.0.0", // /10
    "255.224.0.0", // /11
    "255.240.0.0", // /12
    "255.248.0.0", // /13
    "255.252.0.0", // /14
    "255.254.0.0", // /15
    "255.255.0.0", // /16
    "255.255.128.0", // /17
    "255.255.192.0", // /18
    "255.255.224.0", // /19
    "255.255.240.0", // /20
    "255.255.248.0", // /21
    "255.255.252.0", // /22
    "255.255.254.0", // /23
    "255.255.255.0", // /24
    "255.255.255.128", // /25
    "255.255.255.192", // /26
    "255.255.255.224", // /27
    "255.255.255.240", // /28
    "255.255.255.248", // /29
    "255.255.255.252", // /30
    "255.255.255.254", // /31
    "255.255.255.255", // /32
]
