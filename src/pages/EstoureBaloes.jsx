import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EstoureBaloes.css';

const NUMBERS = Array.from({ length: 10 }, (_, index) => index + 1);
const ROUND_SECONDS = 10 * 60;
const SIGN_IMAGES = [
  new URL('../../imagens/numero1.jpeg', import.meta.url).href,
  new URL('../../imagens/numero2.jpeg', import.meta.url).href,
  new URL('../../imagens/numero3.jpeg', import.meta.url).href,
  new URL('../../imagens/numero4.jpeg', import.meta.url).href,
  new URL('../../imagens/numero5.jpeg', import.meta.url).href,
  new URL('../../imagens/numero6.jpeg', import.meta.url).href,
  new URL('../../imagens/numero7.jpeg', import.meta.url).href,
  new URL('../../imagens/numero8.jpeg', import.meta.url).href,
  new URL('../../imagens/numero9.jpeg', import.meta.url).href,
  new URL('../../imagens/numero10.png', import.meta.url).href,
];
const BALLOON_COLORS = ['pink', 'blue', 'yellow', 'green', 'purple', 'orange'];
const PRAISE = ['Muito bem!', 'Parabéns!', 'Mandou bem!', 'Isso aí!'];

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

function createChoices(target) {
  return shuffle([target, ...shuffle(NUMBERS.filter((number) => number !== target)).slice(0, 3)]);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function Balloon({ number, index, popped, disabled, onClick }) {
  const color = BALLOON_COLORS[index % BALLOON_COLORS.length];

  return (
    <button
      className={`balloon balloon-${color} ${popped ? 'is-popped' : ''}`}
      type="button"
      aria-label={`Balão com o sinal do número ${number}`}
      disabled={disabled}
      onClick={() => onClick(number)}
      style={{ '--balloon-delay': `${(index % 5) * -0.42}s` }}
    >
      <span className="balloon-shine" aria-hidden="true" />
      <img src={SIGN_IMAGES[number - 1]} alt={`Número ${number} em Libras`} />
      <span className="balloon-string" aria-hidden="true" />
    </button>
  );
}

export default function EstoureBaloes() {
  const [gameState, setGameState] = useState('ready');
  const [rounds, setRounds] = useState([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [poppedNumber, setPoppedNumber] = useState(null);
  const [message, setMessage] = useState('');
  const deadlineRef = useRef(null);
  const advanceTimeoutRef = useRef(null);
  const targetNumber = rounds[roundIndex];
  const isPlaying = gameState === 'playing';

  useEffect(() => {
    if (!isPlaying) return undefined;
    const updateTime = () => {
      const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) setGameState('time-up');
    };
    updateTime();
    const interval = window.setInterval(updateTime, 250);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => () => window.clearTimeout(advanceTimeoutRef.current), []);

  function startGame() {
    window.clearTimeout(advanceTimeoutRef.current);
    const newRounds = shuffle(NUMBERS);
    setRounds(newRounds);
    setRoundIndex(0);
    setChoices(createChoices(newRounds[0]));
    setScore(0);
    setTimeLeft(ROUND_SECONDS);
    setPoppedNumber(null);
    setMessage('');
    deadlineRef.current = Date.now() + ROUND_SECONDS * 1000;
    setGameState('playing');
  }

  function playCelebration() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioContext = new AudioContextClass();
    [523, 659, 784].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const startAt = audioContext.currentTime + index * 0.1;
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.2);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + 0.21);
      if (index === 2) oscillator.onended = () => audioContext.close();
    });
  }

  function chooseBalloon(number) {
    if (!isPlaying || poppedNumber !== null) return;
    if (Date.now() >= deadlineRef.current) {
      setTimeLeft(0);
      setGameState('time-up');
      return;
    }
    if (number !== targetNumber) {
      setMessage('Quase! Tente outro balão.');
      return;
    }

    setPoppedNumber(number);
    setMessage(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
    setScore((currentScore) => currentScore + 100);
    playCelebration();
    advanceTimeoutRef.current = window.setTimeout(() => {
      if (Date.now() >= deadlineRef.current) {
        setGameState('time-up');
        return;
      }
      if (roundIndex === rounds.length - 1) {
        setGameState('won');
        return;
      }
      const nextIndex = roundIndex + 1;
      setRoundIndex(nextIndex);
      setChoices(createChoices(rounds[nextIndex]));
      setPoppedNumber(null);
      setMessage('');
    }, 1050);
  }

  const isOver = gameState === 'time-up';
  const isWon = gameState === 'won';

  return (
    <main className="balloon-game">
      <header className="balloon-header">
        <Link className="balloon-back" to="/jogos" aria-label="Voltar para a sala de jogos">← Jogos</Link>
        <div className="balloon-title">
          <span className="balloon-title-kicker">Aprender brincando</span>
          <h1>Estoure os balões!</h1>
        </div>
        <span className="balloon-header-star" aria-hidden="true">✦</span>
      </header>

      <section className="balloon-game-panel" aria-label="Jogo de números em Libras">
        <div className="balloon-scoreboard" aria-label="Placar da partida">
          <div className="balloon-stat">
            <span>Pontos</span>
            <strong>{score}</strong>
          </div>
          <div className="balloon-stat balloon-round-stat">
            <span>Fase</span>
            <strong>{isWon ? 10 : isPlaying ? roundIndex + 1 : 0}<small> / 10</small></strong>
          </div>
          <div className={`balloon-stat balloon-timer ${timeLeft <= 60 ? 'is-low' : ''}`}>
            <span>Tempo</span>
            <strong aria-live="off">{formatTime(timeLeft)}</strong>
          </div>
        </div>

        {gameState === 'ready' && (
          <div className="balloon-message-screen">
            <div className="balloon-preview" aria-hidden="true"><span>🎈</span><span>🎈</span><span>🎈</span></div>
            <p className="balloon-eyebrow">Uma aventura em Libras</p>
            <h2>Prepare o dedo!</h2>
            <p>Encontre o sinal pedido e estoure o balão certo. São 10 fases e cada acerto vale 100 pontos!</p>
            <button className="balloon-primary-button" type="button" onClick={startGame}>Começar a jogar</button>
          </div>
        )}

        {isPlaying && (
          <div className="balloon-round">
            <div className="balloon-instruction" aria-live="polite">
              <span>Estoure apenas o número</span>
              <strong>{targetNumber}!</strong>
            </div>
            <p className={`balloon-feedback ${poppedNumber !== null ? 'is-success' : ''}`} aria-live="polite">
              {message || 'Qual sinal está certo?'}
            </p>
            <div className="balloon-field">
              {choices.map((number, index) => (
                <Balloon
                  key={number}
                  number={number}
                  index={index}
                  popped={poppedNumber === number}
                  disabled={poppedNumber !== null}
                  onClick={chooseBalloon}
                />
              ))}
            </div>
          </div>
        )}

        {(isWon || isOver) && (
          <div className="balloon-message-screen balloon-result-screen" role="status">
            <span className="balloon-result-icon" aria-hidden="true">{isWon ? '🏆' : '⏰'}</span>
            <p className="balloon-eyebrow">{isWon ? 'Missão cumprida' : 'Fim de jogo'}</p>
            <h2>{isWon ? 'Parabéns, você conseguiu!' : 'O tempo acabou!'}</h2>
            <p>{isWon ? 'Você reconheceu todos os números em Libras!' : 'Você foi muito bem. Vamos tentar mais uma vez?'}</p>
            <div className="balloon-final-score"><span>Pontuação final</span><strong>{score}</strong></div>
            <button className="balloon-primary-button" type="button" onClick={startGame}>Jogar novamente</button>
          </div>
        )}
      </section>
      <p className="balloon-footer-note">Cada balão guarda um número em Libras. Boa diversão!</p>
    </main>
  );
}