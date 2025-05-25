import { DifficultySelector } from "@/components/levels";
import { BUTTON_STYLES } from "@/styles";

export default function BitMasterInitialUI({ level, onDifficultySelect, onGo }) {
    return (
        <div>
            <DifficultySelector difficulty={level} onDifficultyChange={onDifficultySelect}/>
            <button className={BUTTON_STYLES.neutralFull} onClick={() => onGo()} >GO!</button>
        </div>
    );
}
