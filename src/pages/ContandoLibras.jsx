import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import imagemAbacaxi from '../../imagens/abacaxi.jpeg';
import imagemBanana from '../../imagens/banana.jpeg';
import imagemMaca from '../../imagens/maca.jpeg';
import imagemMorango from '../../imagens/morango.jpeg';
import '../styles/ContandoLibras.css';

const FRUITS = [
  { id: 'melancia', name: 'Melancia', image: null, color: '#f5b2a1' },
  { id: 'maca', name: 'Maçã', image: imagemMaca, color: '#f4c7a8' },
  { id: 'morango', name: 'Morango', image: imagemMorango, color: '#f2b8b0' },
  { id: 'laranja', name: 'Laranja', image: null, color: '#ffd397' },
  { id: 'uva', name: 'Uva', image: null, color: '#d8c6ec' },
  { id: 'banana', name: 'Banana', image: imagemBanana, color: '#f4df91' },
  { id: 'abacaxi', name: 'Abacaxi', image: imagemAbacaxi, color: '#dfcf8d' },
  { id: 'coco', name: 'Coco', image: null, color: '#c7b5a5' },
  { id: 'limao', name: 'Limão', image: null, color: '#d5e59d' },
  { id: 'mamao', name: 'Mamão', image: null, color: '#f2bd89' },
];

const NUMBERS = Array.from({ length: 10 }, (_, index) => ({
  number: index + 1,
  fruit: FRUITS[index],
  signImage: null,
}));

const PHASES = [NUMBERS.slice(0, 5), NUMBERS.slice(5)];
const NUMBER_CHART_IMAGE = null;
const ROUND_INSTRUCTION = 'Toque em um sinal e depois na quantidade de frutas correspondente.';

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function getTimestamp() {
  return Date.now();
}

function FruitQuantity({ item }) {
  return (
    <>
      <span className="counting-fruit-name">{item.fruit.name}</span>
      <span className="counting-fruit-quantity" aria-hidden="true">
        {Array.from({ length: item.number }, (_, index) => (
          item.fruit.image ? (
            <img
              className="counting-fruit-image"
              key={`${item.number}-${index}`}
              src={item.fruit.image}
              alt=""
              draggable="false"
            />
          ) : (
            <span
              className="counting-fruit-slot"
              key={`${item.number}-${index}`}
              style={{ '--fruit-slot-color': item.fruit.color }}
            />
          )
        ))}
      </span>
    </>
  );
}

