import React, { useState, useEffect } from 'react';
import HeaderGame from "../Header/HeaderGame.js";
import LastPage from "../Apresentations/LastPage/LastPage.js"
import "./GameScreen.css"

function GameScreen() {
    const [dados, setDados] = useState(null);
    const [contador, setContador] = useState(0);
    const [respostas, setRespostas] = useState([]);
    const [pontuacao, setPontuacao] = useState(
        parseInt(localStorage.getItem("pontuacao")) || 0
    );
    const [mensagem, setMensagem] = useState("");
    const [respostaSelecionada, setRespostaSelecionada] = useState(false);
    const [selectedResposta, setSelectedResposta] = useState(null);
    const [ final , setFinal ] = useState(false)

    // Inicializa a pontuação final no localStorage se não estiver definida
    useEffect(() => {
        if (localStorage.getItem("pontuacaoFinal") === null) {
            localStorage.setItem("pontuacaoFinal", 0);
        }
    }, []);

    const valores = [
        "Franqueza",
        "Disciplina",
        "Simplicidade",
        "Atitude de Dono",
        "Determinação",
        "Humildade",
        "Disponibilidade"
    ];

    useEffect(() => {
        fetch("https://backjefgame.onrender.com/Frases/" + valores[contador], {
            headers: {
                'Accept': "application/json",
                'Content-type': "application/json"
            },
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                const { _id, certa, erradaUm, erradaDois, erradaTres } = data;
                setDados({ _id, certa, erradaUm, erradaDois, erradaTres });
                setRespostas(misturar(certa, erradaUm, erradaDois, erradaTres));
            }
        })
        .catch(err => {
            console.error("Erro na requisição: ", err);
        });
    }, [contador]);

    console.log(localStorage.getItem("pontuacao"))

    function misturar(certa, erradaUm, erradaDois, erradaTres) {
        if(localStorage.getItem("conter") >= 6){
            localStorage.setItem("conter", 0)
        }
        var contER = Number(localStorage.getItem("conter") || 0);
        var respostas = [];

        if((contER == 0) || (contER == 5)) {
            respostas = [
                { resposta: erradaUm, tipo: "errada..." },
                { resposta: certa, tipo: "correta!" },
                { resposta: erradaDois, tipo: "errada..." },
                { resposta: erradaTres, tipo: "errada..." }
            ];
        } else if ((contER == 6) || (contER == 3)) {
            respostas = [
                { resposta: erradaDois, tipo: "correta!" },
                { resposta: erradaUm, tipo: "errada..." },
                { resposta: certa, tipo: "correta!" },
                { resposta: erradaTres, tipo: "errada..." }
            ];
        } else if ((contER == 4) || (contER == 1)) {
            respostas = [
                { resposta: erradaUm, tipo: "errada..." },
                { resposta: erradaDois, tipo: "errada..." },
                { resposta: erradaTres, tipo: "errada..." },
                { resposta: certa, tipo: "correta!" }
            ];
        } else { 
            respostas = [
                { resposta: erradaDois, tipo: "correta!" },
                { resposta: erradaUm, tipo: "errada..." },
                { resposta: certa, tipo: "correta!" },
                { resposta: erradaTres, tipo: "errada..." }
            ];
        }

        localStorage.setItem("conter", contER + 1);
        return respostas;
    }

    function mudarCor(e) {
        if(valores[0] == "Franqueza"){
            localStorage.setItem('pontuacaoFinal', 0)
        }
        const selected = e.target;
        const allSpans = document.querySelectorAll('.cardsContainer span');
        allSpans.forEach(span => {
            span.style.border = "none";
        });
    
        selected.style.border = "3px solid rgb(63, 44, 208)";
        setRespostaSelecionada(true);
        setSelectedResposta(selected);
    }

    const novoConteudo = () => {
        setFinal(true)
    }

    function updateScore(){
        console.log("hbvuhb")
        var idUsuario = localStorage.getItem('idUser')
        var scoreGame;
        var pont = localStorage.getItem('pontuacao')
        if(pont >= 7){
            scoreGame = 100
        }else{
            scoreGame = (pont * 14.29).toFixed(2)
        }
        
        console.log("hbvuhb")
    
        fetch("https://backjefgame.onrender.com/SetScore",
            {
                headers:{
                    'Accept': "application/json",
                    'Content-type': "application/json"
                },
                method: "POST",
                body: JSON.stringify({ 
                    email: idUsuario,
                    score: scoreGame
                })   
            }
        )
        .then(function (res) {
            const resposta = res.status;
            console.log(resposta)
            if(resposta == 202){
                window.alert("Sua pontuação foi atualizada. Parabéns! ")
            } else if (resposta == 200){
                window.alert("A última pontuação foi maior")
            } else if( resposta == 500){
                window.alert("Problemas com o nosso servidor, por favor tente mais tarde...")
            } else{
                window.alert("Olhar erro, pq n era pra dar")
            }
        })
        .catch(function (res) { console.log( res.status )})
    }

    function nextPage() {
        if (!respostaSelecionada) {
            setMensagem("Por favor, selecione uma resposta.");
            return;
        }

        if (selectedResposta && selectedResposta.getAttribute('tipo') == "correta!") {
            const pontNova = pontuacao + 1;
            setPontuacao(pontNova)
            console.log(pontuacao)

            setMensagem("Você selecionou a resposta correta!");
        } else {
            setMensagem("Você selecionou a resposta errada.");
        }

        setRespostaSelecionada(false);
        setSelectedResposta(null);

        if (contador < valores.length - 1) {
            setContador(contador + 1);
            setTimeout(() => {
                setMensagem("");
            }, 2000);
        } else {
            updateScore()
            localStorage.setItem("pontuacao", pontuacao)
            novoConteudo()
        }

        const allSpans = document.querySelectorAll('.cardsContainer span');
        allSpans.forEach(span => {
            span.style.border = "none";
        });
    }

    return (
        <div>
           {!final && (
            <div>
             <HeaderGame />
             <div className="value">
                 {dados ? (
                     <div className=''>
                         <h1>{valores[contador]}</h1>
                         <div className="cardsContainer">
                             <span onClick={mudarCor} tipo={respostas[0].tipo} >{respostas[0].resposta}</span>
                             <span onClick={mudarCor} tipo={respostas[1].tipo}>{respostas[1].resposta}</span>
                             <span onClick={mudarCor} tipo={respostas[2].tipo}>{respostas[2].resposta}</span>
                             <span onClick={mudarCor} tipo={respostas[3].tipo}>{respostas[3].resposta}</span>
                         </div>
                         <button className="botao" onClick={nextPage}>Próximo</button>
                         <p className='mensagem'></p>
                     </div>
                 ) : (
                     <div>Carregando...</div>
                 )}
 
                 {mensagem && <div className="mensagem">{mensagem}</div>}
             </div>
             </div>
           )}
           {final && (
            <LastPage />
           )}
        </div>
    );
}

export default GameScreen;