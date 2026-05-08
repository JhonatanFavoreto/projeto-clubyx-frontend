import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Videoaulas.css';

export default function Videoaulas() {
    return (
        <div
            style={{
                backgroundColor: '#F4EFE6',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Header />
            <main className="videoaulas-container">
                <div className="page-header">
                    <h1>Videoaulas sobre o livro</h1>
                    <p>
                        Nesta videoaula sobre a obra Memórias Póstumas de Brás Cubas, de Machado de
                        Assis, são apresentadas as principais estratégias para compreender o livro
                        com foco no vestibular. O conteúdo destaca o papel inovador do narrador
                        defunto, a linguagem irônica e as críticas à sociedade do século XIX.
                    </p>
                </div>

                <section>
                    <h2 className="titulo-secao">
                        Aulas sobre o livro Memórias Póstumas de Brás Cubas
                    </h2>

                    <div className="aula-card">
                        <div className="video-placeholder">
                            <div className="video-progress-bar">
                                <div className="video-knob"></div>
                            </div>
                        </div>

                        <div className="aula-info">
                            <h3>Aula 1</h3>
                            <h4>Memórias Póstumas de Brás Cubas</h4>
                            <p className="aula-subtitulo">
                                Introdução sobre o livro , breve resumo
                            </p>

                            <p>
                                A obra Memórias Póstumas de Brás Cubas, escrita por Machado de
                                Assis, é um dos maiores clássicos da literatura brasileira e marca o
                                início do Realismo no país. Publicada em 1881, ela rompe com os
                                padrões tradicionais ao apresentar um narrador inusitado: um homem
                                que conta sua história após a própria morte.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
