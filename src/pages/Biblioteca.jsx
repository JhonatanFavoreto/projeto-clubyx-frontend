import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook';
import '../styles/Biblioteca.css';

export default function Biblioteca() {
    const [livroQuartoDespejo, setLivroQuartoDespejo] = useState(null);
    const [livroAlves, setLivroAlves] = useState(null);
    const [livroBertunho, setLivroBertunho] = useState(null);
    const [livroDanilo, setLivroDanilo] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'pt');

    useEffect(() => {
        const atualizarIdioma = () => {
            setIdioma(localStorage.getItem('idioma') || 'pt');
        };

        window.addEventListener('idiomaAlterado', atualizarIdioma);

        return () => {
            window.removeEventListener('idiomaAlterado', atualizarIdioma);
        };
    }, []);

    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const headersPadrao = { 'x-api-key': 'amods' };
                const headersBertunho = { 'x-api-key': 'projetoamods' };
                const headersDanilo = { 'x-api-key': 'livr0' };

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

                // API 1 - Quarto de Despejo
                if (!response1.ok) throw new Error(`Erro ${response1.status} ao buscar Quarto de Despejo`);
                const data1 = await response1.json();
                setLivroQuartoDespejo(Array.isArray(data1) ? data1[0] : data1);

                // API 2 - Alves (Vidas Secas)
                if (!response2.ok) throw new Error(`Erro ${response2.status} ao buscar Vidas Secas`);
                const data2 = await response2.json();
                setLivroAlves(Array.isArray(data2) ? data2[0] : data2);

                // API 3 - Bertunho (pode retornar erro 500)
                if (response3.ok) {
                    const data3 = await response3.json();
                    setLivroBertunho(Array.isArray(data3) ? data3[0] : data3);
                }

                // API 4 - Danilo (O Caminho de Pedras)
                if (!response5.ok) throw new Error(`Erro ${response5.status} ao buscar O Caminho de Pedras`);
                const data5 = await response5.json();
                setLivroDanilo(Array.isArray(data5) ? data5[0] : data5);

            } catch (error) {
                console.error('❌ Erro ao buscar livros:', error);
                setError(`Não foi possível carregar os dados dos livros. ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        carregarLivros();
    }, []);

    const en = idioma === 'en';

    // Textos fixos
    const t = {
        loading: en ? 'Loading library...' : 'Carregando a biblioteca...',
        headerTitle: en ? 'Central Library' : 'Biblioteca Central',
        headerDesc: en
            ? 'Explore the complete collection of the Integrative Project. All content below is loaded in real time by consuming the REST APIs (Web and Mobile) developed by the other SENAI/SESI teams.'
            : 'Explore o acervo completo do Projeto Integrador. Todo o conteúdo abaixo é carregado em tempo real consumindo as APIs REST (Web e Mobile) desenvolvidas pelas outras equipes do SENAI/SESI.',
        livrosRelacionados: en ? 'Related Books' : 'Livros Relacionados',
        indisponivel: en ? 'Book unavailable at the moment.' : 'Livro indisponível no momento.',
        autorIndisponivel: en ? 'Author unavailable at the moment.' : 'Autor indisponível no momento.',
        resumoIndisponivel: en ? 'Summary unavailable at the moment.' : 'Resumo indisponível no momento.',
    };

    const livros = [
        // API 1 — Quarto de Despejo
        {
            titulo: en
                ? livroQuartoDespejo?.tituloEN || livroQuartoDespejo?.tituloPT
                : livroQuartoDespejo?.tituloPT || t.indisponivel,
            autor: livroQuartoDespejo?.autor || t.autorIndisponivel,
            descricao: en
                ? livroQuartoDespejo?.descricaoEN || livroQuartoDespejo?.descricaoPT
                : livroQuartoDespejo?.descricaoPT || t.resumoIndisponivel,
            capaUrl: livroQuartoDespejo?.capaURl || livroQuartoDespejo?.capaUrl || '',
        },
        // API 2 — Vidas Secas (Alves)
        {
            titulo: livroAlves?.titulo || t.indisponivel,
            autor: livroAlves?.autor || t.autorIndisponivel,
            descricao: en
                ? livroAlves?.movimento_en || livroAlves?.movimento_pt
                : livroAlves?.movimento_pt || t.resumoIndisponivel,
            capaUrl: livroAlves?.capa_url
        },
        // API 3 — Bertunho
        {
            titulo: livroBertunho?.titulo || t.indisponivel,
            autor: livroBertunho?.autor || t.autorIndisponivel,
            descricao: livroBertunho?.sinopse || t.resumoIndisponivel,
            capaUrl: livroBertunho?.capa_url || '',
        },
        // API 4 — O Caminho de Pedras (Danilo)
        {
            titulo: livroDanilo?.titulo || t.indisponivel,
            autor: livroDanilo?.autor || t.autorIndisponivel,
            descricao: en
                ? (livroDanilo?.resumo_en?.slice(0, 148) || livroDanilo?.resumo?.slice(0, 148))
                : livroDanilo?.resumo?.slice(0, 148) || t.resumoIndisponivel,
            capaUrl: livroDanilo?.capa || '',
        },
    ];

    return (
        <div style={{ backgroundColor: '#F4EFE6', minHeight: '100vh' }}>
            <Header />

            <main className="biblioteca-container">
                {loading ? (
                    <LoadingBook title={t.loading} />
                ) : (
                    <>
                        <section className="biblioteca-header">
                            <h1>{t.headerTitle}</h1>
                            <p>{t.headerDesc}</p>
                        </section>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <h2 className="livros-section-title">{t.livrosRelacionados}</h2>

                        <div className="grid-livros">
                            {livros.map((livro, index) => (
                                <div
                                    key={index}
                                    className="livro-card"
                                    style={{ borderRadius: '10px' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <h3>{livro.titulo}</h3>

                                        {livro.capaUrl && (
                                            <img
                                                src={livro.capaUrl}
                                                alt={livro.titulo}
                                                style={{ width: '8rem', borderRadius: '10px' }}
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