export default function ContandoLibras() {
  const [screen, setScreen] = useState('start');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [leftOrder, setLeftOrder] = useState([]);
  const [rightOrder, setRightOrder] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selection, setSelection] = useState(null);
  const [incorrectCards, setIncorrectCards] = useState([]);
  const [feedback, setFeedback] = useState({ type: 'neutral', text: ROUND_INSTRUCTION });
  const [phaseScore, setPhaseScore] = useState(0);
  const [score, setScore] = useState(0);
  const [phaseSeconds, setPhaseSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [phaseResults, setPhaseResults] = useState([]);
  const [boardSize, setBoardSize] = useState({ width: 1, height: 1 });
  const [connections, setConnections] = useState([]);
  const boardRef = useRef(null);
  const cardRefs = useRef(new Map());
  const phaseStartedAtRef = useRef(0);
  const gameStartedAtRef = useRef(0);
  const selectionStartedAtRef = useRef(0);
  const incorrectTimeoutRef = useRef(null);
  const advanceTimeoutRef = useRef(null);
  const currentPairs = PHASES[phaseIndex];

  function startPhase(index) {
    const pairs = PHASES[index];
    setPhaseIndex(index);
    setLeftOrder(shuffle(pairs));
    setRightOrder(shuffle(pairs));
    setMatches([]);
    setSelection(null);
    setIncorrectCards([]);
    setPhaseScore(0);
    setPhaseSeconds(0);
    setFeedback({ type: 'neutral', text: ROUND_INSTRUCTION });
    phaseStartedAtRef.current = getTimestamp();
    setScreen('playing');
  }

  function startGame() {
    window.clearTimeout(advanceTimeoutRef.current);
    window.clearTimeout(incorrectTimeoutRef.current);
    setScore(0);
    setPhaseResults([]);
    setTotalSeconds(0);
    gameStartedAtRef.current = getTimestamp();
    startPhase(0);
  }

  function continueAfterPhase() {
    window.clearTimeout(advanceTimeoutRef.current);
    if (phaseIndex === 0) {
      startPhase(1);
      return;
    }
    setScreen('result');
  }

  function finishPhase(nextMatches, nextPhaseScore) {
    const phaseDuration = Math.floor((getTimestamp() - phaseStartedAtRef.current) / 1000);
    const result = {
      phase: phaseIndex + 1,
      score: nextPhaseScore,
      seconds: phaseDuration,
      correct: nextMatches.length,
    };
    setPhaseResults((current) => [...current, result]);
    if (phaseIndex === 1) {
      setTotalSeconds(Math.floor((getTimestamp() - gameStartedAtRef.current) / 1000));
    }
    setScreen('phase-complete');
    advanceTimeoutRef.current = window.setTimeout(() => {
      if (phaseIndex === 0) startPhase(1);
      else setScreen('result');
    }, 3000);
  }

  function chooseCard(side, item) {
    const key = `${side}-${item.number}`;
    if (matches.some((match) => match.number === item.number)) return;
    window.clearTimeout(incorrectTimeoutRef.current);
    setIncorrectCards([]);

    if (!selection) {
      setSelection({ side, number: item.number, key });
      selectionStartedAtRef.current = getTimestamp();
      return;
    }

    if (selection.side === side) {
      if (selection.key === key) {
        setSelection(null);
      } else {
        setSelection({ side, number: item.number, key });
        selectionStartedAtRef.current = getTimestamp();
      }
      return;
    }

    setSelection(null);
    if (selection.number !== item.number) {
      setIncorrectCards([selection.key, key]);
      setFeedback({ type: 'incorrect', text: 'Tente outra combinação!' });
      incorrectTimeoutRef.current = window.setTimeout(() => {
        setIncorrectCards([]);
        setFeedback({ type: 'neutral', text: ROUND_INSTRUCTION });
      }, 1100);
      return;
    }

    const elapsedSeconds = Math.floor((getTimestamp() - selectionStartedAtRef.current) / 1000);
    const points = Math.max(10, 100 - elapsedSeconds * 5);
    const nextMatches = [...matches, { number: item.number, points }];
    const nextPhaseScore = phaseScore + points;
    setMatches(nextMatches);
    setPhaseScore(nextPhaseScore);
    setScore((current) => current + points);
    setFeedback({ type: 'correct', text: `Muito bem! +${points} pontos` });

    if (nextMatches.length === currentPairs.length) {
      finishPhase(nextMatches, nextPhaseScore);
    }
  }

  useEffect(() => {
    if (screen !== 'playing') return undefined;
    const updateTime = () => {
      setPhaseSeconds(Math.floor((getTimestamp() - phaseStartedAtRef.current) / 1000));
    };
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, [screen, phaseIndex]);

  useEffect(() => () => {
    window.clearTimeout(incorrectTimeoutRef.current);
    window.clearTimeout(advanceTimeoutRef.current);
  }, []);

  useLayoutEffect(() => {
    if (screen !== 'playing') return undefined;
    const measureConnections = () => {
      const board = boardRef.current;
      if (!board) return;
      const bounds = board.getBoundingClientRect();
      setBoardSize({ width: Math.max(1, bounds.width), height: Math.max(1, bounds.height) });
      const nextConnections = matches.flatMap((match) => {
        const left = cardRefs.current.get(`left-${match.number}`)?.getBoundingClientRect();
        const right = cardRefs.current.get(`right-${match.number}`)?.getBoundingClientRect();
        if (!left || !right) return [];
        return [{
          number: match.number,
          x1: left.left + left.width / 2 - bounds.left,
          y1: left.top + left.height / 2 - bounds.top,
          x2: right.left + right.width / 2 - bounds.left,
          y2: right.top + right.height / 2 - bounds.top,
        }];
      });
      setConnections(nextConnections);
    };
    const frame = window.requestAnimationFrame(measureConnections);
    const observer = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(measureConnections);
    if (boardRef.current && observer) observer.observe(boardRef.current);
    window.addEventListener('resize', measureConnections);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', measureConnections);
    };
  }, [matches, leftOrder, rightOrder, screen]);

  const totalCorrect = phaseResults.reduce((total, result) => total + result.correct, 0);
  const currentPhaseResult = phaseResults[phaseIndex];

  return (
    <main className="counting-game">
      <div className="counting-topline">
        <Link to="/jogos" className="counting-back-link">← Sala de jogos</Link>
        <span className="counting-game-label">Números em Libras</span>
      </div>

      {screen === 'start' && (
        <section className="counting-start" aria-labelledby="counting-title">
          <div className="counting-start-copy">
            <p className="counting-eyebrow">Jogo de associação</p>
            <h1 id="counting-title">Contando <span>com Libras</span></h1>
            <p>Relacione cada sinal à quantidade certa de frutas.</p>
            <div className="counting-start-actions">
              <button className="counting-primary-button" type="button" onClick={startGame}>COMEÇAR JOGO</button>
              <button className="counting-secondary-button" type="button" onClick={() => setScreen('learn')}>NÚMEROS EM LIBRAS</button>
            </div>
            <p className="counting-assets-note">Os sinais e algumas imagens de frutas aguardam os arquivos finais.</p>
          </div>
          <div className="counting-fruit-preview" aria-hidden="true">
            {[imagemMaca, imagemMorango, imagemBanana, imagemAbacaxi].map((image, index) => (
              <img src={image} alt="" key={image} className={`counting-preview-fruit counting-preview-fruit-${index + 1}`} />
            ))}
          </div>
        </section>
      )}

      {screen === 'learn' && (
        <section className="counting-learning" aria-labelledby="counting-learning-title">
          <div className="counting-section-heading">
            <div>
              <p className="counting-eyebrow">Consulte antes de jogar</p>
              <h1 id="counting-learning-title">Números em Libras</h1>
            </div>
            <button className="counting-secondary-button" type="button" onClick={() => setScreen('start')}>Voltar ao início</button>
          </div>
          {NUMBER_CHART_IMAGE ? (
            <img className="counting-number-chart" src={NUMBER_CHART_IMAGE} alt="Sinais em Libras dos números de 1 a 10" />
          ) : (
            <div className="counting-chart-placeholder" role="img" aria-label="Espaço reservado para a imagem dos números em Libras de 1 a 10">
              <span className="counting-chart-numbers" aria-hidden="true">1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10</span>
              <strong>Imagem dos sinais de 1 a 10</strong>
              <span>O arquivo ilustrativo será adicionado aqui.</span>
            </div>
          )}
        </section>
      )}

      {screen === 'playing' && (
        <section className="counting-round" aria-labelledby="counting-round-title">
          <div className="counting-round-header">
            <div>
              <p className="counting-eyebrow">Fase {phaseIndex + 1} de 2</p>
              <h1 id="counting-round-title">Números {phaseIndex === 0 ? 'de 1 a 5' : 'de 6 a 10'}</h1>
            </div>
            <div className="counting-stats" aria-live="polite">
              <div><span>Tempo</span><strong>{formatTime(phaseSeconds)}</strong></div>
              <div><span>Pontos</span><strong>{score}</strong></div>
            </div>
          </div>
          <div className="counting-progress" aria-label={`Fase ${phaseIndex + 1}: ${matches.length} de 5 associações corretas`}>
            <span style={{ width: `${(matches.length / 5) * 100}%` }} />
          </div>
          <div className="counting-board" ref={boardRef}>
            <svg
              className="counting-connections"
              viewBox={`0 0 ${boardSize.width} ${boardSize.height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {connections.map((connection) => (
                <line
                  key={connection.number}
                  x1={connection.x1}
                  y1={connection.y1}
                  x2={connection.x2}
                  y2={connection.y2}
                />
              ))}
            </svg>
            <div className="counting-column">
              <h2>Sinal</h2>
              {leftOrder.map((item) => {
                const key = `left-${item.number}`;
                const matched = matches.some((match) => match.number === item.number);
                return (
                  <button
                    className={`counting-choice counting-sign-choice ${selection?.key === key ? 'is-selected' : ''} ${matched ? 'is-matched' : ''} ${incorrectCards.includes(key) ? 'is-incorrect' : ''}`}
                    type="button"
                    key={key}
                    ref={(element) => {
                      if (element) cardRefs.current.set(key, element);
                      else cardRefs.current.delete(key);
                    }}
                    aria-label={`Sinal numérico em Libras para ${item.number}`}
                    aria-pressed={selection?.key === key || matched}
                    disabled={matched}
                    onClick={() => chooseCard('left', item)}
                  >
                    {item.signImage ? (
                      <img className="counting-sign-image" src={item.signImage} alt="" />
                    ) : (
                      <span className="counting-sign-placeholder" aria-hidden="true">
                        <strong>{item.number}</strong><small>imagem do sinal</small>
                      </span>
                    )}
                    {matched && <span className="counting-match-mark" aria-hidden="true">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="counting-column">
              <h2>Quantidade de frutas</h2>
              {rightOrder.map((item) => {
                const key = `right-${item.number}`;
                const matched = matches.some((match) => match.number === item.number);
                return (
                  <button
                    className={`counting-choice counting-fruit-choice ${selection?.key === key ? 'is-selected' : ''} ${matched ? 'is-matched' : ''} ${incorrectCards.includes(key) ? 'is-incorrect' : ''}`}
                    type="button"
                    key={key}
                    ref={(element) => {
                      if (element) cardRefs.current.set(key, element);
                      else cardRefs.current.delete(key);
                    }}
                    aria-label={`Quantidade de ${item.fruit.name}: ${item.number} ${item.number === 1 ? 'unidade' : 'unidades'}`}
                    aria-pressed={selection?.key === key || matched}
                    disabled={matched}
                    onClick={() => chooseCard('right', item)}
                  >
                    <FruitQuantity item={item} />
                    {matched && <span className="counting-match-mark" aria-hidden="true">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
          <p className={`counting-feedback is-${feedback.type}`} role="status" aria-live="polite">{feedback.text}</p>
        </section>
      )}

      {screen === 'phase-complete' && currentPhaseResult && (
        <section className="counting-complete" aria-live="polite">
          <span className="counting-complete-star" aria-hidden="true">★</span>
          <p className="counting-eyebrow">Muito bem!</p>
          <h1>Fase {currentPhaseResult.phase} concluída</h1>
          <p>Você acertou as 5 associações.</p>
          <div className="counting-phase-score">
            <span>Pontos nesta fase</span><strong>{currentPhaseResult.score}</strong>
            <span>Tempo: {formatTime(currentPhaseResult.seconds)}</span>
          </div>
          <button className="counting-primary-button" type="button" onClick={continueAfterPhase}>
            {phaseIndex === 0 ? 'IR PARA A FASE 2' : 'VER RESULTADO'}
          </button>
          <p className="counting-auto-advance">A próxima tela abrirá automaticamente.</p>
        </section>
      )}

      {screen === 'result' && (
        <section className="counting-result" aria-labelledby="counting-result-title">
          <span className="counting-complete-star" aria-hidden="true">★</span>
          <p className="counting-eyebrow">Fim de jogo</p>
          <h1 id="counting-result-title">Você foi muito bem!</h1>
          <div className="counting-result-stats">
            <div><span>Pontuação total</span><strong>{score}</strong></div>
            <div><span>Tempo total</span><strong>{formatTime(totalSeconds)}</strong></div>
            <div><span>Associações certas</span><strong>{totalCorrect} de 10</strong></div>
          </div>
          <div className="counting-phase-results">
            {phaseResults.map((result) => (
              <p key={result.phase}>Fase {result.phase}: {result.score} pontos · {formatTime(result.seconds)}</p>
            ))}
          </div>
          <p className="counting-result-message">Cada número aprendido é uma nova conquista!</p>
          <div className="counting-result-actions">
            <button className="counting-primary-button" type="button" onClick={startGame}>JOGAR NOVAMENTE</button>
            <button className="counting-secondary-button" type="button" onClick={() => setScreen('start')}>TELA INICIAL</button>
          </div>
        </section>
      )}
    </main>
  );
}