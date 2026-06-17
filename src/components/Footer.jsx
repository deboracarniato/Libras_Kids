import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-icon-footer">✌️</div>
          <h2>Libras aproxima, inclui e transforma!</h2>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <div className="col-icon">🤍</div>
            <p>Feito com amor por alunos que acreditam na inclusão.</p>
          </div>
          <div className="footer-col">
            <div className="col-icon">👨‍👩‍👧‍👦</div>
            <p>Conteúdos criados por estudantes para ajudar outras crianças.</p>
          </div>
          <div className="footer-col">
            <div className="col-icon">🌐</div>
            <p>Um projeto escolar que fala com o mundo!</p>
          </div>
          <div className="footer-col social-col">
            <h4>Siga o projeto!</h4>
            <div className="social-icons">
              <span>📷</span>
              <span>▶️</span>
              <span>🎵</span>
              <span>✉️</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
