"use client";
import { useState } from "react";

const TYPES = Object.freeze({
  Single: "single",
  Multiple: "multiple",
  Invertible: "invertible",
});

export default function MultiChoiceQuiz({
  quiz,
  checkEnabled = true,
  containerStyle = "m-4 p-2 bg-sky-100 dark:bg-sky-900 drop-shadow-lg",
  buttonStyle = "p-2 bg-sky-300 dark:bg-sky-700 text-sky-900 dark:text-sky-200 hover:bg-sky-500 border-1 border-sky-500 rounded-lg",
  answersStyle = "my-2 mx-4",
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(quiz.options.length).fill(false)
  );
  const [submitted, setSubmitted] = useState(false);

  const handleToggle = (index) => {
    setSelectedOptions((prev) => {
      if (quiz.type === TYPES.Single) {
        return prev.map((_, i) => i === index);
      } else {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
      }
    });
  };

  const handleCheck = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedOptions(Array(quiz.options.length).fill(false));
  };

  const getAnswerStatus = (i) => {
    const selected = selectedOptions[i];
    const correct = quiz.correct[i] === 1;

    if (!submitted) return "";
    if (selected && correct) return "correct";      // ✅
    if (selected && !correct) return "wrong";        // ❌
    if (!selected && correct) return "missed";       // 🟢
    return "";
  };

  const renderMark = (status) => {
    switch (status) {
      case "correct":
        return <span className="ml-2">✅</span>;
      case "wrong":
        return <span className="ml-2 ">❌</span>;
      case "missed":
        return <span className="ml-2 ">⚠️</span>;
      default:
        return null;
    }
  };

  return (
    <div className={containerStyle}>
      <span>Rispondi</span><br />
      <span
        dangerouslySetInnerHTML={{
          __html:
            quiz.type === TYPES.Invertible ? quiz.text[0] : quiz.text,
        }}
      />
      <ul className={answersStyle}>
        {quiz.options.map((opt, i) => {
          const status = getAnswerStatus(i);
          const base = "inline-flex items-center gap-2 p-1 rounded transition-all";

          const statusClass = submitted
            ? status === "correct"
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : status === "wrong"
              ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
              : status === "missed"
              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
              : ""
            : "";

          return (
            <li key={i}>
              <label className={`${base} ${statusClass}`}>
                <ChoiceInput
                  checked={selectedOptions[i]}
                  disabled={submitted}
                  onChange={() => handleToggle(i)}
                  name={`check_${quiz.id}_${i}`}
                  type={quiz.type === TYPES.Single ? "radio" : "checkbox"}
                />
                <span dangerouslySetInnerHTML={{ __html: opt }} />
                {renderMark(status)}
              </label>
            </li>
          );
        })}
      </ul>
      {checkEnabled && (
        <div className="flex gap-2 mt-2">
          {!submitted ? (
            <button className={buttonStyle} onClick={handleCheck}>
              Check
            </button>
          ) : (
            <button className={buttonStyle} onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ChoiceInput({
  checked,
  disabled = false,
  onChange,
  type = "checkbox",
  name,
  className = "",
}) {
  return (
    <input
      className={className}
      type={type}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      name={name}
    />
  );
}
