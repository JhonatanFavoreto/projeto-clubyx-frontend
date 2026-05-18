import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook'; // Importei o LoadingBook como no Sobre.js
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

                // LÓGICA ATUALIZADA: Extrai MATERIA, RESUMO, DICAS, ANALISES e CURIOSIDADES
                if (Array.isArray(data)) {
                    // Se a API retornar um array de objetos
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
                    // Se a API retornar strings separadas por vírgulas
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
                            // Pega o dado na mesma posição do array, ou usa o único dado disponível
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
            <Header />

            <main className="vestibular-container" style={{ flex: 1 }}>
                {/* Header da Página */}
                <div className="page-header">
                    <h1>Conteúdos e Resumos</h1>
                    <p>
                        Explore os resumos focados nas principais matérias e tópicos exigidos nos
                        vestibulares, analisados pela nossa equipe.
                    </p>
                </div>

                {/* Renderização Condicional: Loading, Erro ou Conteúdo */}
                {loading ? (
                    <LoadingBook title="Carregando conteúdos..." />
                ) : error ? (
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
                                        <h3>{item.materia}</h3>

                                        {/* Renderiza apenas se houver conteúdo */}
                                        {item.resumo && (
                                            <p>
                                                <strong>Resumo:</strong> {item.resumo}
                                            </p>
                                        )}
                                        {item.dicas && (
                                            <p>
                                                <strong>Dicas:</strong> {item.dicas}
                                            </p>
                                        )}
                                        {item.analises && (
                                            <p>
                                                <strong>Análises:</strong> {item.analises}
                                            </p>
                                        )}
                                        {item.curiosidades && (
                                            <p>
                                                <strong>Curiosidades:</strong> {item.curiosidades}
                                            </p>
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
        </div>
    );
}
