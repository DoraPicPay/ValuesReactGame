import { useRef, useState } from 'react';
import "../../../index.css";
import "../UserInformations.css";
import Register from '../Register/Register';
import ValuesApresentation from '../../Apresentations/ValuesApresentation/ValuesApresentation';

function Login() {
  
  const inputRefEmail = useRef();
  localStorage.setItem("idUser",  inputRefEmail.value)
  const inputRefPassword = useRef();
  const [login, setLogin] = useState(false)
  const [voltar, setVoltar] = useState(false)

  const novoConteudo = () => {
    setLogin(true);
  };

  const voltarCadastro = () => {
    setVoltar(true);
  };

  const entrar = (event) => {
    event.preventDefault();
    fetch("https://backjefgame.onrender.com/Login", {
      headers: {
        'Accept': "application/json",
        'Content-type': "application/json"
      },
      method: "POST",
      body: JSON.stringify({ 
        email: inputRefEmail.current.value,
        password: inputRefPassword.current.value
      })
    })
    .then(res => {
      const resposta = res.status;
      if (resposta === 200) {
        window.alert("Bem-vindo(a)")
        novoConteudo()
        return res.json();
      } else if (resposta === 400) {
        window.alert("Senha incorreta, por favor tente novamente...");
      } else if (resposta === 409) {
        window.alert("E-mail não encontrado, por favor reveja ou faça o cadastro...");
      } else if (resposta === 500) {
        window.alert("Problemas com o nosso servidor, por favor tente mais tarde...");
      } else {
        window.alert("Ocorreu um erro inesperado.");
      }
    })
    .catch(err => {
      window.alert("Erro na requisição. Tente novamente mais tarde.");
    });
  };

  return (
    <>
    {!voltar && (
      <>
      {!login && (
        <div className='allLogin'>
        <section>
          <form onSubmit={entrar} id='logsin'>
            <h1>Login</h1>
            <input type="email" name='email' placeholder='E-mail' ref={inputRefEmail} required />
            <input type="password" name='password' placeholder='Senha' ref={inputRefPassword} required />
            <button type='submit'>Entrar</button>
          </form>
        </section>
        <button onClick={voltarCadastro}>Já tem uma conta? Voltar para o cadastro</button>
      </div>    
      )}
  
      {login && (
        <ValuesApresentation />
      )}
      </>
    )}
    {voltar && (
      <Register />
    )}
  </>
  );
}

export default Login;