import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PagePlaceholder.css';

export default function Sobre() {
  return (
    <div className="placeholder-page">
      <h2>🌟 Sobre o Projeto</h2>
      <p>Libras Kids é uma biblioteca digital mágica para ensinar Libras às crianças!</p>
      <Link to="/" className="back-btn">Voltar para Início</Link>
    </div>
  );
}
