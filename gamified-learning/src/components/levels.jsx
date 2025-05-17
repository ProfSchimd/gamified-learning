export const Levels = Object.freeze({
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
    INSANE: '🔥 Insane 🔥',
});


export function DifficultySelector({ difficulty, onDifficultyChange }) {
    const getButtonClass = (level) => {
        const base = "px-4 py-2 border border-gray-500 rounded font-semibold";
        const inactive = "bg-gray-800 text-gray-400 hover:bg-gray-700";

        if (level === difficulty) {
            switch (level) {
                case Levels.EASY:
                    return `${base} bg-green-700 text-green-200 border-green-400 shadow-lg shadow-green-400/50 `;
                case Levels.MEDIUM:
                    return `${base} bg-orange-700 text-orange-200 border-orange-400 shadow-lg shadow-orange-400/50 `;
                case Levels.HARD:
                    return `${base} bg-red-700 text-red-200 border-red-400 shadow-lg shadow-red-400/50 `;
                case Levels.INSANE:
                    return `${base} bg-gradient-to-r text-red-100 from-yellow-400 via-orange-500 to-red-600 shadow-lg shadow-red-500/50 hover:scale-105 transition-transform`
                default:
                    return base;
            }
        } else {
            return `${base} ${inactive}`;
        }
    };
    return (
        <div className="flex gap-4 w-full">
            {Object.values(Levels).map((difficulty) => (
                <button
                    key={difficulty}
                    onClick={() => onDifficultyChange(difficulty)}
                    className={`flex-1 ${getButtonClass(difficulty)}`}
                >
                    {difficulty}
                </button>
            ))}
        </div>
    );
}
