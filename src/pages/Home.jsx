// página Home
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom'; // Importado o useNavigate
import LoadingBook from '../components/LoadingBook';
import '../styles/Home.css';

export default function Home() {
    const [livro, setLivro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Inicializando o hook de navegação

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const response = await fetch('https://projeto-clubyx.onrender.com/livros', {
                    headers: {
                        'x-api-key': 'Clubyx_dev',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Erro retornado por /livros:', errorText);
                    throw new Error(`Erro ${response.status} ao buscar /livros`);
                }

                const data = await response.json();
                console.log('Resposta de /livros:', data);
                setLivro(Array.isArray(data) ? data[0] : data);
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
                setError('Nao foi possivel carregar os dados do livro.');
            } finally {
                setLoading(false);
            }
        };

        carregarLivros();
    }, []);

    return (
        <>
            {loading ? (
                <LoadingBook title="Carregando a página inicial..." />
            ) : (
                <>
                    <Header />
                    <section className="hero-section" id="home">
                        <h1>
                            {error ? 'Memórias Póstumas de Brás Cubas' : livro?.nome || 'A Obra'}
                        </h1>
                        <p className="hero-subtitle">
                            "Ao verme que primeiro roeu as frías carnes do meu cadáver dedico como
                            saudosa lembrança estas memórias póstumas."
                        </p>
                            {/* Evento onClick adicionado com a função navigate */}

                        <button className="btn-primario" onClick={() => navigate('/obra')}>
                            Começar os Estudos
                            </button>

                    </section>

                    <section className="secao-tecnologia" id="obra">
                        <h2>Onde a Tecnologia Encontra a Literatura</h2>

                        <p>
                            O Clube do Livro é uma plataforma digital colaborativa que nasce da
                            união entre tecnologia e literatura. Desenvolvido em parceria pelos
                            alunos de Desenvolvimento de Sistemas (SENAI) e as áreas de Língua
                            Portuguesa e Inglês (SESI), nosso objetivo principal é transformar e
                            facilitar a preparação para os vestibulares.
                        </p>

                        <p>
                            Através de um ambiente interativo e totalmente bilíngue, oferecemos
                            análises literárias, simulados e conteúdos multimídia focados nos
                            maiores clássicos nacionais. É uma ferramenta inovadora construída de
                            alunos para alunos, promovendo o aprendizado interdisciplinar e o
                            trabalho em equipe.
                        </p>
                    </section>

                    <section className="secao-navegacao" id="biblioteca">
                        <h2>Navegue pela Plataforma</h2>
                        <div className="cards-grid">
                            <Link to="/obra" className="card">
                                <h3>A Obra</h3>
                                <p>Resumo, personagens e contexto histórico.</p>
                            </Link>

                            <Link to="/biblioteca" className="card">
                                <h3>Biblioteca</h3>
                                <p>Conheça as obras estudadas pelas outras equipes.</p>
                            </Link>

                            <Link to="/vestibular" className="card">
                                <h3>Vestibular</h3>
                                <p>Dicas, interpretação e possíveis temas de redação.</p>
                            </Link>

                            <Link to="/videoaulas" className="card">
                                <h3>Videoaulas</h3>
                                <p>Conteúdos exclusivos gravados pela equipe.</p>
                            </Link>

                            <Link to="/curiosidades" className="card">
                                <h3>Curiosidades</h3>
                                <p>
                                    Explore curiosidades sobre Machado de Assis e os bastidores
                                    históricos deste clássico.
                                </p>
                            </Link>

                            <Link to="/sobre" className="card">
                                <h3>Sobre</h3>
                                <p>
                                    Conheça a equipe do SENAI e SESI por trás do projeto, e a
                                    plataforma.
                                </p>
                            </Link>

                            <Link to="/simulados" className="card">
                                <h3>Simulados</h3>
                                <p>Simulados para testar o seu conhecimento com base no livro.</p>
                            </Link>
                        </div>
                    </section>

                    <section className="secao-projeto">
                        <h2>Projeto Integrador 2026</h2>
                        <p>
                            Esta plataforma digital colaborativa foi desenvolvida pelas turmas de
                            Desenvolvimento de Sistemas (SENAI) em parceria com Língua Portuguesa e
                            Inglês (SESI). Nosso objetivo principal é unir tecnologia e literatura
                            para create uma ferramenta bilíngue e auxiliar os estudantes na
                            preparação para os vestibulares, promovendo um aprendizado
                            interdisciplinar e colaborativo.
                        </p>
                    </section>
                </>
            )}

            <Footer />
        </>
    );
}
