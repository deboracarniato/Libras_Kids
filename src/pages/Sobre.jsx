import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PagePlaceholder.css';

export default function Sobre() {
  return (
    <div className="placeholder-page">
      <h2>Sobre o Projeto</h2>
      <p>Libras Kids é uma biblioteca digital para ensinar Libras às crianças de forma mais lúdica e divertida! Aqui, as crianças terão acesso à jogos educativos, vídeos e a apostila digital do Asquelzinho e Débinha.</p>
      <p>Este site foi desenvolvido pelos estudantes Debora Carniato Cyriaco e Matheus Asquel Ferreira do Colégio Estudal Barbosa Ferraz. Os estudantes iniciaram a primeira parte do projeto com o apoio da professora orientadora Daniele Rosa de Arruda da Silva na sala de recursos AH/SD (Altas Habilidades/Superdotação), com o objetivo de tornar o ensino da Libras mais acessível para as crianças ouvintes conseguirem se comunicar com as crianças surdas.</p>
      <p>Primeiramente, foi realizado uma pesquisa bibliográfica sobre a Libras, inclusão e acessibilidade para as crianças nas escolas, de forma que as crianças ouvintes possam aprender Libras para se comunicarem melhor com os amiguinhos surdos.</p>
      <p>Após o início da elaboração da apostila, pensou-se em criar um site para que o material fosse disponibilizado para mais pessoas, sendo assim convidamos o Professor Matheus Barbosa Reck, que tem formação em programação, que nos auxiliou na criação desse site.</p>
      <p>Ambos os alunos realizam o curso técnico de Desenvolvimento de Sistemas no colégio, o que também contribuiu para a ideia da elaboração do projeto. Além disso, o estudante Matheus está estudando Libras desde o ano passado e a estudante Debora ama desenhar. Sendo assim, juntaram os conhecimentos e criaram todo o material do zero, de uma forma autoral e pensada no público infantil.</p>
      <Link to="/" className="back-btn">Voltar para Início</Link>
    </div>
  );
}
