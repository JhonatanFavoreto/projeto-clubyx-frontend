import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook'; // 1. Importação do componente adicionada
import '../styles/Biblioteca.css';

export default function Biblioteca() {
    const [livroAlves, setLivroAlves] = useState(null);
    const [livroDomCasmurro, setLivro] = useState(null);
    const [livroBertunho, setLivroBertunho] = useState(null);
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

                const [response1, response2, response3] = await Promise.all([
                    fetch('https://backend-projeto-integrador-rana.onrender.com/api/livro', {
                        headers: headersPadrao,
                    }),
                    fetch('https://bookverse-back-pob5.onrender.com/livros', {
                        headers: headersPadrao,
                    }),
                    fetch('https://readflow-m8o6.onrender.com/api/livros', {
                        headers: headersBertunho,
                    }),
                ]);

                // Processar primeira API (Dom Casmurro)
                if (!response1.ok) {
                    throw new Error(`Erro ${response1.status} ao buscar Dom Casmurro`);
                }
                const data1 = await response1.json();
                const livro1 = Array.isArray(data1) ? data1[0] : data1;
                setLivro(livro1);

                // Processar segunda API (Alves)
                if (!response2.ok) {
                    throw new Error(`Erro ${response2.status} ao buscar Alves`);
                }
                const data2 = await response2.json();
                const livro2 = Array.isArray(data2) ? data2[0] : data2;
                setLivroAlves(livro2);

                // Processar terceira API (Bertunho)
                if (!response3.ok) {
                    throw new Error(`Erro ${response3.status} ao buscar API do bertunho`);
                }
                const data3 = await response3.json();
                const livro3 = Array.isArray(data3) ? data3[0] : data3;
                setLivroBertunho(livro3);
            } catch (error) {
                console.error('❌ Erro ao buscar livros:', error);
                setError(`Não foi possível carregar os dados dos livros. ${error}`);
            } finally {
                setLoading(false); // 2. O loading termina aqui
            }
        };

        carregarLivros();
    }, []);

    const livros = [
        {
            titulo: livroDomCasmurro?.tituloPT || 'Livro indisponivel no momento.',
            autor: livroDomCasmurro?.autor || 'Autor indisponivel no momento.',
            descricao: livroDomCasmurro?.descricaoPT || 'Resumo indisponivel no momento.',
            capaUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmF_59_je7u8ICRJ9P48sGa0SN2w2mlu_w5w&s',
        },
        {
            titulo: livroAlves?.titulo || 'Livro indisponivel no momento',
            autor: livroAlves?.autor || 'Autor indisponivel no momento.',
            descricao: livroAlves?.movimento_pt || 'Resumo indisponivel no momento.',
            capaUrl: 'https://m.media-amazon.com/images/I/91QuydcIX3L.jpg',
        },
        {
            titulo: livroBertunho?.titulo || 'Livro indisponivel no momento',
            autor: livroBertunho?.autor || 'Autor indisponivel no momento',
            descricao: livroBertunho?.sinopse || 'Resumo indisponivel no momento.',
            capaUrl: livroBertunho?.capa_url || 'Foto indisponivel no momento.',
        },
        {
            titulo: 'Quarto de Despejo: Diário de Uma Favelada',
            autor: 'Carolina Maria de Jesus',
            descricao:
                'Narra a luta diária contra a fome, a pobreza extrema e a violência, retratando a favela como o "quarto de despejo" (lixo) da cidade',
        },
        {
            titulo: 'O Guarani',
            autor: 'José de Alencar',
            descricao:
                'Romance indianista que narra a paixão platônica e devoção do índio Peri por Ceci, filha de um fidalgo português, no século XVII.',
        },
        {
            titulo: "Olhos D'Água",
            autor: 'Conceição Evaristo',
            descricao:
                'Uma coletânea de 15 contos que retratam a vivência de afro-brasileiros em situação de vulnerabilidade.',
        },
    ];

    return (
        <div style={{ backgroundColor: '#F4EFE6', minHeight: '100vh' }}>
            <Header />
            <main className="biblioteca-container">
                {/* 3. Renderização Condicional do Loading */}
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
                                    style={{ borderRadius: '10px' }}
                                    className="livro-card"
                                    key={index}>
                                    <div style={{ display: 'flex' }}>
                                        <h3>{livro.titulo}</h3>
                                        <img
                                            style={{ width: '8rem', borderRadius: '10px' }}
                                            src={livro.capaUrl}
                                            alt={livro.titulo}
                                        />
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
