import { useState } from "react";
import HeaderJEF from "../Header/Header.js";
import Tutorial from "../Apresentations/Tutorial/Tutorial.js";
import "./GameScreen.css";

function GameApresentation() {

    const [tutorial, setTutorial] = useState(false)

    const novoConteudo = () => {
        setTutorial(true);
      };


      localStorage.setItem("pontuacao", Number(0))

    return (
        <div>
            {!tutorial && (
                <div>
                <HeaderJEF />
                <div className="apresentacaoGame">
                    <h1>Agora que você conhece mais os valores, clique em <em>Começar</em> e se divirta!</h1>
                    <button onClick={novoConteudo}>Começar</button>
                </div>
                </div>
            )}
            {tutorial && (
                <Tutorial />
            )}
        </div>
    );
}

export default GameApresentation;