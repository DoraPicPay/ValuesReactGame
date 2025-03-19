import './LastPage.css';
import App from '../InitialPage/App';
import { useState } from 'react';

function LastPage() { // Recebendo a pontuação como prop
    const [voltar, setVoltar] = useState(false);

    console.log(localStorage.getItem("pontuacao"))
    const score = localStorage.getItem("pontuacao")

    const voltarTela = () => {
        setVoltar(true);
    };

    function shareWhatsApp() {
        const url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent('Minha pontuação no jogo dos valores J&F foi de: ' + (score * 14.29).toFixed(2) + "%! E você, será que consegue acertar todos?");
        window.open(url, '_blank');
    }

    function shareFaceBook() {
        const urlParaCompartilhar = encodeURIComponent('Minha pontuação no jogo dos valores J&F foi de: ' + (score * 14.29).toFixed(2) + '%! E você, será que consegue acertar todos?');
        const mensagem = encodeURIComponent('Confira isso!'); 
        const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + urlParaCompartilhar + '&quote=' + mensagem;

        window.open(facebookUrl, '_blank');
    }

    return (
        <>
            {!voltar ? (
                <div className="backgorundPontuation">
                    <div className='pagePontuation'>
                        <div className="share">
                            <h1>Sua pontuação foi de: {(score * 14.29).toFixed(2)}%</h1>
                            <p>Compartilhe seu resultado!</p>
                            <div className='shareIcons'>
                                <img onClick={shareFaceBook} className='FaceBook' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png'} alt="Facebook" />
                                <img onClick={shareWhatsApp} className='FaceBook' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png'} alt="WhatsApp" />
                            </div>
                        </div>
                        <a className="next" onClick={voltarTela}>Voltar para a tela inicial</a>
                        <h5>Valores J&F</h5>
                    </div>
                </div>
            ) : (
                <App />
            )}
        </>
    );
}

export default LastPage;