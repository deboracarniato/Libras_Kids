import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">✌️</div>
          <div className="logo-text">
            <h1>LibrasKids</h1>
            <span>Biblioteca Interativa de Libras para Crianças</span>
          </div>
        </Link>
        <nav className="main-nav">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/biblioteca">Biblioteca</NavLink>
          <NavLink to="/jogos">Jogos</NavLink>
          <NavLink to="/materiais">Baixar Materiais</NavLink>
          <NavLink to="/professores">Para Professores</NavLink>
          <NavLink to="/sobre">Sobre o Projeto</NavLink>
        </nav>
        <div className="header-actions">
          <div className="search-bar">
            <span>🔍 Buscar</span>
          </div>
          <button className="btn-login">👤 Entrar</button>
        </div>
      </div>
    </header>
  );
}
