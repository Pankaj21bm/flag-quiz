import { useState, useEffect, useLayoutEffect } from 'react';

const MAX_GUESSES = 10;

const Quiz = ({ selectedCountries }) => {
  const [score, setScore] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [currentFlag, setCurrentFlag] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useLayoutEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    if (score.total >= MAX_GUESSES) {
      setGameOver(true);
      return;
    }
    const correctCountry = selectedCountries[Math.floor(Math.random() * selectedCountries.length)];
    const wrongCountries = selectedCountries
      .filter(c => c.code !== correctCountry.code)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(c => c.name);

    const allOptions = [...wrongCountries, correctCountry.name];
    setOptions(allOptions.sort(() => 0.5 - Math.random()));
    setCurrentFlag(correctCountry);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer) => {
    if (gameOver) return;

    setScore(prev => {
      const newScore = {
        correct: prev.correct + (answer === currentFlag.name ? 1 : 0),
        incorrect: prev.incorrect + (answer !== currentFlag.name ? 1 : 0),
        total: prev.total + 1,
      };
      if (newScore.total >= MAX_GUESSES) setGameOver(true);
      return newScore;
    });
    setSelectedAnswer(answer);
    setTimeout(generateNewQuestion, 800);
  };

  const resetGame = () => {
    setScore({ correct: 0, incorrect: 0, total: 0 });
    setGameOver(false);
    generateNewQuestion();
  };

  if (!currentFlag) return <div>Loading...</div>;

  return (
    <div className="quiz-container">
      <div className="score">
        Correct: {score.correct} | Incorrect: {score.incorrect}
      </div>

      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button onClick={resetGame} className="reset-button">Play Again</button>
        </div>
      ) : (
        <>
          <img
            src={`/flags/${(currentFlag.code.toLowerCase())}.svg`}
            alt="Flag to guess"
            className="flag-image"
          />

          <div className="options-container">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={`option-button ${selectedAnswer && option === currentFlag.name ? 'correct' : ''
                  } ${selectedAnswer && option !== currentFlag.name ? 'incorrect' : ''
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}

      {!gameOver && (
        <button onClick={resetGame} className="reset-button">Reset Game</button>
      )}
    </div>
  );
};

export default Quiz;
