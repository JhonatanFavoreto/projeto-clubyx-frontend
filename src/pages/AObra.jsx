import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingBook from '../components/LoadingBook';
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

    // Função que trata o campo 'personagens' independente de como ele venha do banco
    const processarPersonagens = () => {
        if (!livro?.personagens) return [];

        // 1. Se o banco já retornar um Array de objetos prontos
        if (Array.isArray(livro.personagens)) {
            return livro.personagens;
        }

        // 2. Se o banco retornar uma String (Texto corrido)
        if (typeof livro.personagens === 'string') {
            // Se for o texto longo separado por quebras de linha
            if (livro.personagens.includes('\n')) {
                // Divide o texto por blocos (linhas em branco entre parágrafos)
                const blocos = livro.personagens.split(/\n\s*\n/);

                return blocos
                    .map((bloco) => {
                        const linhas = bloco.trim().split('\n');
                        const primeiraLinha = linhas[0] || '';
                        const descricao = linhas.slice(1).join(' ').trim();

                        // Regex para separar o "Nome" do "(Papel entre parênteses)"
                        const match = primeiraLinha.match(/^([^(]+)(?:\(([^)]+)\))?/);
                        const nome = match ? match[1].trim() : primeiraLinha;
                        const papel = match && match[2] ? match[2].trim() : '';

                        return { nome, papel, descricao };
                    })
                    .filter((p) => p.nome); // Remove blocos vazios
            }

            // 3. Caso seja o formato antigo (apenas nomes separados por vírgula)
            return livro.personagens.split(',').map((nome) => ({
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
                        <LoadingBook title="Carregando a obra..." />
                    ) : (
                        <>
                            <section className="section-header">
                                <div className="hero-capa">
                                    <img
                                        src={livro?.foto || 'Foto indisponivel no momento.'}
                                        alt={livro?.foto || 'Capa do livro'}
                                        className="obra-capa-imagem"
                                        style={{ borderRadius: '15px' }}
                                    />
                                </div>

                                <div className="hero-conteudo">
                                    <div className="hero-topo">
                                        <div>
                                            <p className="hero-etiqueta">Livro em destaque</p>
                                            <h1 className="title-main">
                                                {livro?.nome || 'A Obra'}
                                            </h1>
                                        </div>
                                    </div>

                                    <p className="subtitle-main">
                                        {error ||
                                            `Ano de publicacao: ${livro?.publicacao || '---'}`}
                                    </p>
                                </div>
                            </section>

                            <section className="obra-bloco">
                                <div>
                                    <h2 className="title-section">Resumo sobre o livro</h2>
                                    <p className="texto-formatado">
                                        {livro?.resumo || 'Resumo indisponivel no momento.'}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="title-section" style={{ marginTop: '60px' }}>
                                        Contexto Histórico
                                    </h2>
                                    <p className="texto-formatado">
                                        {livro?.contextoHist ||
                                            'Contexto historico indisponivel no momento.'}
                                    </p>
                                </div>
                            </section>

                            {/* Container único dos Personagens alinhado à esquerda */}
                            <section className="obra-bloco">
                                <h2 className="title-section">Personagens Principais</h2>
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
                                        Personagens indisponiveis no momento.
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
