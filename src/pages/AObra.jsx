import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingBook from '../components/LoadingBook';
import '../styles/AObra.css';

export default function AObra() {
    const [livro, setLivro] = useState(null);
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
                setError(
                    idioma === 'pt'
                        ? 'Não foi possível carregar os dados do livro.'
                        : 'Could not load book data.',
                );
            } finally {
                setLoading(false);
            }
        };

        carregarLivros();
    }, [idioma]);

    const nomeLivro = idioma === 'en' ? livro?.nomeIng || livro?.nome : livro?.nome;

    const resumoLivro = idioma === 'en' ? livro?.resumoLivroIng || livro?.resumo : livro?.resumo;

    const contextoHistorico =
        idioma === 'en' ? livro?.contextoHistIng || livro?.contextoHist : livro?.contextoHist;

    const personagensTexto =
        idioma === 'en' ? livro?.personagensIng || livro?.personagens : livro?.personagens;

    const processarPersonagens = () => {
        if (!personagensTexto) return [];

        if (Array.isArray(personagensTexto)) {
            return personagensTexto;
        }

        if (typeof personagensTexto === 'string') {
            if (personagensTexto.includes('\n')) {
                const blocos = personagensTexto.split(/\n\s*\n/);

                return blocos
                    .map((bloco) => {
                        const linhas = bloco.trim().split('\n');

                        const primeiraLinha = linhas[0] || '';
                        const descricao = linhas.slice(1).join(' ').trim();

                        const match = primeiraLinha.match(/^([^(]+)(?:\(([^)]+)\))?/);

                        const nome = match ? match[1].trim() : primeiraLinha;

                        const papel = match && match[2] ? match[2].trim() : '';

                        return {
                            nome,
                            papel,
                            descricao,
                        };
                    })
                    .filter((p) => p.nome);
            }

            return personagensTexto.split(',').map((nome) => ({
                nome: nome.trim(),
                papel: '',
                descricao: '',
            }));
        }

        return [];
    };

    const personagensLista = processarPersonagens();

    return (
        <>
            <Header />

            <div className="aobra-page">
                <main className="main-content">
                    {loading ? (
                        <LoadingBook
                            title={idioma === 'pt' ? 'Carregando a obra...' : 'Loading book...'}
                        />
                    ) : (
                        <>
                            <section className="section-header">
                                <div className="hero-capa">
                                    <img
                                        src={livro?.foto || 'Foto indisponível no momento.'}
                                        alt={nomeLivro || 'Capa do livro'}
                                        className="obra-capa-imagem"
                                        style={{ borderRadius: '15px' }}
                                    />
                                </div>

                                <div className="hero-conteudo">
                                    <div className="hero-topo">
                                        <div>
                                            <p className="hero-etiqueta">
                                                {idioma === 'pt'
                                                    ? 'Livro em destaque'
                                                    : 'Featured Book'}
                                            </p>

                                            <h1 className="title-main">{nomeLivro || 'A Obra'}</h1>
                                        </div>
                                    </div>

                                    <p className="subtitle-main">
                                        {error ||
                                            (idioma === 'pt'
                                                ? `Ano de publicação: ${livro?.publicacao || '---'}`
                                                : `Publication year: ${
                                                      livro?.publicacao || '---'
                                                  }`)}
                                    </p>
                                </div>
                            </section>

                            <section className="obra-bloco">
                                <div>
                                    <h2 className="title-section">
                                        {idioma === 'pt' ? 'Resumo sobre o livro' : 'Book Summary'}
                                    </h2>

                                    <p className="texto-formatado">
                                        {resumoLivro ||
                                            (idioma === 'pt'
                                                ? 'Resumo indisponível no momento.'
                                                : 'Summary unavailable at the moment.')}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="title-section" style={{ marginTop: '60px' }}>
                                        {idioma === 'pt'
                                            ? 'Contexto Histórico'
                                            : 'Historical Context'}
                                    </h2>

                                    <p className="texto-formatado">
                                        {contextoHistorico ||
                                            (idioma === 'pt'
                                                ? 'Contexto histórico indisponível no momento.'
                                                : 'Historical context unavailable at the moment.')}
                                    </p>
                                </div>
                            </section>

                            <section className="obra-bloco">
                                <h2 className="title-section">
                                    {idioma === 'pt' ? 'Personagens Principais' : 'Main Characters'}
                                </h2>

                                {personagensLista.length > 0 ? (
                                    <div className="personagens-lista-container">
                                        {personagensLista.map((personagem, index) => (
                                            <div className="personagem-item-bloco" key={index}>
                                                <h3 className="personagem-titulo">
                                                    {personagem.nome}

                                                    {personagem.papel && (
                                                        <span className="personagem-papel">
                                                            {' '}
                                                            ({personagem.papel})
                                                        </span>
                                                    )}
                                                </h3>

                                                {personagem.descricao && (
                                                    <p className="personagem-descricao">
                                                        {personagem.descricao}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="texto-esquerdo">
                                        {idioma === 'pt'
                                            ? 'Personagens indisponíveis no momento.'
                                            : 'Characters unavailable at the moment.'}
                                    </p>
                                )}
                            </section>
                        </>
                    )}
                </main>
            </div>

            <Footer />
        </>
    );
}
