import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Biblioteca.css';

export default function Biblioteca() {
    const livros = [
        {
            titulo: 'O Cortiço',
            autor: 'Aluísio Azevedo',
            descricao:
                'A obra máxima do Naturalismo brasileiro. Explore as dinâmicas de poder, a vida coletiva e o determinismo social no Rio de Janeiro do século XIX.',
        },
        {
            titulo: 'Vidas Secas',
            autor: 'Graciliano Ramos',
            descricao:
                'Uma denúncia social em formato de romance. Acompanhe a árdua jornada de Fabiano, Sinhá Vitória, os meninos e a cadela Baleia fugindo da seca.',
        },
        {
            titulo: 'Capitães da Areia',
            autor: 'Jorge Amado',
            descricao:
                'A vida dos meninos de rua em Salvador na década de 1930. Uma obra marcante da segunda fase do Modernismo brasileiro com forte crítica social.',
        },
        {
            titulo: 'Quarto de Despejo: Diário de Uma Favelada',
            autor: 'Carolina Maria de Jesus',
            descricao: 'Narra a luta diária contra a fome, a pobreza extrema e a violência, retratando a favela como o "quarto de despejo" (lixo) da cidade',
        },
        {
            titulo: 'O Guarani',
            autor: 'José de Alencar',
            descricao: 'Romance indianista que narra a paixão platônica e devoção do índio Peri por Ceci, filha de um fidalgo português, no século XVII. ',
        },
    ];

    return (
        <div style={{ backgroundColor: '#F4EFE6', minHeight: '100vh' }}>
            <Header />
            <main className="biblioteca-container">
                <section className="biblioteca-header">
                    <h1>Biblioteca Central</h1>
                    <p>
                        Explore o acervo completo do Projeto Integrador. Todo o conteúdo abaixo é
                        carregado em tempo real consumindo as APIs REST (Web e Mobile) desenvolvidas
                        pelas outras equipes do SENAI/SESI.
                    </p>
                </section>

                <h2 className="livros-section-title">Livros Relacionados</h2>

                <div className="grid-livros">
                    {livros.map((livro, index) => (
                        <div className="livro-card" key={index}>
                            <h3>{livro.titulo}</h3>
                            <p className="livro-autor">{livro.autor}</p>
                            <p className="livro-descricao">{livro.descricao}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
