// 'use client';
// import { useState } from "react";


// export function BinaryNumber({ digits, showCaption=true, onValueChange }) {
//     const [bits, setBits] = useState(Array(digits));

//     const bitChange = (index, value) => {
//         if (value === "") {
//             const newBits = [...bits];
//             newBits[index] = undefined;
//             setBits(newBits);
//             onValueChange(undefined);
//             return;
//         }
//         value = Number(value);

//         if (value === 0 || value === 1) {
//             const newBits = [...bits];
//             newBits[index] = value;
//             setBits(newBits);
//             onValueChange(bitsToInt(newBits));
//         }
//     };

//     return (
//         <div className="py-4 flex items-end justify-center gap-4">
//             {[...Array(digits)].map((_, i) => (
//                 <div key={i} className="flex flex-col items-center">
//                     <BinaryInput
//                         index={i}
//                         value={bits[i]}
//                         onBitChanged={bitChange}
//                         className="w-[2.2em] text-xl border p-2 rounded-full text-center outline-none"
//                     />
//                     {showCaption ? <span className="text-sm mt-1 text-inherit">{2**(digits-i-1)}</span> : ""}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export function BinaryInput({ value, index, onBitChanged, className }) {
//     const handleChange = (e) => {
//         const input = e.target.value;
//         if (/^[01]?$/.test(input)) {
//             onBitChanged(index, input)
//         }
//     };

//     return (

//         <input
//             type="text"
//             value={value ?? ""}
//             onChange={handleChange}
//             className={`flex-1 text-inherit ${className}`}
//         />

//     );
// }

'use client';
import { useRef, useState } from "react";

export function BinaryNumber({ digits, showCaption = true, onValueChange }) {
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
            className="w-[2.2em] text-xl border p-2 rounded-full text-center outline-none"
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
      className={`flex-1 text-inherit ${className}`}
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
