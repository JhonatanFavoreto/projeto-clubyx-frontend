import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Sobre.css';

export default function Sobre() {
    return (
        <div
            style={{
                backgroundColor: '#F4EFE6',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Header />
            <main className="sobre-container">
                <div className="page-header">
                    <h1>Sobre o Projeto</h1>
                    <p>
                        Este projeto foi desenvolvido por uma equipe de estudantes com o objetivo de
                        aprofundar o estudo da obra Memórias Póstumas de Brás Cubas, escrita por
                        Machado de Assis, utilizando recursos digitais e metodologias interativas.
                    </p>
                </div>

                <div className="sobre-content">
                    <div className="equipe-card">
                        <h2>Equipe</h2>
                        <div className="equipe-list">
                            <p>
                                Jhonatan Henrique Favoreto - <span className="turma">2TDS2</span>
                            </p>
                            <p>
                                Lucas Tavares Bento - <span className="turma">2TDS2</span>
                            </p>
                            <p>
                                Vitor Nunes - <span className="turma">2TDS2</span>
                            </p>
                            <p>
                                Henrico Ferrari - <span className="turma">2TDS2</span>
                            </p>
                            <p>
                                Júlia Anjos - <span className="turma">2TDS2</span>
                            </p>
                            <p className="grupo-espaco">
                                Ana Júlia de Souza Ramos - <span className="turma">2TDS2</span>
                            </p>

                            <p>
                                Miguel Fontenelli - <span className="turma">Mecânica</span>
                            </p>
                            <p className="grupo-espaco">
                                Enzo Velluchi - <span className="turma">Mecânica</span>
                            </p>

                            <p>
                                Renan Santos - <span className="turma">Elétrica</span>
                            </p>
                            <p>
                                Guilherme Henrique - <span className="turma">Elétrica</span>
                            </p>
                        </div>
                    </div>

                    <div className="objetivo-section">
                        <h2>Objetivo do projeto</h2>
                        <p>
                            O Clube do Livro é uma plataforma digital colaborativa desenvolvida como
                            Projeto Integrador de 2026. O nosso objetivo primordial é criar uma
                            ferramenta que una tecnologia e educação, auxiliando estudantes na
                            preparação para os vestibulares (ENEM, FUVEST, Unicamp) através de
                            conteúdos interativos e estruturados.
                        </p>
                        <p>
                            O grande diferencial deste projeto é a sua interdisciplinaridade e
                            colaboração. O sistema atende aos requisitos de Desenvolvimento de
                            Sistemas (com consumo de APIs REST e modelagem em PostgreSQL), ao mesmo
                            tempo em que aprofunda as competências de Língua Portuguesa na análise
                            literária e de Inglês, garantindo o suporte bilíngue à plataforma.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
