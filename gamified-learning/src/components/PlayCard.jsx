"use client";

import { useState } from "react";

export default function PlayCard({ children }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div 
      className="w-64 h-96 [perspective:1000px] cursor-pointer" 
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl shadow-lg bg-white text-black overflow-hidden border-1 border-gray-9000">
          <div className="absolute [backface-visibility:hidden] inset-3 border-2 border-gray-500 rounded-lg p-2">
            {children}
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl shadow-lg bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 border-2 border-yellow-400">
          {/* Decorative border pattern */}
          <div className="absolute inset-2 border-2 border-yellow-300 rounded-lg">
            <div className="absolute inset-1 border border-yellow-200 rounded-md">
              {/* Central pattern */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 bg-yellow-400 opacity-75 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-yellow-600 opacity-50 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-yellow-700 opacity-70 rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-300 opacity-75 rounded-full"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-300 opacity-75 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-yellow-300 opacity-75 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-yellow-300 opacity-75 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}