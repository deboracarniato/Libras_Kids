import React from 'react';
import { Link } from 'react-router-dom';
import imagemInicial from '../assets/imagem-inicial.png';
import '../styles/Home.css';

export default function Home() {
  const categorias = [
    { id: 1, nome: 'Alfabeto em Libras', icon: 'A B C', color: 'var(--cat-blue)', img: 'https://placehold.co/150x120/A29BFE/FFF?text=Alfabeto' },
    { id: 2, nome: 'Números em Libras', icon: '1 2 3', color: 'var(--cat-yellow)', img: 'https://placehold.co/150x120/FFE66D/FFF?text=Números' },
    { id: 3, nome: 'Cores', icon: '🌈', color: 'var(--cat-pink)', img: 'https://placehold.co/150x120/FD79A8/FFF?text=Cores' },
    { id: 4, nome: 'Animais', icon: '🦁', color: 'var(--cat-green)', img: 'https://placehold.co/150x120/00b894/FFF?text=Animais' },
    { id: 5, nome: 'Família', icon: '👨‍👩‍👧‍👦', color: 'var(--cat-orange)', img: 'https://placehold.co/150x120/e17055/FFF?text=Família' },
    { id: 6, nome: 'Escola', icon: '🎒', color: 'var(--cat-purple)', img: 'https://placehold.co/150x120/6c5ce7/FFF?text=Escola' },
    { id: 7, nome: 'Sentimentos', icon: '❤️', color: 'var(--cat-red)', img: 'https://placehold.co/150x120/ff7675/FFF?text=Sentimentos' },
  ];

  const jogos = [
    { id: 'jogo-da-memoria', title: 'Jogo da Memória', subtitle: 'Alfabeto em Libras', color: '#EBE4FF', icon: '🎴' },
    { id: 'quiz-de-sinais', title: 'Quiz Libras', subtitle: 'Teste seus conhecimentos!', color: '#D3F9D8', icon: '❓' },
    { id: 'ligue-corretamente', title: 'Ligue Corretamente', subtitle: 'Associe a imagem ao sinal', color: '#FFF3C4', icon: '🔗' },
    { id: 'arraste-e-solte', title: 'Arraste e Solte', subtitle: 'Monte a palavra em Libras', color: '#D6E4FF', icon: '👆' },
  ];

  return (
    <>
      <section className="hero-section">
        <div className="hero-left">
          <h2>Aprender Libras é divertido!</h2>
          <p>Jogos, atividades e materiais para aprender Libras brincando.</p>
          <div className="hero-buttons">
            <Link to="/jogos" className="btn btn-primary-big">🎮 Jogar agora</Link>
            <Link to="/biblioteca" className="btn btn-outline">Explorar biblioteca</Link>
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

      <section className="categories-section">
        <div className="section-header">
          <h3>Explore por temas</h3>
        </div>
        <div className="categories-grid-horizontal">
          {categorias.map(cat => (
            <div key={cat.id} className="cat-card" style={{ backgroundColor: cat.color }}>
              <div className="cat-content">
                <h4>{cat.nome}</h4>
                <div className="cat-icon">{cat.icon}</div>
              </div>
              <img src={cat.img} alt={cat.nome} className="cat-img" />
              <Link to="/biblioteca" className="cat-link">Ver conteúdos →</Link>
            </div>
          ))}
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
        </div>

        <div className="dashboard-right">
          <div className="section-header">
            <h3>Materiais para imprimir</h3>
            <Link to="/materiais" className="link-all">Ver todos →</Link>
          </div>
          <div className="materials-big-card">
            <img src="https://placehold.co/300x200/f0f0f0/888?text=Apostilas+e+Cartas" alt="Preview de apostilas" className="materials-img" />
            <p>Baixe atividades, cartas, jogos e apostilas para usar onde quiser!</p>
            <Link to="/materiais" className="btn btn-materials">📥 Acessar materiais para imprimir</Link>
          </div>
        </div>
      </section>

      <section className="how-to-learn-section">
        <div className="section-header text-center">
          <h3>Como você quer aprender hoje?</h3>
        </div>
        <div className="learn-cards-grid">
          <Link to="/jogos" className="learn-card">
            <div className="learn-icon">🎮</div>
            <h4>Jogos Interativos</h4>
            <p>Aprenda brincando</p>
          </Link>
          <Link to="/biblioteca" className="learn-card">
            <div className="learn-icon">📚</div>
            <h4>Biblioteca</h4>
            <p>Explore sinais por tema</p>
          </Link>
          <Link to="/materiais" className="learn-card">
            <div className="learn-icon">🖨️</div>
            <h4>Materiais</h4>
            <p>Baixe para imprimir</p>
          </Link>
          <Link to="/biblioteca" className="learn-card">
            <div className="learn-icon">🎥</div>
            <h4>Vídeos</h4>
            <p>Assista em Libras</p>
          </Link>
        </div>
      </section>
    </>
  );
}
