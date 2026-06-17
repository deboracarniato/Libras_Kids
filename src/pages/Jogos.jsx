import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Jogos.css';

export default function Jogos() {
  const jogos = [
    {
      id: 'jogo-da-memoria',
      title: 'Jogo da Memória: Alfabeto',
      description: 'Encontre os pares entre a letra do alfabeto e o sinal correspondente em Libras!',
      imageUrl: 'https://placehold.co/300x200/FF6B6B/FFF?text=Mem%C3%B3ria',
    },
    {
      id: 'quiz-de-sinais',
      title: 'Quiz de Sinais',
      description: 'Teste seus conhecimentos respondendo qual é a palavra correta para o sinal mostrado na tela.',
      imageUrl: 'https://placehold.co/300x200/4ECDC4/FFF?text=Quiz',
    },
    {
      id: 'ligue-corretamente',
      title: 'Ligue Corretamente',
      description: 'Ligue as expressões faciais aos sentimentos corretos. Seja rápido!',
      imageUrl: 'https://placehold.co/300x200/FFE66D/2F3542?text=Ligue',
    },
    {
      id: 'arraste-e-solte',
      title: 'Arraste e Solte: Animais',
      description: 'Arraste o animal para a sua casinha sinalizada em Libras.',
      imageUrl: 'https://placehold.co/300x200/A29BFE/FFF?text=Arraste',
    }
  ];

  return (
    <div className="jogos-page">
      <div className="jogos-header">
        <h2>🎮 Sala de Jogos</h2>
        <p>Aprender brincando é sempre a melhor escolha!</p>
      </div>

      <div className="jogos-grid">
        {jogos.map(jogo => (
          <div key={jogo.id} className="jogo-card">
            <img src={jogo.imageUrl} alt={jogo.title} className="jogo-image" />
            <div className="jogo-content">
              <h3>{jogo.title}</h3>
              <p>{jogo.description}</p>
              <Link to={`/jogos/${jogo.id}`} className="btn-jogar">▶ Jogar</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
