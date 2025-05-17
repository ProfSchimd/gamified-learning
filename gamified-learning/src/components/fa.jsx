import React, { useState } from 'react';

const automatonData = {
  states: ['q0', 'q1', 'q2', 'q3'],
  initialState: 'q0',
  finalStates: ['q3'],
  transitions: {
    q0: { a: 'q1', b: 'q2' },
    q1: { a: 'q1', b: 'q3' },
    q2: { a: 'q3' },
    q3: { a: 'q3', b: 'q3' },
  },
};

const positions = {
  q0: { x: 100, y: 100 },
  q1: { x: 250, y: 80 },
  q2: { x: 250, y: 180 },
  q3: { x: 400, y: 130 },
};

const FiniteAutomaton = () => {
  const [selectedStates, setSelectedStates] = useState([]);
  const [isValidPath, setIsValidPath] = useState(true);

  const handleStateClick = (state) => {
    let newSelected = [...selectedStates, state];

    // Validate path
    let valid = true;
    for (let i = 0; i < newSelected.length - 1; i++) {
      const current = newSelected[i];
      const next = newSelected[i + 1];
      const transitions = automatonData.transitions[current];

      if (!transitions || !Object.values(transitions).includes(next)) {
        valid = false;
        break;
      }
    }

    setSelectedStates(newSelected);
    setIsValidPath(valid);
  };

  const reset = () => {
    setSelectedStates([]);
    setIsValidPath(true);
  };

  return (
    <div className="p-4">
      <svg width="500" height="300" className="border rounded">
        {/* Transitions */}
        {Object.entries(automatonData.transitions).map(([from, trans]) =>
          Object.entries(trans).map(([symbol, to]) => (
            <line
              key={`${from}-${to}-${symbol}`}
              x1={positions[from].x}
              y1={positions[from].y}
              x2={positions[to].x}
              y2={positions[to].y}
              stroke="black"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          ))
        )}

        {/* Arrow head definition */}
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="black" />
          </marker>
        </defs>

        {/* States */}
        {automatonData.states.map((state) => (
          <g
            key={state}
            onClick={() => handleStateClick(state)}
            className="cursor-pointer"
          >
            <circle
              cx={positions[state].x}
              cy={positions[state].y}
              r="25"
              fill={
                selectedStates.includes(state)
                  ? isValidPath
                    ? 'lightgreen'
                    : 'salmon'
                  : 'white'
              }
              stroke="black"
              strokeWidth="2"
            />
            <text
              x={positions[state].x}
              y={positions[state].y + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
            >
              {state}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={reset}
        >
          Reset Path
        </button>
        <span className={isValidPath ? 'text-green-600' : 'text-red-600'}>
          Path is {isValidPath ? 'Valid' : 'Invalid'}
        </span>
      </div>
    </div>
  );
};

export default FiniteAutomaton;
