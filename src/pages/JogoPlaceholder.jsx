import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/JogoMemoria.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LEVELS = [
  { id: 'facil', name: 'Começando', pairs: 5, letters: ['A', 'B', 'C', 'M', 'S'] },
  { id: 'medio', name: 'Aventureiro', pairs: 10, letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'L', 'M'] },
  { id: 'avancado', name: 'Desafio', pairs: 26, letters: ALPHABET },
];
const ROUND_SECONDS = 600;

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function createCards(letters) {
  return shuffle(letters.flatMap((letter) => [
    { id: `${letter}-letter`, letter, type: 'letter' },
    { id: `${letter}-sign`, letter, type: 'sign' },
  ]));
}

function SignPlaceholder({ letter }) {
  return (
    <span className="memory-sign-placeholder" aria-hidden="true">
      <span className="memory-sign-label">IMAGEM PENDENTE</span>
      <span className="memory-sign-letter">{letter}</span>
      <span className="memory-sign-note">sinal da letra</span>
    </span>
  );
}

function AlphabetView({ onBack }) {
  return (
    <section className="memory-learning" aria-labelledby="learning-title">
      <div className="memory-section-heading">
        <div>
          <p className="memory-eyebrow">Aprender antes de jogar</p>
          <h2 id="learning-title">Alfabeto manual</h2>
        </div>
        <button className="memory-secondary-button" type="button" onClick={onBack}>Voltar</button>
      </div>
      <div className="memory-learning-grid">
        {ALPHABET.map((letter) => (
          <div className="memory-learning-letter" key={letter}>
            <strong>{letter}</strong>
            <span>Letra {letter}</span>
            <small>Sinal visual ainda não cadastrado</small>
          </div>
        ))}
      </div>
      <p className="memory-learning-note">
        Libras é uma língua visual-espacial completa. O alfabeto manual é um de seus recursos,
        usado, por exemplo, para soletrar nomes próprios. As imagens dos sinais precisam ser
        incluídas e conferidas em uma fonte educativa confiável antes de serem apresentadas.
      </p>
    </section>
  );
}

