import logoBarbosa from '../../imagens/Logo.barbosa.png';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-icon-footer">🤟</div>
          <h2>Libras aproxima, inclui e transforma!</h2>
        </div>
        
        <div className="footer-links">
          <div className="footer-col">
            <div className="col-icon">💗</div>
            <p>Feito com amor pelos alunos Debora e Matheus!</p>
          </div>
          <div className="footer-col">
            <img className="col-icon col-icon-image" src={logoBarbosa} alt="Logo do Colégio Barbosa Ferraz" />
            <p>Conteúdos criados por estudantes do Colégio Barbosa Ferraz para apresentar o mundo da Libras para crianças.</p>
          </div>
          <div className="footer-col">
            <div className="col-icon">🌐</div>
            <p>Um projeto escolar que fala com o mundo e quebra as barreiras da comunicação entre surdos e ouvintes!</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
