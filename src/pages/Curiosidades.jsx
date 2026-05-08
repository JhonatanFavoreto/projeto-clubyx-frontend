import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Curiosidades.css';

export default function Curiosidades() {
    return (
        <div
            style={{
                backgroundColor: '#F4EFE6',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Header />
            <main className="curiosidades-container">
                <div className="page-header">
                    <h1>Curiosidades e Bastidores</h1>
                    <p>
                        Descubra os detalhes fascinantes sobre Machado de Assis, os segredos
                        escondidos nas páginas do livro e o cenário social e político que moldou
                        esta obra-prima do Realismo.
                    </p>
                </div>

                <div className="autor-container">
                    <div className="autor-imagem">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Machado_de_Assis_com_59_anos_2.jpg/800px-Machado_de_Assis_com_59_anos_2.jpg"
                            alt="Machado de Assis"
                        />
                    </div>
                    <div className="autor-info">
                        <h2>Joaquim Maria Machado de Assis</h2>
                        <p>
                            Considerado o maior escritor da literatura brasileira, Machado tem uma
                            história de vida impressionante que contrasta com a elite que ele
                            criticava.
                        </p>
                        <ul>
                            <li>
                                <strong>Origem Humilde:</strong> Nasceu no Morro do Livramento (RJ),
                                era neto de escravos libertos, mulato, de família pobre e não
                                frequentou a universidade.
                            </li>
                            <li>
                                <strong>Autodidata:</strong> Aprendeu francês, inglês, alemão e
                                grego sozinho ou com a ajuda de vizinhos. Chegou a trabalhar como
                                tipógrafo e revisor de imprensa.
                            </li>
                            <li>
                                <strong>Academia Brasileira de Letras:</strong> Foi o principal
                                fundador e o primeiro presidente da ABL (em 1897), instituição
                                criada aos moldes da Academia Francesa.
                            </li>
                            <li>
                                <strong>A Virada Realista:</strong> "Memórias Póstumas" (1881) marca
                                uma mudança drástica no seu estilo. Especula-se que um período de
                                doença o fez adotar uma visão mais pessimista e crítica da vida.
                            </li>
                        </ul>
                    </div>
                </div>

                <h2 className="fatos-titulo">Fatos Inusitados sobre a Obra</h2>

                <div className="grid-fatos">
                    <div className="fato-card">
                        <h3>A Famosa Dedicatória</h3>
                        <p>
                            O livro abre com a dedicatória: "Ao verme que primeiro roeu as frias
                            carnes do meu cadáver". Este choque inicial já avisa o leitor de que não
                            lerá um romance romântico idealizado, mas algo cru e irónico.
                        </p>
                    </div>
                    <div className="fato-card">
                        <h3>Publicação em Folhetim</h3>
                        <p>
                            Antes de ser um livro (1881), a obra foi publicada em capítulos na
                            Revista Brasileira (1880). Por isso, os capítulos são muito curtos:
                            tinham de prender a atenção do leitor de revista mês a mês.
                        </p>
                    </div>
                    <div className="fato-card">
                        <h3>Plágio de Sterne?</h3>
                        <p>
                            Machado inspirou-se assumidamente no humor inglês, especialmente em
                            Laurence Sterne (autor de *Tristram Shandy*). A quebra temporal e o
                            diálogo com o leitor vêm daí, mas Machado adaptou isso perfeitamente à
                            elite brasileira.
                        </p>
                    </div>
                    <div className="fato-card">
                        <h3>A Filosofia de Quincas Borba</h3>
                        <p>
                            O livro introduz o "Humanitismo", uma filosofia absurda criada pelo
                            mendigo Quincas Borba (que diz que a destruição de uns é a sobrevivência
                            de outros: "Ao vencedor, as batatas!"). Esta sátira foi tão forte que
                            ganhou um livro próprio mais tarde.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
