
import "./ValuesApresentation.css"
import ValuesExplanation from "../../ValuesExplanation/ValuesExplanation.js"
import { useState } from "react"

function ValuesApresentation(){

    const [va, setVa] = useState(false)

    const novoConteudo = () => {
        setVa(true);
      };

    return (
       <div>
       {!va && (
        <div className="centro">
            <h1>
                Você já sabe que o Instituto J&F tem alguns valores, certo? Vamos conferir cada um deles!
            </h1>
            <button onClick={novoConteudo}>Próximo</button>
        </div>
       )}

       {va && (
            <ValuesExplanation />
       )}
       </div>
    )
}

export default ValuesApresentation