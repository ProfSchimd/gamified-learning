"use client";
import React, { useState, ChangeEvent, JSX } from 'react';

type EncodingType = 'RZ' | 'NRZ' | 'NRZI' | 'Manchester';

interface SignalGeneratorParams {
  bits: string;
  encodingType: EncodingType;
}

const SignalEncodingVisualizer: React.FC = () => {
  const [bitString, setBitString] = useState<string>('10110010');
  const [encoding1, setEncoding1] = useState<EncodingType>('NRZ');
  const [encoding2, setEncoding2] = useState<EncodingType>('Manchester');
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const encodings: EncodingType[] = ['RZ', 'NRZ', 'NRZI', 'Manchester'];

  // Generate signal path for different encodings
  const generateSignal = (bits: string, encodingType: EncodingType): string => {
    const bitWidth = 60;
    const highLevel = 20;
    const lowLevel = 80;
    const midLevel = 50;

    let path = `M 0 ${midLevel}`;
    let x = 0;
    let currentLevel = lowLevel; // Starting level for NRZI

    bits.split('').forEach((bit) => {
      switch (encodingType) {
        case 'NRZ':
          // Non-Return to Zero: high for 1, low for 0
          const nrzLevel = bit === '1' ? highLevel : lowLevel;
          path += ` L ${x} ${nrzLevel} L ${x + bitWidth} ${nrzLevel}`;
          x += bitWidth;
          break;

        case 'RZ':
          // Return to Zero: goes to signal level then returns to zero
          if (bit === '1') {
            path += ` L ${x} ${highLevel} L ${x + bitWidth / 2} ${highLevel} L ${x + bitWidth / 2} ${midLevel} L ${x + bitWidth} ${midLevel}`;
          } else {
            path += ` L ${x} ${lowLevel} L ${x + bitWidth / 2} ${lowLevel} L ${x + bitWidth / 2} ${midLevel} L ${x + bitWidth} ${midLevel}`;
          }
          x += bitWidth;
          break;

        case 'NRZI':
          // Non-Return to Zero Inverted: transition on 1, no transition on 0
          if (bit === '1') {
            currentLevel = currentLevel === highLevel ? lowLevel : highLevel;
          }
          path += ` L ${x} ${currentLevel} L ${x + bitWidth} ${currentLevel}`;
          x += bitWidth;
          break;

        case 'Manchester':
          // Manchester: transition in middle - low to high for 1, high to low for 0
          if (bit === '1') {
            path += ` L ${x} ${lowLevel} L ${x + bitWidth / 2} ${lowLevel} L ${x + bitWidth / 2} ${highLevel} L ${x + bitWidth} ${highLevel}`;
          } else {
            path += ` L ${x} ${highLevel} L ${x + bitWidth / 2} ${highLevel} L ${x + bitWidth / 2} ${lowLevel} L ${x + bitWidth} ${lowLevel}`;
          }
          x += bitWidth;
          break;
      }
    });

    return path;
  };

  const renderSignal = (bits: string, encodingType: EncodingType, showLabels: boolean = true): JSX.Element => {
    const bitWidth = 60;
    const totalWidth = bits.length * bitWidth;

    return (
      <div className="mb-6">
        {showLabels && (
          <div className="mb-2 font-semibold text-lg text-gray-700">
            {encodingType} Encoding
          </div>
        )}

        {/* Bit labels */}
        <div className="flex mb-1">
          {bits.split('').map((bit, i) => (
            <div
              key={i}
              className="text-center font-mono font-bold text-blue-600"
              style={{ width: `${bitWidth}px` }}
            >
              {bit}
            </div>
          ))}
        </div>

        {/* Signal visualization */}
        <svg
          width={totalWidth}
          height="100"
          className="border border-gray-300 bg-white rounded"
        >
          {/* Grid lines */}
          <line x1="0" y1="20" x2={totalWidth} y2="20" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="50" x2={totalWidth} y2="50" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="80" x2={totalWidth} y2="80" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />

          {/* Vertical grid for bit boundaries */}
          {bits.split('').map((_, i) => (
            <line
              key={i}
              x1={i * bitWidth}
              y1="0"
              x2={i * bitWidth}
              y2="100"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Signal path */}
          <path
            d={generateSignal(bits, encodingType)}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
          />
        </svg>

        {/* Level labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>High (+V)</span>
          <span>Low (-V or 0V)</span>
        </div>
      </div>
    );
  };

  const handleBitStringChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^01]/g, '');
    setBitString(value);
  };

  const handleEncoding1Change = (e: ChangeEvent<HTMLSelectElement>): void => {
    setEncoding1(e.target.value as EncodingType);
  };

  const handleEncoding2Change = (e: ChangeEvent<HTMLSelectElement>): void => {
    setEncoding2(e.target.value as EncodingType);
  };

  const handleComparisonToggle = (e: ChangeEvent<HTMLInputElement>): void => {
    setShowComparison(e.target.checked);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Digital Signal Encoding Visualizer
        </h1>
        <p className="text-gray-600 mb-6">
          Visualize and compare different line encoding schemes
        </p>

        {/* Input section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bit String (0s and 1s only)
          </label>
          <input
            type="text"
            value={bitString}
            onChange={handleBitStringChange}
            placeholder="Enter bit string (e.g., 10110010)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg"
          />
        </div>

        {/* Encoding selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Encoding
            </label>
            <select
              value={encoding1}
              onChange={handleEncoding1Change}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {encodings.map(enc => (
                <option key={enc} value={enc}>{enc}</option>
              ))}
            </select>
          </div>

          {showComparison && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comparison Encoding
              </label>
              <select
                value={encoding2}
                onChange={handleEncoding2Change}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {encodings.map(enc => (
                  <option key={enc} value={enc}>{enc}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Comparison toggle */}
        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showComparison}
              onChange={handleComparisonToggle}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Compare two encodings
            </span>
          </label>
        </div>

        {/* Signal visualization */}
        {bitString && (
          <div className="mt-8">
            {renderSignal(bitString, encoding1)}
            {showComparison && renderSignal(bitString, encoding2)}
          </div>
        )}

        {/* Information panel */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start">
            {/* <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" /> */}
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">Encoding Schemes:</p>
              <ul className="space-y-1 ml-4">
                <li><strong>NRZ:</strong> High voltage for 1, low voltage for 0</li>
                <li><strong>RZ:</strong> Returns to zero voltage in the middle of each bit</li>
                <li><strong>NRZI:</strong> Transition on 1, no transition on 0</li>
                <li><strong>Manchester:</strong> Transition in middle of each bit (↑ for 1, ↓ for 0)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalEncodingVisualizer;