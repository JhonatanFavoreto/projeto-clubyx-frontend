import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Videoaulas.css';

export default function Videoaulas() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || 'pt');

    useEffect(() => {
        const atualizarIdioma = () => {
            setIdioma(localStorage.getItem('idioma') || 'pt');
        };
        window.addEventListener('idiomaAlterado', atualizarIdioma);
        return () => window.removeEventListener('idiomaAlterado', atualizarIdioma);
    }, []);

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

                const videosArr = data.videos || (Array.isArray(data) ? data : [data]);
                setVideos(videosArr);
            } catch (error) {
                console.error('Erro ao buscar videoaulas:', error);
                setError(
                    idioma === 'en'
                        ? 'Could not load video lessons data.'
                        : 'Não foi possível carregar os dados das videoaulas.'
                );
            } finally {
                setLoading(false);
            }
        };

        carregarVideos();
    }, [idioma]);

    const en = idioma === 'en';

    const t = {
        pageTitle: en ? 'Video Lessons about the Book' : 'Videoaulas sobre o livro',
        pageDesc: en
            ? 'In this video lessons section, the main strategies for understanding the work with a focus on college entrance exams are presented. The content highlights the key innovative aspects of the reading.'
            : 'Nesta seção de videoaulas, são apresentadas as principais estratégias para compreender a obra com foco no vestibular. O conteúdo destaca os principais papéis inovadores da leitura.',
        aulasDisponiveis: en ? 'Available Lessons' : 'Aulas Disponíveis',
        carregando: en ? 'Loading video lessons...' : 'Carregando videoaulas...',
        nenhumaAula: en ? 'No video lessons found.' : 'Nenhuma videoaula encontrada.',
        videoIndisponivel: en ? 'Video unavailable at the moment.' : 'Vídeo não disponível no momento.',
        navegadorSemSupporte: en ? 'Your browser does not support the video tag.' : 'Seu navegador não suporta a tag de vídeo.',
        aulaLabel: en ? 'Lesson' : 'Aula',
        tituloFallback: en ? 'Posthumous Memoirs of Brás Cubas' : 'Memórias Póstumas de Brás Cubas',
        resumoFallback: en
            ? 'General summary of the content covered in the lesson with a focus on literature and history.'
            : 'Resumo geral sobre o conteúdo abordado na aula com foco em literatura e história.',
        aulaSubtitulo: en
            ? 'Introduction and analysis focused on the most tested aspects.'
            : 'Introdução e análise focada nos aspectos mais cobrados.',
    };

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
                    <h1>{t.pageTitle}</h1>
                    <p>{t.pageDesc}</p>
                </div>

                <section>
                    <h2 className="titulo-secao">{t.aulasDisponiveis}</h2>

                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '20px' }}>
                            {t.carregando}
                        </p>
                    ) : error ? (
                        <p style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
                            {error}
                        </p>
                    ) : videos.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '20px' }}>
                            {t.nenhumaAula}
                        </p>
                    ) : (
                        <div>
                            {videos.map((video, idx) => {
                                const videoUrl = video.url || video.linkVideo || '';
                                const isYoutube =
                                    videoUrl.includes('youtube') || videoUrl.includes('youtu.be');
                                const titulo =
                                    video.title || video.nome || t.tituloFallback;
                                const resumo =
                                    video.resumo || video.description || t.resumoFallback;

                                let embedUrl = videoUrl;
                                if (isYoutube && videoUrl.includes('watch?v=')) {
                                    embedUrl = videoUrl.replace('watch?v=', 'embed/').split('&')[0];
                                }

                                return (
                                    <div className="aula-card" key={video.id || idx}>
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
                                                    title={`${t.aulaLabel} - ${titulo}`}
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
                                                    {t.navegadorSemSupporte}
                                                </video>
                                            ) : (
                                                <div className="video-placeholder">
                                                    <p
                                                        style={{
                                                            padding: '20px',
                                                            textAlign: 'center',
                                                            margin: 'auto',
                                                        }}>
                                                        {t.videoIndisponivel}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="aula-info">
                                            <h3>{t.aulaLabel} {idx + 1}</h3>
                                            <h4>{titulo}</h4>
                                            <p className="aula-subtitulo">{t.aulaSubtitulo}</p>
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