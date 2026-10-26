import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/QuizDatilologia.css';

const QUESTIONS = [
  { word: 'MORANGO', options: ['BANANA', 'MORANGO', 'MAÇÃ', 'ABACAXI'] },
  { word: 'BANANA', options: ['BANANA', 'UVA', 'PÊRA', 'MORANGO'] },
  { word: 'ABACAXI', options: ['MELANCIA', 'ABACAXI', 'LARANJA', 'MAMÃO'] },
  { word: 'MAÇÃ', options: ['PÊRA', 'MAÇÃ', 'UVA', 'BANANA'] },
  { word: 'BOLA', options: ['BOLA', 'BONECA', 'PIPA', 'DADO'] },
  { word: 'GATO', options: ['CACHORRO', 'GATO', 'PATO', 'SAPO'] },
  { word: 'CASA', options: ['ESCOLA', 'CASA', 'BOLA', 'MESA'] },
  { word: 'ESCOLA', options: ['LIVRO', 'ESCOLA', 'CASA', 'BONECA'] },
  { word: 'SAPO', options: ['PATO', 'GATO', 'SAPO', 'PEIXE'] },
  { word: 'PATO', options: ['SAPO', 'GATO', 'PATO', 'PEIXE'] },
];

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export default function QuizDatilologia() {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [screen, setScreen] = useState('start');

  function startGame() {
    setQuestions(shuffle(QUESTIONS));
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setScreen('playing');
  }

  function chooseAnswer(answer) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answer);
    if (answer === questions[questionIndex].word) setScore((current) => current + 10);
  }

  function advance() {
    if (questionIndex === questions.length - 1) {
      setScreen('result');
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  const currentQuestion = questions[questionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.word;

  return (
    <div className="spelling-quiz">
      <div className="spelling-quiz-topline">
        <Link to="/jogos" className="spelling-back-link">← Sala de jogos</Link>
        <span className="spelling-game-tag">Jogo de palavras</span>
      </div>

      {screen === 'start' && (
        <section className="spelling-panel spelling-intro" aria-labelledby="spelling-title">
          <div className="spelling-intro-art" aria-hidden="true">
            <span className="spelling-art-star">✦</span>
            <span className="spelling-art-tile spelling-art-tile-one">L</span>
            <span className="spelling-art-tile spelling-art-tile-two">I</span>
            <span className="spelling-art-tile spelling-art-tile-three">B</span>
          </div>
          <p className="spelling-eyebrow">Uma aventura de letras</p>
          <h1 id="spelling-title">Quiz de <span>Datilologia</span></h1>
          <p className="spelling-intro-copy">Descubra qual palavra aparece na sequência de letras. São 10 perguntas e cada acerto vale 10 pontos!</p>
          <button className="spelling-primary-button" type="button" onClick={startGame}>Jogar <span aria-hidden="true">→</span></button>
          <p className="spelling-image-notice">As imagens validadas das configurações das mãos ainda não estão disponíveis neste projeto. A sequência mostrada durante o jogo é escrita, não uma representação dos sinais em Libras.</p>
        </section>
      )}

      {screen === 'playing' && currentQuestion && (
        <section className="spelling-panel spelling-round" aria-labelledby="question-title">
          <div className="spelling-round-header">
            <div>
              <p className="spelling-eyebrow">Vamos descobrir!</p>
              <h1 id="question-title">Qual é a palavra?</h1>
            </div>
            <div className="spelling-score"><span>Pontos</span><strong>{score}</strong></div>
          </div>

          <div className="spelling-progress-row">
            <span>Pergunta {questionIndex + 1} de {questions.length}</span>
            <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div
            className="spelling-progress-track"
            role="progressbar"
            aria-label="Progresso da partida"
            aria-valuemin="1"
            aria-valuemax={questions.length}
            aria-valuenow={questionIndex + 1}
          >
            <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
          </div>

          <div className="spelling-sequence" aria-label={`Sequência escrita: ${[...currentQuestion.word].join(', ')}`}>
            {[...currentQuestion.word].map((letter, index) => (
              <span className="spelling-letter-tile" key={`${letter}-${index}`} aria-hidden="true">{letter}</span>
            ))}
          </div>
          <p className="spelling-sequence-caption">Sequência de letras</p>

          <div className="spelling-options" role="group" aria-label="Escolha uma palavra">
            {currentQuestion.options.map((option, index) => {
              const isAnswer = option === currentQuestion.word;
              const isSelected = option === selectedAnswer;
              let stateClass = '';
              if (selectedAnswer !== null && isAnswer) stateClass = 'is-correct';
              else if (isSelected) stateClass = 'is-incorrect';
              return (
                <button
                  className={`spelling-option ${stateClass}`}
                  type="button"
                  key={option}
                  onClick={() => chooseAnswer(option)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="spelling-option-index" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                  {selectedAnswer !== null && isAnswer && <span className="spelling-option-mark" aria-label="Resposta correta">✓</span>}
                  {isSelected && !isCorrect && <span className="spelling-option-mark" aria-label="Resposta escolhida">×</span>}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className={`spelling-feedback ${isCorrect ? 'is-correct' : 'is-incorrect'}`} aria-live="polite">
              <p><span aria-hidden="true">{isCorrect ? '✦' : '💛'}</span> {isCorrect ? 'Muito bem! Você acertou!' : `Boa tentativa! A palavra era ${currentQuestion.word}.`}</p>
              <button className="spelling-primary-button spelling-next-button" type="button" onClick={advance}>
                {questionIndex === questions.length - 1 ? 'Ver resultado' : 'Próxima pergunta'} <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </section>
      )}

      {screen === 'result' && (
        <section className="spelling-panel spelling-result" aria-labelledby="result-title">
          <span className="spelling-result-spark" aria-hidden="true">✦</span>
          <p className="spelling-eyebrow">Fim de jogo!</p>
          <h1 id="result-title">Você fez <span>{score} pontos</span></h1>
          <p className="spelling-result-copy">{score === 100 ? 'Incrível! Você acertou todas as palavras!' : 'Cada rodada é uma chance de aprender. Continue praticando!'}</p>
          <div className="spelling-result-score" aria-label={`${score} pontos de 100`}><strong>{score}</strong><span>de 100 pontos</span></div>
          <button className="spelling-primary-button" type="button" onClick={startGame}>Jogar novamente <span aria-hidden="true">↻</span></button>
        </section>
      )}
    </div>
  );
}