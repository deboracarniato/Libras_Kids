import React from 'react';
import '../styles/Professores.css';

export default function Professores() {
  return (
    <div className="professores-page">
      <div className="professores-header">
        <h2>👩‍🏫 Área dos Educadores</h2>
        <p>Orientações pedagógicas para transformar sua sala de aula num ambiente de inclusão e diversão!</p>
      </div>

      <div className="professores-content">
        <section className="prof-section">
          <h3>📘 Como usar o Libras Kids em sala</h3>
          <p>O Libras Kids foi desenhado para ser uma ferramenta de apoio visual. Pode ser utilizado em lousas digitais para aulas conjuntas ou em tablets individuais. Recomendamos apresentar uma categoria por semana, estimulando a prática através das atividades diárias.</p>
        </section>

        <section className="prof-section">
          <h3>Sugestões de atividades</h3>
          <ul>
            <li><strong>Roda de Sinais:</strong> Crianças se reúnem em círculo e cada uma ensina o sinal de um animal para a turma.</li>
            <li><strong>Caça ao Tesouro:</strong> Esconda as "Cartas de Emoções" pela sala. Ao achar uma carta, a criança faz a expressão facial e o sinal.</li>
            <li><strong>Soletrando o Nome:</strong> Usar o "Alfabeto Mágico" para que as crianças pratiquem soletração do próprio nome todos os dias de manhã.</li>
          </ul>
        </section>

        <div className="prof-cards">
          <div className="info-card">
            <h4>⏱️ Tempo estimado</h4>
            <p>15 a 20 minutos por atividade (ideal para manter o foco e engajamento).</p>
          </div>
          
          <div className="info-card">
            <h4>👶 Faixa etária</h4>
            <p>Atividades desenhadas especialmente para crianças da Educação Infantil e Séries Iniciais (3 a 9 anos).</p>
          </div>
        </div>

        <section className="prof-section highlight-section">
          <h3>🎯 Objetivos de aprendizagem</h3>
          <p>Nossa plataforma apoia o desenvolvimento motor, a memória visual e espacial, empatia, comunicação não-verbal e introdução à cultura surda, cumprindo competências transversais da BNCC.</p>
        </section>

        <section className="prof-section">
          <h3>💡 Dicas para adaptar os jogos físicos e digitais</h3>
          <p>Para crianças com necessidades especiais de coordenação, amplie os materiais impressos em formato A3. No uso digital, faça os jogos em duplas, promovendo cooperação, onde uma criança opera o dispositivo e a outra sinaliza junto.</p>
        </section>
      </div>
    </div>
  );
}
