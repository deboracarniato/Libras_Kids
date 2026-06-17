import React from 'react';
import '../styles/SignCard.css';

export default function SignCard({ sign }) {
  return (
    <div className="sign-card">
      <div className="card-image-container">
        <img src={sign.imageUrl} alt={`Sinal da letra ${sign.letter}`} className="card-image" />
        <div className="card-letter-badge">{sign.letter}</div>
      </div>
      <div className="card-content">
        <h3>{sign.word}</h3>
        <p>{sign.description}</p>
      </div>
    </div>
  );
}
