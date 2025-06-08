import MultiChoiceQuiz from "@/components/quiz/MultiChoiceQuiz";

const quiz = {
    "id": "006",
    "type": "invertible",
    "text": [
        "Indica tutte le affermazioni <u>vere</u> riguardanti i la fase di <b>conquer</b> in un algoritmo ricorsivo.",
        "Indica tutte le affermazioni <u>false</u> riguardanti i la fase di <b>conquer</b> in un algoritmo ricorsivo."

    ],
    "options": [
        "Impedisce che il programma prosegua all'infinito.",
        "Comprende uno o più chiamate ricorsive.",
        "Si occupa di combinare le soluzioni ottenute ricorsivamente.",
        "Si trova dopo le chiamate ricorsive.",
        "Si occupa di creare i sottoproblemi da risolvere ricorsivamente."
    ],
    "correct": [0, 0, 1, 1, 0],
    "weight": 1,
    "tags": ["INF", "Ricorsione"]
};

export default function Test() {
    return (
        <div>
            <div className="bg-red-200 text-red-600 dark:bg-red-800 dark:text-red-200 rounded-lg border-red-800 dark:border-red-200 mx-4 p-2">
                <b>ATTENZIONE</b> Questa è una pagina di test, se non sei lo sviluppatore del sito navighi a tuo rischio e pericolo. Qui si trovano <i>feature sperimentali</i> che potrebbero modificare il contenuto della tua <i>cache</i> o le impostazioni del tuo browser. La corretta navigazione del resto del sito potrebbe risultare compromessa a causa delle <i>feature sperimentali</i> presenti in questa pagina.
            </div>
            <MultiChoiceQuiz quiz={quiz} />
        </div>
    );
}