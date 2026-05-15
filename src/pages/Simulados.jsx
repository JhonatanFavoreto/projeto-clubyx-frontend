import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Simulados.css';

export default function Simulados() {
    return (
        <div className="simulados-page">
            <header className="header">
                <div className="logo">CLUBYX</div>
                <Header/>
            </header>

            <div className="top-line"></div>

            <section className="hero">
                <h1>Simulados</h1>

                <p>
                    Realize simulados para melhorar o seu desempenho nos vestibulares utilizando o
                    livro Memórias Póstumas de Brás Cubas
                </p>

                <button className="start-bnt">Realizar simulado</button>
            </section>

            <main className="content">
                <h2>Questão 01</h2>

                <h3>Texto I</h3>

                <div className="question-text">
                    <p>
                        "Não tive filhos, não transmiti nenhuma criatura o legado da nossa miséria."
                    </p>

                    <p>
                        Com base no trecho final de Memórias Póstumas de Brás Cubas, responda às questões.
                    </p>
                </div>

                <h4>A frase final do romance revela principalmente</h4>

                <div className='options'>
                    <button>A) uma valorização da família tradicional.</button>

                    <button>B) uma visão otimista sobre a humanidade.</button>

                    <button>C) uma crítica pessimista a existência humana.</button>

                    <button>D) um elogio ao progresso científico.</button>

                    <button>E) uma defesa da continuidade da linhagem familiar.</button>
                </div>
            </main>

            <footer className='footer'>
               <Footer/>
            </footer>
        </div>
    );
}
