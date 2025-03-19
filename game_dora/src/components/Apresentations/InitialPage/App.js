import React, { useState } from 'react';
import Register from "../../UserInformations/Register/Register.js"
import './App.css';

function App() {
  const [apresentacao, setApresentacao] = useState(false);

  const novoConteudo = () => {
    setApresentacao(true);
  };


  return (
    <div>
      {/* Conteúdo antigo */}
      {!apresentacao && (
        <div className="container">
          <div className='text'>
            <h1>Valores J&F</h1>
            <h3>Interaja e divirta-se com o game de valores do J&F!</h3>
            <a className='next' onClick={novoConteudo}>Começar</a>
          </div>
        </div>
      )}


    {/* Conteúdo novo */}
      {apresentacao && (
        <Register />
      )}
    </div>
  );
}

export default App;
