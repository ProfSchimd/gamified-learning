import React from "react";

export default function AutomatonGraph({ words, showStateLabel }) {
  const stateRadius = 20;
  const hSpacing = 80;
  const vSpacing = 80;

  const buildAutomaton = () => {
    const states = {
      "0": { id: "0", x: 0, y: 0, isFinal: false },
    };
    const transitions= [];

    let stateCounter = 1;

    for (const word of words) {
      let current = "0";
      for (let i = 0; i < word.length; i++) {
        const symbol = word[i];
        const next = `${current}-${symbol}`;
        if (!states[next]) {
          states[next] = {
            id: next,
            x: (i + 1) * hSpacing,
            y: Object.keys(states).length * vSpacing,
            isFinal: false,
          };
          transitions.push({ from: current, to: next, symbol });
        }
        current = next;
        if (i === word.length - 1) {
          states[next].isFinal = true;
        }
      }
    }

    // Assign positions
    let index = 0;
    for (const stateId in states) {
      states[stateId].x = (stateId.split("-").length - 1) * hSpacing + 50;
      states[stateId].y = index * vSpacing + 50;
      index++;
    }

    return { states: Object.values(states), transitions };
  };

  const { states, transitions } = buildAutomaton();

  return (
    <div className="w-full overflow-auto p-4 bg-white rounded-lg shadow-md">
      <svg width={1000} height={states.length * 100} className="border rounded">
        {transitions.map((t, idx) => {
          const from = states.find((s) => s.id === t.from);
          const to = states.find((s) => s.id === t.to);
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const angle = Math.atan2(dy, dx);
          const fx = from.x + stateRadius * Math.cos(angle);
          const fy = from.y + stateRadius * Math.sin(angle);
          const tx = to.x - stateRadius * Math.cos(angle);
          const ty = to.y - stateRadius * Math.sin(angle);

          return (
            <g key={idx}>
              <line
                x1={fx}
                y1={fy}
                x2={tx}
                y2={ty}
                stroke="black"
                markerEnd="url(#arrowhead)"
              />
              <text
                x={(fx + tx) / 2}
                y={(fy + ty) / 2 - 5}
                className="text-sm fill-black"
              >
                {t.symbol}
              </text>
            </g>
          );
        })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>
        {states.map((state, idx) => (
          <g key={idx}>
            <circle
              cx={state.x}
              cy={state.y}
              r={stateRadius}
              className={`stroke-black ${
                state.isFinal ? "fill-green-300" : "fill-white"
              }`}
              strokeWidth="2"
            />
            {state.isFinal && (
              <circle
                cx={state.x}
                cy={state.y}
                r={stateRadius - 5}
                className="stroke-black fill-transparent"
                strokeWidth="2"
              />
            )}
            {showStateLabel && <text
              x={state.x}
              y={state.y + 4}
              textAnchor="middle"
              className="text-sm fill-black"
            >
              {state.id}
            </text>}
          </g>
        ))}
      </svg>
    </div>
  );
}
