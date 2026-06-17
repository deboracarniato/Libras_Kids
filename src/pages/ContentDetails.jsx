import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { contents } from '../data/contents';
import '../styles/ContentDetails.css';

export default function ContentDetails() {
  const { id } = useParams();
  const content = contents.find(c => c.id === id);

  if (!content) {
    return (
      <div className="details-error">
        <h2>Conteúdo não encontrado! 😢</h2>
        <Link to="/biblioteca" className="btn-back">Voltar para a Biblioteca</Link>
      </div>
    );
  }

  return (
    <div className="details-page">
      <Link to="/biblioteca" className="btn-back">⬅ Voltar</Link>
      
      <div className="details-header">
        <div className="details-badge">{content.category}</div>
        <h2>{content.title}</h2>
        <p className="age-group-large">Faixa etária: {content.ageGroup}</p>
      </div>

      <div className="details-body">
        <section className="details-section">
          <h3>Sobre a atividade</h3>
          <p>{content.fullDescription}</p>
        </section>

        <section className="details-section objective-section">
          <h3>🎯 Objetivo Pedagógico</h3>
          <p>{content.pedagogicalObjective}</p>
        </section>

        <section className="details-section">
          <h3>Como usar</h3>
          <p className="instructions-text">{content.instructions}</p>
        </section>
      </div>

      <div className="details-actions">
        {content.playOnlineUrl && (
          <button className="btn-action btn-play" onClick={() => alert('Abrindo jogo: ' + content.title)}>
            🎮 Jogar Online
          </button>
        )}
        {content.downloadUrl && (
          <button className="btn-action btn-download" onClick={() => alert('Iniciando download do material...')}>
            📥 Baixar Material
          </button>
        )}
      </div>
    </div>
  );
}