export default function JogoPlaceholder() {
  const [levelId, setLevelId] = useState(LEVELS[0].id);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [gameState, setGameState] = useState('setup');
  const [showAlphabet, setShowAlphabet] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const deadlineRef = useRef(null);
  const timeoutRef = useRef(null);
  const level = LEVELS.find((item) => item.id === levelId);
  const isWon = gameState === 'won';
  const isOver = gameState === 'time-up';

  useEffect(() => {
    if (gameState !== 'playing') return undefined;
    const updateTime = () => {
      const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) setGameState('time-up');
    };
    updateTime();
    const interval = window.setInterval(updateTime, 250);
    return () => window.clearInterval(interval);
  }, [gameState]);

  useEffect(() => () => {
    window.clearTimeout(timeoutRef.current);
  }, []);

  function startGame() {
    window.clearTimeout(timeoutRef.current);
    setCards(createCards(level.letters));
    setSelected([]);
    setMatched([]);
    setScore(0);
    setTimeLeft(ROUND_SECONDS);
    deadlineRef.current = Date.now() + ROUND_SECONDS * 1000;
    setGameState('playing');
    setShowAlphabet(false);
  }

  function playSound(frequency) {
    if (!soundOn) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.16);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.16);
    oscillator.onended = () => audioContext.close();
  }

  function selectCard(card) {
    if (gameState !== 'playing' || selected.length === 2 || selected.includes(card.id) || matched.includes(card.letter)) return;
    const nextSelection = [...selected, card.id];
    setSelected(nextSelection);
    if (nextSelection.length === 1) return;

    const firstCard = cards.find((item) => item.id === nextSelection[0]);
    if (firstCard.letter === card.letter && firstCard.type !== card.type) {
      const nextMatched = [...matched, card.letter];
      setMatched(nextMatched);
      setSelected([]);
      setScore(nextMatched.length * 100);
      playSound(nextMatched.length === level.pairs ? 784 : 523);
      if (nextMatched.length === level.pairs) setGameState('won');
      return;
    }

    timeoutRef.current = window.setTimeout(() => setSelected([]), 1700);
  }

  function handleCardKeyDown(event, card) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectCard(card);
    }
  }

  if (showAlphabet) return <AlphabetView onBack={() => setShowAlphabet(false)} />;

  const isPlaying = gameState === 'playing';
  const elapsed = ROUND_SECONDS - timeLeft;
  return (
    <div className={`memory-game ${motionOn ? '' : 'memory-no-motion'}`}>
      <header className="memory-hero">
        <div className="memory-hero-copy">
          <p className="memory-eyebrow">Um jogo para descobrir</p>
          <h1>Memória <span>em Libras</span></h1>
          <p>Encontre as letras e seus sinais em Libras para aprender brincando!</p>
        </div>
        <div className="memory-hero-art" aria-hidden="true">
          <span className="memory-art-star">✦</span>
          <span className="memory-art-tile memory-art-tile-one">A</span>
          <span className="memory-art-tile memory-art-tile-two">L</span>
          <span className="memory-art-tile memory-art-tile-three">Z</span>
          <span className="memory-art-spark">✳</span>
        </div>
      </header>

      {!isPlaying && !isWon && !isOver && (
        <section className="memory-setup" aria-labelledby="setup-title">
          <div className="memory-section-heading">
            <div>
              <p className="memory-eyebrow">Escolha sua aventura</p>
              <h2 id="setup-title">Qual nível vamos jogar?</h2>
            </div>
            <div className="memory-settings" aria-label="Preferências do jogo">
              <button type="button" aria-pressed={soundOn} onClick={() => setSoundOn(!soundOn)}>
                {soundOn ? 'Som ligado' : 'Som desligado'}
              </button>
              <button type="button" aria-pressed={motionOn} onClick={() => setMotionOn(!motionOn)}>
                {motionOn ? 'Animação ligada' : 'Animação desligada'}
              </button>
            </div>
          </div>
          <div className="memory-levels" role="group" aria-label="Nível de dificuldade">
            {LEVELS.map((option, index) => (
              <button
                className={`memory-level memory-level-${index + 1} ${levelId === option.id ? 'is-selected' : ''}`}
                key={option.id}
                type="button"
                aria-pressed={levelId === option.id}
                onClick={() => setLevelId(option.id)}
              >
                <span className="memory-level-count">{option.pairs}</span>
                <span className="memory-level-label">{option.name}</span>
                <span className="memory-level-description">{option.pairs} pares · {option.pairs * 2} cartas</span>
              </button>
            ))}
          </div>
          <div className="memory-start-row">
            <p>Vire duas cartas e procure o par!</p>
            <div className="memory-start-actions">
              <button className="memory-secondary-button" type="button" onClick={() => setShowAlphabet(true)}>
                Aprender o alfabeto
              </button>
              <button className="memory-primary-button" type="button" onClick={startGame}>Começar a jogar</button>
            </div>
          </div>
          <p className="memory-source-note">As cartas de sinal identificam a letra, mas ainda não exibem a configuração da mão: o projeto não possui imagens validadas do alfabeto manual.</p>
        </section>
      )}

      {isPlaying && (
        <section className="memory-round" aria-label="Partida de memória">
          <div className="memory-round-topline">
            <Link to="/jogos" className="memory-back-link">Voltar aos jogos</Link>
            <button type="button" className="memory-restart-button" onClick={startGame}>Recomeçar</button>
          </div>
          <div className="memory-stats">
            <div className="memory-stat"><span>Pontuação</span><strong>{score}</strong></div>
            <div className="memory-stat"><span>Pares encontrados</span><strong>{matched.length} <small>de {level.pairs}</small></strong></div>
            <div className={`memory-stat memory-timer ${timeLeft <= 120 ? 'is-low' : ''}`} aria-live="polite">
              <span>Tempo restante</span><strong>{formatTime(timeLeft)}</strong>
            </div>
          </div>
          {timeLeft <= 120 && <p className="memory-time-message" role="status">Dois minutinhos! Você está indo muito bem.</p>}
          <p className="memory-instruction">Encontre os pares de letra e sinal. Cada acerto vale 100 pontos!</p>
          <div className={`memory-board memory-board-${level.pairs}`}>
            {cards.map((card, index) => {
              const isFaceUp = selected.includes(card.id) || matched.includes(card.letter);
              const label = card.type === 'letter'
                ? `Letra ${card.letter}`
                : `Imagem do sinal de Libras indisponível para a letra ${card.letter}`;
              return (
                <button
                  className={`memory-card ${isFaceUp ? 'is-face-up' : ''} ${matched.includes(card.letter) ? 'is-matched' : ''} ${card.type === 'sign' ? 'is-sign-card' : ''}`}
                  key={card.id}
                  type="button"
                  aria-label={isFaceUp ? label : `Carta ${index + 1}, virada para baixo`}
                  aria-pressed={isFaceUp}
                  disabled={matched.includes(card.letter)}
                  onClick={() => selectCard(card)}
                  onKeyDown={(event) => handleCardKeyDown(event, card)}
                >
                  <span className="memory-card-back" aria-hidden={isFaceUp}>?</span>
                  <span className="memory-card-front" aria-hidden={!isFaceUp}>
                    {card.type === 'letter' ? <><span className="memory-card-kind">LETRA</span><strong>{card.letter}</strong></> : <SignPlaceholder letter={card.letter} />}
                  </span>
                  {matched.includes(card.letter) && <span className="memory-match-mark" aria-label="Par encontrado">✓</span>}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {(isWon || isOver) && (
        <section className={`memory-result ${isWon ? 'memory-result-win' : ''}`} aria-live="polite">
          <span className="memory-result-medal" aria-hidden="true">{isWon ? '★' : '✦'}</span>
          <p className="memory-eyebrow">{isWon ? 'Missão cumprida' : 'Sua aventura continua'}</p>
          <h2>{isWon ? 'Parabéns! Você conseguiu!' : 'O tempo acabou! Que tal tentar mais uma vez?'}</h2>
          <p className="memory-result-copy">{isWon ? 'Você aprendeu, se concentrou e encontrou todos os pares!' : 'Você aprendeu bastante. Cada tentativa é uma nova descoberta!'}</p>
          <div className="memory-result-stats">
            <div><span>Pontuação</span><strong>{score} pontos</strong></div>
            <div><span>Pares encontrados</span><strong>{matched.length} de {level.pairs}</strong></div>
            <div><span>{isWon ? 'Tempo utilizado' : 'Tempo de jogo'}</span><strong>{formatTime(elapsed)}</strong></div>
          </div>
          <div className="memory-result-actions">
            <button className="memory-primary-button" type="button" onClick={startGame}>{isWon ? 'Jogar novamente' : 'Tentar novamente'}</button>
            {isOver && <button className="memory-secondary-button" type="button" onClick={() => setShowAlphabet(true)}>Aprender o alfabeto</button>}
            <Link to="/jogos" className="memory-secondary-button">Voltar ao início</Link>
          </div>
          <p className="memory-source-note">Os sinais manuais precisam de imagens educativas validadas para que esta atividade ensine o alfabeto de Libras com precisão.</p>
        </section>
      )}
    </div>
  );
}
