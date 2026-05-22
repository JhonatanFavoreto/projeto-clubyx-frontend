
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Simulados.css';
import { useState, useEffect } from 'react';

export default function AObra() {
    const [livro, setLivro] = useState(null);
    const [questoes, setQuestoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const proximaPagina = () => {
        navigate('/simulados2');
    };

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [resSimulados, resQuestoes] = await Promise.all([
                    fetch('https://projeto-clubyx.onrender.com/simulados', {
                        headers: { 'x-api-key': 'Clubyx_dev' },
                    }),
                    fetch('https://projeto-clubyx.onrender.com/questoes', {
                        headers: { 'x-api-key': 'Clubyx_dev' },
                    }),
                ]);

                if (!resSimulados.ok)
                    throw new Error(`Erro ${resSimulados.status} ao buscar /simulados`);
                if (!resQuestoes.ok)
                    throw new Error(`Erro ${resQuestoes.status} ao buscar /questoes`);

                const dataSimulados = await resSimulados.json();
                const dataQuestoes = await resQuestoes.json();
                console.log('DADOS DA API:', dataQuestoes);

                setLivro(Array.isArray(dataSimulados) ? dataSimulados[0] : dataSimulados);
                setQuestoes(Array.isArray(dataQuestoes) ? dataQuestoes : [dataQuestoes]);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                setError('Não foi possível carregar os dados.');
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="simulados-page">
            <header className="header">
                <Header />
            </header>

            <div className="top-line"></div>

            <section className="hero">
                <h1 className="texto-formatado">
                    {livro?.nome || 'Nome indisponivel no momento.'}
                </h1>

                <p className="texto-formatado">
                    {livro?.resumo || 'Resumo indisponivel no momento.'}
                </p>
            </section>

            <main className="content">
                <h2>Questão 01</h2>

                <h4 className="texto-formatado">
                    {questoes[0]?.enunciado || 'Enunciado indisponivel no momento.'}
                </h4>

                <div className="options">
                    <button>
                        {questoes[0]?.alternativas?.[0]?.texto ||
                            'Enunciado indisponível no momento.'}
                    </button>
                    <button>
                        {questoes[0]?.alternativas?.[1]?.texto ||
                            'Enunciado indisponível no momento.'}
                    </button>
                    <button>
                        {questoes[0]?.alternativas?.[2]?.texto ||
                            'Enunciado indisponível no momento.'}
                    </button>
                    <button>
                        {questoes[0]?.alternativas?.[3]?.texto ||
                            'Enunciado indisponível no momento.'}
                    </button>
                </div>

                <div className="next-button-container">
                    <button className="next-button" onClick={proximaPagina}>
                        Próxima questão →
                    </button>
                </div>
            </main>

            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
}