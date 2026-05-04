import '../styles/Home.css';

export default function Home() {
    return (
        <>
            {/* Header */}
            <header className="header">
                <div className="logo">CLUBYX</div>

                <nav className="nav">
                    <ul>
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#obra">A Obra</a>
                        </li>
                        <li>
                            <a href="#biblioteca">Biblioteca</a>
                        </li>
                        <li>
                            <a href="#vestibular">Vestibular</a>
                        </li>
                        <li>
                            <a href="#videoaulas">Videoaulas</a>
                        </li>
                        <li>
                            <a href="#curiosidades">Curiosidades</a>
                        </li>
                        <li>
                            <a href="#sobre">Sobre</a>
                        </li>
                    </ul>
                </nav>

                <button className="btn-idioma">PT | EN</button>
            </header>

            {/* Hero Section */}
            <section className="hero-section" id="home">
                <h1>Memórias Póstumas de Brás Cubas</h1>
                <p className="hero-subtitle">
                    "Ao verme que primeiro roeu as frías carnes do meu cadáver dedico como saudosa
                    lembrança estas memórias pósthumas."
                </p>
                <button className="btn-primario">Começar os Estudos</button>
            </section>

            {/* Seção: Onde a Tecnologia Encontra a Literatura */}
            <section className="secao-tecnologia" id="obra">
                <h2>Onde a Tecnologia Encontra a Literatura</h2>

                <p>
                    O Clube do Livro é uma plataforma digital colaborativa que nasce da união entre
                    tecnologia e literatura. Desenvolvido em parceria pelos alunos de
                    Desenvolvimento de Sistemas (SENAI) e as áreas de Língua Portuguesa e Inglês
                    (SESI), nosso objetivo principal é transformar e facilitar a preparação para os
                    vestibulares.
                </p>

                <p>
                    Através de um ambiente interativo e totalmente bilíngue, oferecemos análises
                    literárias, simulados e conteúdos multimídia focados nos maiores clássicos
                    nacionais. É uma ferramenta inovadora construída de alunos para alunos,
                    promovendo o aprendizado interdisciplinar e o trabalho em equipe.
                </p>
            </section>

            {/* Seção: A Voz do Defunto Autor */}
            <section className="secao-defunto-autor">
                <div className="defunto-texto">
                    <h2>A Voz do Defunto Autor</h2>
                    <p>
                        Livre das máscaras e convenções sociais de seu tempo, Brás Cubas utiliza sua
                        posição além-túmulo para uma confissão de inescapável impudência. Sem
                        pudores, ele exibe as próprias falhas e a vaidade de suas paixões e fracasso
                        retumbante de suas ambições burguesas. Mergulhe nas páginas da obra mais
                        revolucionária de Machado de Assis, que inaugurou o Realismo no Brasil. Em
                        nosso ambiente interativo, você irá desconstruir a ironia machadiana e
                        transformar a leitura deste grande clássico na sua maior e mais letal
                        vantagem competitiva para os exames.
                    </p>
                </div>
                <div className="defunto-imagem">
                    <div className="livro-placeholder">
                        <span>
                            MEMÓRIAS
                            <br />
                            PÓSTHUMAS DE
                            <br />
                            BRÁS CUBAS
                        </span>
                    </div>
                </div>
            </section>

            {/* Seção: Navegue pela Plataforma */}
            <section className="secao-navegacao" id="biblioteca">
                <h2>Navegue pela Plataforma</h2>
                <div className="cards-grid">
                    <div className="card">
                        <h3>A Obra</h3>
                        <p>Resumo, personagens e contexto histórico.</p>
                    </div>
                    <div className="card">
                        <h3>Biblioteca</h3>
                        <p>Conheça as obras estudadas pelas outras equipes.</p>
                    </div>
                    <div className="card">
                        <h3>Vestibular</h3>
                        <p>Dicas, interpretação e possíveis temas de redação.</p>
                    </div>
                    <div className="card">
                        <h3>Videoaulas</h3>
                        <p>Conteúdos exclusivos gravados pela equipe.</p>
                    </div>
                    <div className="card">
                        <h3>Curiosidades</h3>
                        <p>
                            Explore curiosidades sobre Machado de Assis e os bastidores históricos
                            deste clássico.
                        </p>
                    </div>
                    <div className="card">
                        <h3>Sobre</h3>
                        <p>Conheça a equipe do SENAI e SESI por trás do projeto, e a plataforma.</p>
                    </div>
                </div>
            </section>

            {/* Seção: Projeto Integrador 2026 */}
            <section className="secao-projeto">
                <h2>Projeto Integrador 2026</h2>
                <p>
                    Esta plataforma digital colaborativa foi desenvolvida pelas turmas de
                    Desenvolvimento de Sistemas (SENAI) em parceria com Língua Portuguesa e Inglês
                    (SESI). Nosso objetivo principal é unir tecnologia e literatura para criar uma
                    ferramenta bilíngue e auxiliar os estudantes na preparação para os vestibulares,
                    promovendo um aprendizado interdisciplinar e colaborativo.
                </p>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>Projeto Integrador 2026 | SENAI (Desenvolvimento de Sistemas) + SESI</p>
                <p>Desenvolvido de forma colaborativa.</p>
            </footer>
        </>
    );
}
