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

    useEffect(() => {
        const carregarConteudo = async () => {
            try {
                const data = await getCuriosidadesConteudo();
                setConteudo(Array.isArray(data) ? data[0] : data);
            } catch (err) {
                console.error('Erro ao buscar conteudo:', err);
                setError('Nao foi possivel carregar os dados do conteudo.');
            } finally {
                setLoading(false);
            }
        };

        carregarConteudo();
    }, []);

    const materia = conteudo?.materia || 'Curiosidades';
    const textoCuriosidades = conteudo?.curiosidades || 'Curiosidades indisponiveis no momento.';

    const detalhesConteudo = [
        { titulo: 'Resumo', texto: empty(conteudo?.resumo) },
        { titulo: 'Dicas', texto: conteudo?.dicas || 'Dicas indisponiveis no momento.' },
        {
            titulo: 'Analises',
            texto: conteudo?.analises || 'Analises indisponiveis no momento.',
        },
        {
            titulo: 'Videoaulas',
            texto: conteudo?.videoAulas || 'Videoaulas indisponiveis no momento.',
        },
    ];

    // Função auxiliar rápida para tratar o texto de resumo nos detalhes, se necessário
    function empty(val) {
        return val || 'Resumo indisponivel no momento.';
    }

    return (
        <>
            <Header />

            <div className="curiosidades-page">
                <main className="main-content">
                    {loading ? (
                        <LoadingBook title="Carregando curiosidades" />
                    ) : error ? (
                        <section className="obra-bloco">
                            <h2 className="title-section">Erro</h2>
                            <p className="texto-formatado">{error}</p>
                        </section>
                    ) : (
                        <>
                            <section className="section-header">
                                <div className="hero-conteudo">
                                    <div className="hero-titulo-container">
                                        <p className="hero-etiqueta">{materia}</p>
                                        <h1 className="title-main">Curiosidades</h1>
                                    </div>

                                    <div className="hero-texto-container">
                                        <p className="subtitle-main">
                                            {conteudo?.resumo || 'Conteudo carregado do backend.'}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="section-header">
                                <div className="hero-conteudo">
                                    <div className="hero-titulo-container">
                                        <h2 className="title-section">Curiosidades da Obra</h2>
                                    </div>

                                    <div className="hero-texto-container">
                                        <p className="subtitle-main texto-formatado texto-longo">
                                            {textoCuriosidades}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="obra-bloco">
                                <h2 className="title-section">Outros Campos do Conteudo</h2>
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