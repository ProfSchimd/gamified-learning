export default function Progress({ 
    percentage, 
    text, 
    showPercentage,
    bg_color="bg-gray-300",
    bg_fill_color="bg-gray-500",
    textClass = "absolute inset-0 flex items-center justify-center text-sm font-semibold text-black" }) {
    return (
        <div className={`w-full ${bg_color} rounded-full h-8 overflow-hidden`}>
            <div
                className={`h-full ${bg_fill_color} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
            />
            {text ? <span className={textClass}>{text}</span> : ""}
            {(!text && percentage && showPercentage) ? <span className={textClass}>{percentage}%</span> : ""}
        </div>
    )
}