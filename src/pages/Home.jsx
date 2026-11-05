import { Link } from 'react-router-dom';
import imagemInicial from '../../imagens/foto_tela_inicial_jpeg.jpeg';
import logoLibrasKids from '../../imagens/logo.libraskids.jpeg';
import imagemAsquelzinho from '../../imagens/asquelzinho1.jpg';
import imagemDebinha from '../../imagens/debinha1.jpg';
import '../styles/Home.css';

export default function Home() {
  const jogos = [
    { id: 'jogo-da-memoria', title: 'Jogo da Memória', subtitle: 'Alfabeto em Libras', color: '#EBE4FF', icon: '🎴' },
    { id: 'quiz-de-sinais', title: 'Quiz Libras', subtitle: 'Teste seus conhecimentos!', color: '#D3F9D8', icon: '❓' },
    { id: 'ligue-corretamente', title: 'Ligue Corretamente', subtitle: 'Associe sinais e quantidades', color: '#FFF3C4', icon: '🔗' },
    { id: 'arraste-e-solte', title: 'Estoure os balões!', subtitle: 'Estoure os balões com números em Libras', color: '#D6E4FF', icon: '🎈' },
  ];

  return (
    <>
      <section className="hero-section">
        <div className="hero-left">
          <h2>Aprender Libras é divertido!</h2>
          <p>Jogos, atividades e materiais para aprender Libras brincando.</p>
          <div className="hero-buttons">
            <Link to="/jogos" className="btn btn-primary-big">🎮 Jogar agora</Link>
          </div>
        </div>
        
        <div className="hero-center">
          <div className="speech-bubble">Libras é para todos!</div>
          <img src={imagemInicial} alt="Professora ensinando Libras" className="hero-child-img" />
        </div>

        <div className="hero-right">
          <div className="hero-info-card">
            <h3>O que você encontra aqui?</h3>
            <ul>
              <li><span className="icon">🎮</span> Conteúdos em Libras para crianças</li>
              <li><span className="icon">🕹️</span> Jogos educativos online</li>
              <li><span className="icon">🖨️</span> Materiais para imprimir</li>
              <li><span className="icon">👨‍🏫</span> Dicas para professores</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-left">
          <div className="section-header">
            <h3>Jogos digitais</h3>
          </div>
          <div className="jogos-mini-grid">
            {jogos.map(jogo => (
              <Link to={`/jogos/${jogo.id}`} key={jogo.id} className="jogo-mini-card" style={{ backgroundColor: jogo.color }}>
                <div className="jogo-mini-header">
                  <h4>{jogo.title}</h4>
                  <p>{jogo.subtitle}</p>
                </div>
                <div className="jogo-mini-body">
                  <div className="jogo-icon-large">{jogo.icon}</div>
                  <div className="play-button">▶</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginBottom: '2rem', display: 'flex' }}>
            <Link to="/jogos" className="btn btn-outline" style={{ margin: '0 auto' }}>Ver todos os jogos</Link>
          </div>

          <div className="teacher-banner">
            <div className="teacher-icon">🎒</div>
            <div className="teacher-info">
              <h3>Espaço do professor</h3>
              <p>Encontre orientações, sugestões de uso e planos de aula para trabalhar Libras com crianças.</p>
              <Link to="/professores" className="btn btn-teacher">👥 Acessar espaço do professor</Link>
            </div>
            <div className="teacher-features">
              <ul>
                <li>🎯 Objetivos de aprendizagem</li>
                <li>👶 Faixa etária indicada</li>
                <li>💡 Dicas práticas para aplicar</li>
              </ul>
            </div>
          </div>
          <div className="teacher-characters" role="group" aria-label="Personagens Asquelzinho e Débinha">
            <img className="teacher-character-image" src={imagemAsquelzinho} alt="Asquelzinho" />
            <img className="teacher-character-image" src={imagemDebinha} alt="Débinha" />
          </div>
        </div>

        <div className="dashboard-right">
          <div className="section-header">
            <h3>Materiais para imprimir</h3>
            <Link to="/materiais" className="link-all">Ver todos →</Link>
          </div>
          <div className="materials-big-card">
            <img src={logoLibrasKids} alt="Logo do LibrasKids" className="materials-img" />
            <p>Baixe atividades, cartas, jogos e apostilas para usar onde quiser!</p>
            <Link to="/materiais" className="btn btn-materials">📥 Acessar materiais para imprimir</Link>
          </div>
        </div>
      </section>

    </>
  );
}
