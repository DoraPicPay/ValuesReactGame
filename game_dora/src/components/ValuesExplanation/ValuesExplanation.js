import HeaderJEF from "../Header/Header.js";
import React, { useEffect, useState } from 'react';
import "./ValuesExplanation.css";
import Header from "../Header/Header.js";
import GameApresentation from "../GameScreen/GameApresentation.js";

function ValuesExplanation() {
    const [dados, setDados] = useState(null);
    const [contador, setContador] = useState(0);

    const [apresentacaoGame, setApresentacao] = useState(false)

    const valores = [
        "Franqueza",
        "Disciplina",
        "Simplicidade",
        "Atitude de dono",
        "Determinacao",
        "Humildade",
        "Disponibilidade"
    ];

    useEffect(() => {
        localStorage.setItem("contValores", 0);
        receberValores(valores[contador]);
    }, []);

    const receberValores = (valor) => {
        fetch("https://backjefgame.onrender.com/Descricao/" + valor, {
            headers: {
                'Accept': "application/json",
                'Content-type': "application/json"
            },
            method: "GET"
        })
        .then(res => {
            const resposta = res.status; 
            if (resposta === 200) {
                return res.json();  
            } else if (resposta === 404) {
                window.alert("Valor não encontrado, verifique ortografia");
                throw new Error("Valor não encontrado");
            } else {
                console.log("Erro inesperado: ", resposta);
                window.alert("Ocorreu um erro inesperado.");
                throw new Error("Erro inesperado");
            }
        })
        .then(data => {
            if (data) {
                const { _id, descricao, imagem } = data; 
                setDados({ _id, descricao, imagem });
            }
        })
        .catch(err => {
            console.error("Erro na requisição: ", err);
        })
    };

    const passar = () => {
        console.log(contador)
        if(contador == 6) {
            setApresentacao(true)
        }
        if(contador < valores.length - 1) {
            setContador(contador + 1);
            receberValores(valores[contador + 1]);   

        }
    };

    return (
        <div>
            {!apresentacaoGame && (
                <>
                    <HeaderJEF />
                    {dados ? (
                        <div className="tudo">
                            <h1>{dados._id}</h1>
                            <div className="menor">
                                <p>{dados.descricao}</p>
                                {dados.imagem && <img src={dados.imagem} alt="Descrição" />}
                            </div>
                            <button onClick={passar}>Próximo</button>
                        </div>
                    ) : (
                        <div className="tudo">
                            <h2>Carregando...</h2>
                        </div>
                    )}
                </>
            )}
            {apresentacaoGame && <GameApresentation />}
        </div>
    );
}
export default ValuesExplanation;