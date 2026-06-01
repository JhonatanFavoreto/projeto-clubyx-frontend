import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook';
import '../styles/Biblioteca.css';

export default function Biblioteca() {
    const [livroAlves, setLivroAlves] = useState(null);
    const [livroDomCasmurro, setLivro] = useState(null);
    const [livroBertunho, setLivroBertunho] = useState(null);
    // const [livroNatalia, setLivroNatalia] = useState(null);
    const [livroDanilo, setLivroDanilo] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const headersPadrao = {
                    'x-api-key': 'amods',
                };

                const headersBertunho = {
                    'x-api-key': 'projetoamods',
                };

                // const headersNatalia = {
                //     'x-api-key': 'bookpedia-backend-2026',
                // };

                const headersDanilo = {
                    'x-api-key': 'livr0',
                };

                const [response1, response2, response3, response5] = await Promise.all([
                    fetch('https://backend-projeto-integrador-rana.onrender.com/api/livro', {
                        headers: headersPadrao,
                    }),

                    fetch('https://bookverse-back-pob5.onrender.com/livros', {
                        headers: headersPadrao,
                    }),

                    fetch('https://readflow-m8o6.onrender.com/api/livros', {
                        headers: headersBertunho,
                    }),

                    fetch('https://devstones-backend.onrender.com/api/livro/', {
                        headers: headersDanilo,
                    }),
                ]);

                // API 1 - Dom Casmurro
                if (!response1.ok) {
                    throw new Error(`Erro ${response1.status} ao buscar Dom Casmurro`);
                }

                const data1 = await response1.json();

                console.log('🔍 Resposta completa API 1:', data1);

                const livro1 = Array.isArray(data1) ? data1[0] : data1;

                setLivro(livro1);

                // API 2 - Alves
                if (!response2.ok) {
                    throw new Error(`Erro ${response2.status} ao buscar Alves`);
                }

                const data2 = await response2.json();

                console.log('🔍 Resposta completa API 2:', data2);

                const livro2 = Array.isArray(data2) ? data2[0] : data2;

                setLivroAlves(livro2);

                // API 3 - Bertunho
                if (!response3.ok) {
                    throw new Error(`Erro ${response3.status} ao buscar API do Bertunho`);
                }

                const data3 = await response3.json();

                console.log('🔍 Resposta completa API 3:', data3);

                const livro3 = Array.isArray(data3) ? data3[0] : data3;

                setLivroBertunho(livro3);

                // API 4 - Danilo
                if (!response5.ok) {
                    throw new Error(`Erro ${response5.status} ao buscar API do Danilo`);
                }

                const data5 = await response5.json();

                console.log('🔍 Resposta completa API 4:', data5);

                const livro5 = Array.isArray(data5) ? data5[0] : data5;

                setLivroDanilo(livro5);
            } catch (error) {
                console.error('❌ Erro ao buscar livros:', error);

                setError(`Não foi possível carregar os dados dos livros. ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        carregarLivros();
    }, []);

    const livros = [
        {
            titulo: livroDomCasmurro?.tituloPT || 'Livro indisponível no momento.',
            autor: livroDomCasmurro?.autor || 'Autor indisponível no momento.',
            descricao: livroDomCasmurro?.descricaoPT || 'Resumo indisponível no momento.',
            capaUrl: livroDomCasmurro?.capaURl || livroDomCasmurro?.capaUrl || '',
        },
        {
            titulo: livroAlves?.titulo || 'Livro indisponível no momento.',
            autor: livroAlves?.autor || 'Autor indisponível no momento.',
            descricao: livroAlves?.movimento_pt || 'Resumo indisponível no momento.',
            capaUrl: 'https://m.media-amazon.com/images/I/91QuydcIX3L.jpg',
        },
        {
            titulo: livroBertunho?.titulo || 'Livro indisponível no momento.',
            autor: livroBertunho?.autor || 'Autor indisponível no momento.',
            descricao: livroBertunho?.sinopse || 'Resumo indisponível no momento.',
            capaUrl: livroBertunho?.capa_url || '',
        },
        {
            titulo: livroDanilo?.titulo || 'Livro indisponível no momento',
            autor: livroDanilo?.autor || 'Autor indisponível no momento',
            descricao:
                livroDanilo?.resumo?.slice(0, 148) || 'Resumo indisponível no momento',
            capaUrl: livroDanilo?.capa || '',
        },
    ];

    return (
        <div
            style={{
                backgroundColor: '#F4EFE6',
                minHeight: '100vh',
            }}>
            <Header />

            <main className="biblioteca-container">
                {loading ? (
                    <LoadingBook title="Carregando a biblioteca..." />
                ) : (
                    <>
                        <section className="biblioteca-header">
                            <h1>Biblioteca Central</h1>

                            <p>
                                Explore o acervo completo do Projeto Integrador. Todo o conteúdo
                                abaixo é carregado em tempo real consumindo as APIs REST (Web e
                                Mobile) desenvolvidas pelas outras equipes do SENAI/SESI.
                            </p>
                        </section>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <h2 className="livros-section-title">Livros Relacionados</h2>

                        <div className="grid-livros">
                            {livros.map((livro, index) => (
                                <div
                                    key={index}
                                    className="livro-card"
                                    style={{
                                        borderRadius: '10px',
                                    }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'center',
                                        }}>
                                        <h3>{livro.titulo}</h3>

                                        {livro.capaUrl && (
                                            <img
                                                src={livro.capaUrl}
                                                alt={livro.titulo}
                                                style={{
                                                    width: '8rem',
                                                    borderRadius: '10px',
                                                }}
                                            />
                                        )}
                                    </div>

                                    <p className="livro-autor">{livro.autor}</p>

                                    <p className="livro-descricao">{livro.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
