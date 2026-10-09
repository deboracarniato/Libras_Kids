import React from 'react';
import '../styles/Materiais.css';

export default function Materiais() {
  const materiais = [
    {
      id: 1,
      title: 'Asquelzinho e Debinha: Uma Viagem Pelo Mundo da Libras',
      description: 'Uma apostila completa com as lições iniciais de alfabeto, cores e números para professores apresentarem o mundo da Libras para as crianças!',
      category: 'Iniciante',
      type: 'Apostila',
      link: '#'
    },
    {
      id: 2,
      title: 'Cartas de Emoções',
      description: 'Cartas para imprimir, recortar e brincar de imitar as emoções enquanto faz os sinais.',
      category: 'Sentimentos',
      type: 'Cartas',
      link: '#'
    },
    {
      id: 3,
      title: 'Jogo de Tabuleiro: Corrida da Fazenda',
      description: 'Um jogo de tabuleiro que você pode imprimir. Avance as casas sempre que acertar o sinal do animal!',
      category: 'Animais',
      type: 'Jogo Físico',
      link: '#'
    },
    {
      id: 4,
      title: 'Atividade: Ligue as Cores',
      description: 'Folha de atividade rápida para ligar a cor ao seu sinal correspondente.',
      category: 'Cores',
      type: 'Atividade',
      link: '#'
    }
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'Apostila': return '#FF6B6B';
      case 'Cartas': return '#A29BFE';
      case 'Jogo Físico': return '#FF9F43';
      case 'Atividade': return '#4ECDC4';
      default: return '#555';
    }
  }

  return (
    <div className="materiais-page">
      <div className="materiais-header">
        <h2>🖍️ Materiais para Imprimir</h2>
        <p>Baixe conteúdos incríveis para continuar brincando e aprendendo no mundo real!</p>
      </div>

      <div className="materiais-grid">
        {materiais.map(mat => (
          <div key={mat.id} className="material-card" style={{ borderTop: `5px solid ${getTypeColor(mat.type)}` }}>
            <div className="material-type" style={{ backgroundColor: getTypeColor(mat.type) }}>
              {mat.type}
            </div>
            <h3>{mat.title}</h3>
            <p className="material-category"><strong>Categoria:</strong> {mat.category}</p>
            <p className="material-desc">{mat.description}</p>
            <a href={mat.link} className="btn-baixar" onClick={(e) => { e.preventDefault(); alert('Iniciando download fictício do material!'); }}>
              📥 Baixar PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
