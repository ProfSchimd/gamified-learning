import { BUTTON_STYLES } from "@/styles";

export default function MKEnd({onRestart = () => {}}) {
    return(
        <div>
            <button className={BUTTON_STYLES.neutralFourth} onClick={onRestart}>Restart</button>
        </div>
    )
}