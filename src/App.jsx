import React from 'react';
import { HastRouter, Routes, Route, HashRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Biblioteca from './pages/Biblioteca';
import ContentDetails from './pages/ContentDetails';
import Jogos from './pages/Jogos';
import JogoPlaceholder from './pages/JogoPlaceholder';
import Materiais from './pages/Materiais';
import Professores from './pages/Professores';
import Sobre from './pages/Sobre';

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/biblioteca/:id" element={<ContentDetails />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/jogos/:id" element={<JogoPlaceholder />} />
            <Route path="/materiais" element={<Materiais />} />
            <Route path="/professores" element={<Professores />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
