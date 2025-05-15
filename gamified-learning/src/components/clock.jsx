"use client";
import React, { useState, useEffect, useRef } from 'react';

import { Orbitron } from 'next/font/google';
const orbitron = Orbitron({
    subsets: ['latin'],
})

export function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const legend = "Current Time";
    const formattedTime = time.toLocaleTimeString();

    return (
        <div className="dark:bg-sky-800 bg-sky-200  p-2 w-auto text-center">
            <h1 className="text-2xl font-semibold mb-2">{legend}</h1>
            <p suppressHydrationWarning={true} className={`text-4xl tracking-wide ${orbitron.className}`} >{formattedTime}</p>
        </div>
    );
}

export function Timer({ legend = "Elapsed" }) {
    const [timer, setTimer] = useState({ elapsed: 0, running: true, start: Date.now() });
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!timer.running) return;
        intervalRef.current = setInterval(() => {
            setTimer({...timer, elapsed: (Date.now() - timer.start)});
        }, 250);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [timer.running]);

    return (
        <div className="dark:bg-sky-800 bg-sky-200  p-2 text-center">
            {legend ? <h1 className="text-2xl font-semibold mb-2">{legend}</h1> : ""}
            <p suppressHydrationWarning={true} className={`text-4xl tracking-wide ${orbitron.className}`} >{formatTime((timer.elapsed /1000).toFixed(0) )}</p>
        </div>
    );

}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}
