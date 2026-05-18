import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AObra.css';

export default function AObra() {
    const [livro, setLivro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const fotoUrl = livro?.foto
        ? `https://projeto-clubyx.onrender.com/${livro.foto.replace(/^\/+/, '')}`
        : null;

    const personagensLista = livro?.personagens
        ? livro.personagens.split(',').map((personagem) => personagem.trim())
        : [];

    return (
        <div className="aobra-page">
            <Header />

            <main className="main-content">
                <section className="section-header">
                    <h1 className="title-main">
                        {loading ? 'Carregando obra...' : `A Obra: ${livro?.nome || ''}`}
                    </h1>
                    <p className="subtitle-main">
                        {error ||
                            'Os dados abaixo estao sendo carregados diretamente do backend da plataforma.'}
                    </p>
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Resumo sobre o livro</h2>
                    <p style={{ whiteSpace: 'pre-line' }}>
                        {livro?.resumo || 'Resumo indisponivel no momento.'}
                    </p>
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Publicacao</h2>
                    <p>{livro?.publicacao || 'Data de publicacao indisponivel.'}</p>
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Personagens Principais</h2>
                    {personagensLista.length > 0 ? (
                        <div className="grid-personagens">
                            {personagensLista.map((personagem) => (
                                <div className="personagem-card" key={personagem}>
                                    <div className="personagem-info">
                                        <p>{personagem}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Personagens indisponiveis no momento.</p>
                    )}
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Contexto Histórico</h2>
                    <p style={{ whiteSpace: 'pre-line' }}>
                        {livro?.contextoHist || 'Contexto historico indisponivel no momento.'}
                    </p>
                </section>

                {fotoUrl && (
                    <section className="obra-bloco">
                        <h2 className="title-section">Capa da Obra</h2>
                        <img
                            src={fotoUrl}
                            alt={livro?.nome || 'Capa do livro'}
                            style={{
                                display: 'block',
                                maxWidth: '320px',
                                width: '100%',
                                borderRadius: '12px',
                                margin: '0 auto',
                            }}
                        />
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}
