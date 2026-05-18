import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook';
import '../styles/Vestibular.css';

export default function ConteudosResumos() {
    const [conteudo, setConteudo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarConteudo = async () => {
            try {
                const response = await fetch('https://projeto-clubyx.onrender.com/conteudo', {
                    headers: {
                        'x-api-key': 'Clubyx_dev',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Erro retornado por /conteudo:', errorText);
                    throw new Error(`Erro ${response.status} ao buscar /conteudo`);
                }

                const data = await response.json();
                console.log('Resposta de /conteudo:', data);

                let listaFinal = [];

                if (Array.isArray(data)) {
                    listaFinal = data
                        .map((item) => ({
                            materia: item.materia ? item.materia.trim() : '',
                            resumo: item.resumo ? item.resumo.trim() : '',
                            dicas: item.dicas ? item.dicas.trim() : '',
                            analises: item.analises ? item.analises.trim() : '',
                            curiosidades: item.curiosidades ? item.curiosidades.trim() : '',
                        }))
                        .filter((item) => item.materia !== '');
                } else if (data?.materia) {
                    const materias = data.materia.split(',').map((n) => n.trim());
                    const resumos = data.resumo ? data.resumo.split(',').map((c) => c.trim()) : [];
                    const dicas = data.dicas ? data.dicas.split(',').map((c) => c.trim()) : [];
                    const analises = data.analises
                        ? data.analises.split(',').map((c) => c.trim())
                        : [];
                    const curiosidades = data.curiosidades
                        ? data.curiosidades.split(',').map((c) => c.trim())
                        : [];

                    listaFinal = materias
                        .map((materia, index) => ({
                            materia: materia,
                            resumo: resumos[index] || data.resumo || '',
                            dicas: dicas[index] || data.dicas || '',
                            analises: analises[index] || data.analises || '',
                            curiosidades: curiosidades[index] || data.curiosidades || '',
                        }))
                        .filter((item) => item.materia !== '');
                }

                setConteudo(listaFinal);
            } catch (error) {
                console.error('Erro ao buscar conteudo:', error);
                setError('Não foi possível carregar os dados dos conteúdos e resumos.');
            } finally {
                setLoading(false);
            }
        };

        carregarConteudo();
    }, []);

    return (
        <div
            style={{
                backgroundColor: '#F4EFE6',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            {/* O Header permanece fixo no topo, independente do carregamento */}
            <Header />

            {loading ? (
                <LoadingBook title="Carregando conteúdos..." />
            ) : (
                <>
                    <main className="vestibular-container" style={{ flex: 1 }}>
                        {/* Header da Página */}
                        <div className="page-header">
                            <h1>Conteúdos e Resumos</h1>
                            <p>
                                Explore os resumos focados nas principais matérias e tópicos
                                exigidos nos vestibulares, analisados pela nossa equipe.
                            </p>
                        </div>

                        {/* Renderização Condicional: Erro ou Conteúdo */}
                        {error ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <section>
                                <h2 className="titulo-secao">Materiais de Estudo</h2>

                                <div className="temas-grid">
                                    {conteudo.length > 0 ? (
                                        conteudo.map((item, index) => (
                                            <div className="tema-redacao" key={index}>
                                                {/* CONTAINER 1: MATÉRIA, RESUMO E ANÁLISES */}
                                                <div className="bloco-conteudo-principal">
                                                    <h3 className="materia-titulo">
                                                        {item.materia}
                                                    </h3>

                                                    {item.resumo && (
                                                        <div className="sub-bloco-info">
                                                            <h4>Resumo</h4>
                                                            <p>{item.resumo}</p>
                                                        </div>
                                                    )}

                                                    {item.analises && (
                                                        <div className="sub-bloco-info">
                                                            <h4>Análises</h4>
                                                            <p>{item.analises}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* CONTAINER 2: DICAS E CURIOSIDADES (ABAIXO) */}
                                                {(item.dicas || item.curiosidades) && (
                                                    <div className="bloco-conteudo-dicas">
                                                        {item.dicas && (
                                                            <div className="sub-bloco-info">
                                                                <h4>Dicas</h4>
                                                                <p>{item.dicas}</p>
                                                            </div>
                                                        )}

                                                        {item.curiosidades && (
                                                            <div className="sub-bloco-info">
                                                                <h4>Curiosidades</h4>
                                                                <p>{item.curiosidades}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ textAlign: 'center', width: '100%' }}>
                                            Nenhum conteúdo ou resumo disponível no momento.
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}
                    </main>

                    <Footer />
                </>
            )}
        </div>
    );
}
