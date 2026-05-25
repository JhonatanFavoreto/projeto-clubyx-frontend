import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Videoaulas.css';

export default function Videoaulas() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const carregarVideos = async () => {
            try {
                const response = await fetch('https://projeto-clubyx.onrender.com/videos', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'Clubyx_dev',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Erro retornado pela API:', errorText);
                    throw new Error(`Erro ${response.status} ao buscar vídeos`);
                }

                const data = await response.json();
                console.log('Resposta da API:', data);

                // Garante que 'videosArr' seja sempre uma array.
                // Se a API retornar { videos: [...] }, usamos data.videos.
                // Se retornar um array direto [...], usamos o próprio data.
                const videosArr = data.videos || (Array.isArray(data) ? data : [data]);

                setVideos(videosArr);
            } catch (error) {
                console.error('Erro ao buscar videoaulas:', error);
                setError('Não foi possível carregar os dados das videoaulas.');
            } finally {
                setLoading(false);
            }
        };

        carregarVideos();
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

            <main className="videoaulas-container">
                <div className="page-header">
                    <h1>Videoaulas sobre o livro</h1>
                    <p>
                        Nesta seção de videoaulas, são apresentadas as principais estratégias para
                        compreender a obra com foco no vestibular. O conteúdo destaca os principais
                        papéis inovadores da leitura.
                    </p>
                </div>

                <section>
                    <h2 className="titulo-secao">Aulas Disponíveis</h2>

                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '20px' }}>
                            Carregando videoaulas...
                        </p>
                    ) : error ? (
                        <p style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
                            {error}
                        </p>
                    ) : videos.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '20px' }}>
                            Nenhuma videoaula encontrada.
                        </p>
                    ) : (
                        <div>
                            {videos.map((video, idx) => {
                                // Mapeia os campos vindos da API (ajuste se os nomes no banco forem diferentes)
                                const videoUrl = video.url || video.linkVideo || '';
                                const isYoutube =
                                    videoUrl.includes('youtube') || videoUrl.includes('youtu.be');
                                const titulo =
                                    video.title || video.nome || 'Memórias Póstumas de Brás Cubas';
                                const resumo =
                                    video.resumo ||
                                    video.description ||
                                    'Resumo geral sobre o conteúdo abordado na aula com foco em literatura e história.';

                                // Trata URL do youtube para embed
                                let embedUrl = videoUrl;
                                if (isYoutube && videoUrl.includes('watch?v=')) {
                                    embedUrl = videoUrl.replace('watch?v=', 'embed/').split('&')[0];
                                }

                                return (
                                    <div className="aula-card" key={video.id || idx}>
                                        {/* Início do Vídeo Real */}
                                        <div
                                            className="video-real-container"
                                            style={{
                                                width: '100%',
                                                maxWidth: '600px',
                                                display: 'flex',
                                            }}>
                                            {isYoutube ? (
                                                <iframe
                                                    width="100%"
                                                    height="315"
                                                    src={embedUrl}
                                                    title={`Videoaula - ${titulo}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    style={{ borderRadius: '8px' }}></iframe>
                                            ) : videoUrl ? (
                                                <video
                                                    width="100%"
                                                    height="315"
                                                    controls
                                                    style={{ borderRadius: '8px' }}>
                                                    <source src={videoUrl} type="video/mp4" />
                                                    Seu navegador não suporta a tag de vídeo.
                                                </video>
                                            ) : (
                                                <div className="video-placeholder">
                                                    <p
                                                        style={{
                                                            padding: '20px',
                                                            textAlign: 'center',
                                                            margin: 'auto',
                                                        }}>
                                                        Vídeo não disponível no momento.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {/* Fim do Vídeo Real */}

                                        <div className="aula-info">
                                            <h3>Aula {idx + 1}</h3>
                                            <h4>{titulo}</h4>
                                            <p className="aula-subtitulo">
                                                Introdução e análise focada nos aspectos mais
                                                cobrados.
                                            </p>
                                            <p>{resumo}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
