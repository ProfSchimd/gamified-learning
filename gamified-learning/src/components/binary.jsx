'use client';
import { useState } from "react";


export function BinaryNumber({ digits, onValueChange }) {
    const [bits, setBits] = useState(Array(digits));

    const bitChange = (index, value) => {
        if (value === "") {
            const newBits = [...bits];
            newBits[index] = undefined;
            setBits(newBits);
            onValueChange(undefined);
            return;
        }
        value = Number(value);

        if (value === 0 || value === 1) {
            const newBits = [...bits];
            newBits[index] = value;
            setBits(newBits);
            onValueChange(bitsToInt(newBits));
        }
    };

    return (
        <>
            {[...Array(digits)].map((_, i) =>
                <BinaryInput
                    key={i}
                    index={i}
                    value={bits[i]}
                    onBitChanged={bitChange}
                    className="mx-1 my-2 w-[3em] border p-2 rounded-full text-center">
                </BinaryInput>)}
        </>
    );
}

export function BinaryInput({ value, index, onBitChanged, className }) {


    const handleChange = (e) => {
        const input = e.target.value;
        if (/^[01]?$/.test(input)) {
            onBitChanged(index, input)
        }
    };

    return (
        <input
            type="text"
            value={value ?? ""}
            onChange={handleChange}
            className={`text-inherit ${className}`}
        />
    );
}

function bitsToInt(bits) {
    if (!Array.isArray(bits)) return undefined;

    for (let bit of bits) {
        if (bit !== 0 && bit !== 1) {
            return undefined;
        }
    }

    return bits.reduce((acc, bit) => (acc << 1) | bit, 0);
}
