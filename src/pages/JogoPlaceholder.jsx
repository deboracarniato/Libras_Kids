import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/PagePlaceholder.css';

export default function JogoPlaceholder() {
  const { id } = useParams();
  
  return (
    <div className="placeholder-page" style={{ borderColor: '#FF9F43' }}>
      <h2>🚧 Jogo em Construção!</h2>
      <p style={{ fontSize: '1.5rem', marginTop: '1rem', marginBottom: '2rem' }}>
        A tela do jogo <strong>{id.replace(/-/g, ' ')}</strong> será desenvolvida em breve pelos nossos alunos!
      </p>
      <Link to="/jogos" className="back-btn">⬅ Voltar para Jogos</Link>
    </div>
  );
}
