import React, { useState, useRef } from 'react';

const Matching = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const dragCounter = useRef(0);

  // Quiz data - you can easily modify this
  const quizData = [
    { id: 1, term: "JavaScript", definition: "A programming language used for web development" },
    { id: 2, term: "CSS", definition: "A stylesheet language used for describing the presentation of HTML" },
    { id: 3, term: "React", definition: "A JavaScript library for building user interfaces" },
    { id: 4, term: "HTML", definition: "The standard markup language for creating web pages" },
    { id: 5, term: "Node.js", definition: "A JavaScript runtime built on Chrome's V8 JavaScript engine" }
  ];

  const handleDragStart = (e, term) => {
    setDraggedItem(term);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    e.currentTarget.classList.add('bg-blue-100', 'border-blue-400');
  };

  const handleDragLeave = (e) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      e.currentTarget.classList.remove('bg-blue-100', 'border-blue-400');
    }
  };

  const handleDrop = (e, definitionId) => {
    e.preventDefault();
    dragCounter.current = 0;
    e.currentTarget.classList.remove('bg-blue-100', 'border-blue-400');
    
    if (draggedItem) {
      setMatches(prev => ({
        ...prev,
        [definitionId]: draggedItem
      }));
    }
  };

  const removeMatch = (definitionId) => {
    setMatches(prev => {
      const newMatches = { ...prev };
      delete newMatches[definitionId];
      return newMatches;
    });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setMatches({});
    setShowResults(false);
  };

  const getScore = () => {
    let correct = 0;
    quizData.forEach(item => {
      if (matches[item.id] && matches[item.id].id === item.id) {
        correct++;
      }
    });
    return correct;
  };

  const usedTerms = Object.values(matches).map(match => match?.id).filter(Boolean);
  const availableTerms = quizData.filter(item => !usedTerms.includes(item.id));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Programming Terms Matching Quiz
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terms Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Terms (Drag these to match)
            </h2>
            <div className="space-y-3">
              {availableTerms.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  className="bg-blue-500 text-white p-4 rounded-lg cursor-move hover:bg-blue-600 transition-colors shadow-md select-none"
                >
                  {item.term}
                </div>
              ))}
            </div>
          </div>

          {/* Definitions Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Definitions (Drop terms here)
            </h2>
            <div className="space-y-3">
              {quizData.map(item => {
                const matchedTerm = matches[item.id];
                const isCorrect = matchedTerm && matchedTerm.id === item.id;
                const isIncorrect = matchedTerm && matchedTerm.id !== item.id;
                
                return (
                  <div
                    key={item.id}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, item.id)}
                    className={`min-h-20 p-4 rounded-lg border-2 border-dashed transition-all ${
                      matchedTerm 
                        ? showResults
                          ? isCorrect 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-red-400 bg-red-50'
                          : 'border-gray-400 bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-gray-700 flex-1">{item.definition}</p>
                      {showResults && (
                        <div className="ml-2">
                          {isCorrect ? (
                            <svg className="text-green-500 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : isIncorrect ? (
                            <svg className="text-red-500 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                      )}
                    </div>
                    
                    {matchedTerm && (
                      <div className="flex items-center justify-between">
                        <div className={`px-3 py-1 rounded text-sm font-medium ${
                          showResults
                            ? isCorrect
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                            : 'bg-blue-200 text-blue-800'
                        }`}>
                          {matchedTerm.term}
                        </div>
                        {!showResults && (
                          <button
                            onClick={() => removeMatch(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {!showResults ? (
            <button
              onClick={checkAnswers}
              disabled={Object.keys(matches).length === 0}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Check Answers
            </button>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold mb-4 text-gray-800">
                Score: {getScore()}/{quizData.length}
              </div>
              <button
                onClick={resetQuiz}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matching;