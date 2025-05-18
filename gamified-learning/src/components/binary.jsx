"use client";
import { useRef, useState } from "react";

export function BinaryNumber({ digits, showCaption = true, showValue = false, onValueChange, dynClass }) {
  const [bits, setBits] = useState(Array(digits));
  const inputRefs = useRef([]);

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

      // Move to next input if exists
      const nextRef = inputRefs.current[index + 1];
      if (nextRef) {
        nextRef.focus();
      }
    }
  };

  return (
    <div className="py-4 flex items-end justify-center gap-4">
      {[...Array(digits)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <BinaryInput
            index={i}
            value={bits[i]}
            onBitChanged={bitChange}
            inputRef={(el) => (inputRefs.current[i] = el)}
            className={`w-[2.2em] text-xl border p-2 rounded-full text-center outline-none ${dynClass ? dynClass(i) : ""}`}
          />
          {showCaption && (
            <span className="text-sm mt-1 text-inherit">
              {2 ** (digits - i - 1)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}


export function BinaryInput({ value, index, onBitChanged, className, inputRef }) {
  const handleChange = (e) => {
    const input = e.target.value;
    if (/^[01]?$/.test(input)) {
      onBitChanged(index, input);
    }
  };

  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={handleChange}
      ref={inputRef}
      className={`flex-1 text-inherit gap-1 ${className}`}
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

function intToBits(number, digits) {
  if (typeof number !== 'number' || typeof digits !== 'number') return undefined;
  if (number < 0 || number >= 2 ** digits) return undefined;

  const bits = Array(digits).fill(0);
  for (let i = digits - 1; i >= 0; i--) {
    bits[i] = number % 2;
    number = Math.floor(number / 2);
  }
  return bits;
}


export function BinaryConverter({ digits, dynClass }) {
  const [bits, setBits] = useState(Array(digits).fill(0));

  const decimalChange = (value) => {
    const newVal = intToBits(Number(value), digits);
    if (newVal !== undefined) {
      setBits(newVal);
    }
  }

  const bitChange = (index, value) => {
    if (value === "") {
      const newBits = [...bits];
      newBits[index] = undefined;
      setBits(newBits);
      return;
    }

    value = Number(value);
    if (value === 0 || value === 1) {
      const newBits = [...bits];
      newBits[index] = value;
      setBits(newBits);
    }
  };

  return (
    <div className="flex-col w-full">
      <div className="text-xl">
        <input
          className="my-1 px-1 rounded w-full border text-center"
          type="number"
          min={0}
          max={2 ** digits - 1}
          value={bitsToInt(bits)} onChange={(e) => { decimalChange(e.target.value) }}
        />
      </div>
      <div className="flex w-full gap-1">
        {[...Array(digits)].map((_, i) => (
          <div key={i} className="min-w-0 flex flex-col bg">
            <BinaryInput
              index={i}
              value={bits[i]}
              onBitChanged={bitChange}
              className={`border rounded px-1 text-xl text-center ${dynClass ? dynClass(bits[i], i) : ""}`}
            />
            <p className="text-gray-500 text-sm text-center">{2 ** (digits - i - 1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}