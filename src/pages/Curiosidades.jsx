import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook';
import { getCuriosidadesConteudo } from '../services/curiosidadesService';
import '../styles/Curiosidades.css';

export default function Curiosidades() {
    const [conteudo, setConteudo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'pt');

    useEffect(() => {
        const atualizarIdioma = () => {
            setIdioma(localStorage.getItem('idioma') || 'pt');
        };
        window.addEventListener('idiomaAlterado', atualizarIdioma);
        return () => window.removeEventListener('idiomaAlterado', atualizarIdioma);
    }, []);

    useEffect(() => {
        const carregarConteudo = async () => {
            try {
                const data = await getCuriosidadesConteudo();
                setConteudo(Array.isArray(data) ? data[0] : data);
            } catch (err) {
                console.error('Erro ao buscar conteudo:', err);
                setError(
                    idioma === 'en'
                        ? 'Could not load content data.'
                        : 'Não foi possível carregar os dados do conteudo.'
                );
            } finally {
                setLoading(false);
            }
        };

        carregarConteudo();
    }, [idioma]);

    const en = idioma === 'en';

    // Campos do banco com fallback
    const materia = en
        ? conteudo?.materiaIng || conteudo?.materia || 'Curiosities'
        : conteudo?.materia || 'Curiosidades';

    const resumo = en
        ? conteudo?.resumoConteudoIng || conteudo?.resumo || 'Content loaded from backend.'
        : conteudo?.resumo || 'Conteudo carregado do backend.';

    const textoCuriosidades = en
        ? conteudo?.curiosidadesIng || conteudo?.curiosidades || 'Curiosities unavailable at the moment.'
        : conteudo?.curiosidades || 'Curiosidades indisponíveis no momento.';

    const dicas = en
        ? conteudo?.dicasIng || conteudo?.dicas || 'Tips unavailable at the moment.'
        : conteudo?.dicas || 'Dicas indisponíveis no momento.';

    const analises = en
        ? conteudo?.analisesIng || conteudo?.analises || 'Analysis unavailable at the moment.'
        : conteudo?.analises || 'Análises indisponíveis no momento.';

    const videoAulas = conteudo?.videoAulas || (en ? 'Video lessons unavailable at the moment.' : 'Videoaulas indisponíveis no momento.');

    // Textos fixos
    const t = {
        loading: en ? 'Loading curiosities...' : 'Carregando curiosidades...',
        erroTitulo: en ? 'Error' : 'Erro',
        tituloMain: en ? 'Curiosities' : 'Curiosidades',
        curiosidadesDaObra: en ? 'Curiosities about the Work' : 'Curiosidades da Obra',
        outrosCampos: en ? 'Other Content Fields' : 'Outros Campos do Conteudo',
        resumoLabel: en ? 'Summary' : 'Resumo',
        resumoFallback: en ? 'Summary unavailable at the moment.' : 'Resumo indisponível no momento.',
        dicasLabel: en ? 'Tips' : 'Dicas',
        analisesLabel: en ? 'Analysis' : 'Análises',
        videoaulasLabel: en ? 'Video Lessons' : 'Videoaulas',
    };

    const detalhesConteudo = [
        { titulo: t.resumoLabel, texto: resumo || t.resumoFallback },
        { titulo: t.dicasLabel, texto: dicas },
        { titulo: t.analisesLabel, texto: analises },
        { titulo: t.videoaulasLabel, texto: videoAulas },
    ];

    return (
        <>
            <Header />

            <div className="curiosidades-page">
                <main className="main-content">
                    {loading ? (
                        <LoadingBook title={t.loading} />
                    ) : error ? (
                        <section className="obra-bloco">
                            <h2 className="title-section">{t.erroTitulo}</h2>
                            <p className="texto-formatado">{error}</p>
                        </section>
                    ) : (
                        <>
                            <section className="section-header">
                                <div className="hero-conteudo">
                                    <div className="hero-titulo-container">
                                        <p className="hero-etiqueta">{materia}</p>
                                        <h1 className="title-main">{t.tituloMain}</h1>
                                    </div>

                                    <div className="hero-texto-container">
                                        <p className="subtitle-main">{resumo}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="section-header">
                                <div className="hero-conteudo">
                                    <div className="hero-titulo-container">
                                        <h2 className="title-section">{t.curiosidadesDaObra}</h2>
                                    </div>

                                    <div className="hero-texto-container">
                                        <p className="subtitle-main texto-formatado texto-longo">
                                            {textoCuriosidades}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="obra-bloco">
                                <h2 className="title-section">{t.outrosCampos}</h2>
                                <div className="grid-fatos">
                                    {detalhesConteudo.map((item) => (
                                        <div className="fato-card" key={item.titulo}>
                                            <h3>{item.titulo}</h3>
                                            <p>{item.texto}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                </main>
            </div>

            <Footer />
        </>
    );
}