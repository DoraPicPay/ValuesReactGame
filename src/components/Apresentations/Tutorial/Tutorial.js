import "./Tutorial.css"
import { useState } from "react"
import imagem1 from "../../../Assets/Tutorial/1.png"
import imagem2 from "../../../Assets/Tutorial/2.png"
import certa from "../../../Assets/Tutorial/certo.png"
import Header from "../../Header/Header.js"
import GameScreen from "../../GameScreen/GameScreen.js"

function Tutorial() {

    const [jogo, setJogo] = useState(false)

    const novoConteudo = () => {
        setJogo(true)
    }

    return (
        <div>
            {!jogo && (
                <div>
                    <Header /><div className="tutorial">
                        <h1>Tutorial</h1>
                        <div className="tutorialFase">
                            <h2>Selecione o card que mais se adequa ao valor apresentado</h2>
                            <img src={imagem1}></img>
                        </div>
                        <div className="tutorialFase">
                            <h2>Verifique se a borda da opção que você selecionou está com a cor diferente</h2>
                            <img src={imagem2}></img>
                        </div>
                        <div class="tutorialFase">
                            <h2>Se a opção estiver correta ou errada, aparecerá uma mensagem e você será direcionado para a próxima fase!</h2>
                            <img src={certa}></img>
                        </div>
                        <button onClick={novoConteudo}>Começar jogo</button>
                    </div>
                </div>
            )}
            {jogo && (
                <GameScreen />
            )}
        </div>
    )
}

export default Tutorial