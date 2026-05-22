import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Resultado.css';
import { useNavigate } from 'react-router-dom';

export default function Resultado() {
    const navigate = useNavigate();

    const voltarInicio = () => {
        navigate('/simulados');
    };

    return (
        <div className="resultado-page">
            <header className="header">
                <Header />
            </header>

            <div className="top-line"></div>

            <main className="resultado-container">
                <div className="resultado-card">
                    <h1>Simulado Finalizado 🎉</h1>

                    <p className="resultado-texto">
                        Você concluiu o simulado sobre
                        <strong> Memórias Póstumas de Brás Cubas</strong>.
                    </p>

                    <div className="resultado-info">
                        <div className="info-box">
                            <h2>5</h2>
                            <p>Questões</p>
                        </div>

                        <div className="info-box">
                            <h2>80%</h2>
                            <p>Aproveitamento</p>
                        </div>
                    </div>

                    <button className="resultado-button" onClick={voltarInicio}>
                        Refazer Simulado
                    </button>
                </div>
            </main>

            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
}
