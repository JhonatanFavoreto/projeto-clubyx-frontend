import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';
import { getHomeConteudo } from '../services/homeService';

export default function Home() {
    const [conteudo, setConteudo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const dadosBackend = await getHomeConteudo();
                setConteudo(dadosBackend);
                setLoading(false);
            } catch (error) {
                console.error('Erro na API:', error);
                setErro('Erro ao carregar conteúdo do servidor.');
                setLoading(false);
            }
        };
        carregarDados();
    }, []);

    if (loading) return <div className="loading">Carregando plataforma...</div>;
    if (erro) return <div className="error">{erro}</div>;
    if (!conteudo) return null;

    return (
        <>
            <Header />
            <main>
                {/* 1. HERO SECTION - Dinâmico */}
                <section className="hero-section" id="home">
                    <h1>{conteudo.hero?.titulo}</h1>
                    <p className="hero-subtitle">{conteudo.hero?.subtitulo}</p>
                    <button className="btn-primario">
                        {conteudo.hero?.textoBotao || 'Começar'}
                    </button>
                </section>

                {/* 2. SEÇÃO TECNOLOGIA - Texto vem do Backend */}
                <section className="secao-tecnologia" id="obra">
                    <h2>{conteudo.secaoTecnologia?.titulo}</h2>
                    {/* Usando map caso o backend mande vários parágrafos */}
                    {conteudo.secaoTecnologia?.paragrafos.map((p, index) => (
                        <p key={index}>{p}</p>
                    ))}
                </section>

                {/* 3. SEÇÃO DEFUNTO AUTOR - Texto e Imagem Dinâmicos */}
                <section className="secao-defunto-autor">
                    <div className="defunto-texto">
                        <h2>{conteudo.secaoObra?.titulo}</h2>
                        <p>{conteudo.secaoObra?.descricao}</p>
                    </div>
                    <div className="defunto-imagem">
                        {conteudo.secaoObra?.urlImagem ? (
                            <img src={conteudo.secaoObra.urlImagem} alt="Capa do Livro" />
                        ) : (
                            <div className="livro-placeholder">
                                <span>{conteudo.secaoObra?.tituloLivro}</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. NAVEGAÇÃO (CARDS) - Aqui é onde o Backend brilha */}
                <section className="secao-navegacao" id="biblioteca">
                    <h2>Navegue pela Plataforma</h2>
                    <div className="cards-grid">
                        {/* O backend deve retornar um array de objetos para os cards */}
                        {conteudo.cardsNavegacao?.map((card, index) => (
                            <div className="card" key={index}>
                                <h3>{card.titulo}</h3>
                                <p>{card.descricao}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. PROJETO INTEGRADOR - Dinâmico */}
                <section className="secao-projeto">
                    <h2>{conteudo.secaoProjeto?.titulo}</h2>
                    <p>{conteudo.secaoProjeto?.descricao}</p>
                </section>
            </main>
            <Footer />
        </>
    );
}
