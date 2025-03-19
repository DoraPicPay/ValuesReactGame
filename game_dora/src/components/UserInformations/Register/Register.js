import { useRef, useState } from 'react';
import '../UserInformations.css';
import Login from "../Login/Login.js";

function Register() {
  
  const inputRefName = useRef();
  const inputRefEmail = useRef();
  localStorage.setItem("idUser",  inputRefEmail.value)
  const inputRefPassword = useRef();

  const cadastrar = (event) => { 
    event.preventDefault();

    console.log("Iniciando cadastro...");
    
    fetch("https://backjefgame.onrender.com/Register", {
      headers: {
        'Accept': "application/json",
        'Content-type': "application/json"
      },
      method: "POST",
      body: JSON.stringify({ 
        nome: inputRefName.current.value,
        email: inputRefEmail.current.value,
        password: inputRefPassword.current.value
      })
    })
    .then(res => {
      console.log("Resposta recebida...");
      const resposta = res.status;
      if (resposta === 201) {
        localStorage.setItem('idUser ', inputRefEmail.current.value); // Armazena o email
        window.alert("Cadastro realizado com sucesso!");
      } else if (resposta === 409) {
        window.alert("Esse E-mail já foi cadastrado, por favor utilize outro ou faça o login...");
      } else if (resposta === 500) {
        window.alert("Problemas com o nosso servidor, por favor tente mais tarde...");
      } else {
        console.log("Erro inesperado: ", resposta);
        window.alert("Ocorreu um erro inesperado.");
      }
    })
    .catch(err => {
      console.error("Erro na requisição: ", err);
      window.alert("Erro na requisição. Tente novamente mais tarde.");
    });
  };

  const [conteudoRegistro, setConteudoRegistro] = useState(false);

  const irLogin = () => {
    setConteudoRegistro(true);
  };

  return (
    <section className='register'>
      {/* Conteúdo antigo */}
      {!conteudoRegistro && (
        <form onSubmit={cadastrar}>
          <h1>Cadastro</h1>
          <input type="text" name='name' placeholder='Nome' ref={inputRefName} required />
          <input type="email" name='email' placeholder='E-mail' ref={inputRefEmail} required />
          <input type="password" name='password' placeholder='Senha' ref={inputRefPassword} required />
          <button type='submit'>Cadastrar</button>
          <p onClick={irLogin}>Já possui Login? Clique aqui!</p>
        </form>
      )}

      {/* Conteúdo novo */}
      {conteudoRegistro && (
        <Login />
      )}
    </section>
  );
}

export default Register;