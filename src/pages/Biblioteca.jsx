import React from 'react';
import { Link } from 'react-router-dom';
import { contents } from '../data/contents';
import '../styles/Biblioteca.css';

export default function Biblioteca() {
  return (
    <div className="biblioteca-page">
      <div className="biblioteca-header">
        <h2>📚 Nossa Biblioteca</h2>
        <p>Explore as atividades separadas por temas super legais!</p>
      </div>

      <div className="content-grid">
        {contents.map(content => (
          <div key={content.id} className="content-card">
            <div className="card-badge">{content.category}</div>
            <h4>{content.title}</h4>
            <p className="short-desc">{content.shortDescription}</p>
            <div className="age-group">👶 {content.ageGroup}</div>
            <Link to={`/biblioteca/${content.id}`} className="btn-ver">
              Ver atividade
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
