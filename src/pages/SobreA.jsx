import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingBook from '../components/LoadingBook';
import '../styles/Sobre.css';

export default function Sobre() {
    const [integrantes, setIntegrantes] = useState([]);
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
        const carregarIntegrantes = async () => {
            try {
                const response = await fetch('https://projeto-clubyx.onrender.com/integrantes', {
                    headers: { 'x-api-key': 'Clubyx_dev' },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.log('Erro retornado por /integrantes:', errorText);
                    throw new Error(`Erro ${response.status} ao buscar /integrantes`);
                }

                const data = await response.json();
                console.log('Resposta de /integrantes:', data);

                let listaFinal = [];

                if (Array.isArray(data)) {
                    listaFinal = data
                        .map((item) => ({
                            nome: item.nome ? item.nome.trim() : '',
                            curso: item.curso ? item.curso.trim() : '',
                            foto:
                                item.foto ||
                                item.fotoUrl ||
                                item.imagem ||
                                item.image ||
                                item.url ||
                                item.link ||
                                '',
                        }))
                        .filter((item) => item.nome !== '');
                } else if (data?.nome) {
                    const nomes = data.nome.split(',').map((n) => n.trim());
                    const cursos = data.curso ? data.curso.split(',').map((c) => c.trim()) : [];

                    listaFinal = nomes
                        .map((nome, index) => ({
                            nome,
                            curso: cursos[index] || data.curso || '',
                            foto: data.foto || '',
                        }))
                        .filter((item) => item.nome !== '');
                }

                const BACKEND_BASE = 'https://projeto-clubyx.onrender.com';
                const normalizeUrl = (url) => {
                    if (!url) return '';
                    const u = String(url).trim();
                    if (!u) return '';
                    if (u.startsWith('http')) return u;
                    return `${BACKEND_BASE}/${u.replace(/^\/+/, '')}`;
                };

                const normalized = listaFinal.map((it) => ({ ...it, foto: normalizeUrl(it.foto) }));
                console.log('Integrantes normalizados (com foto):', normalized);
                setIntegrantes(normalized);
            } catch (error) {
                console.error('Erro ao buscar integrantes:', error);
                setError(
                    idioma === 'en'
                        ? 'Could not load team members data.'
                        : 'Não foi possível carregar os dados dos integrantes.'
                );
            } finally {
                setLoading(false);
            }
        };

        carregarIntegrantes();
    }, [idioma]);

    const en = idioma === 'en';

    const t = {
        loading: en ? 'Loading about page...' : 'Carregando sobre...',

        pageTitle: en ? 'About the Project' : 'Sobre o Projeto',
        pageDesc: en
            ? 'This project was developed by a team of students with the goal of deepening the study of the work Posthumous Memoirs of Brás Cubas, written by Machado de Assis, using digital resources and interactive methodologies.'
            : 'Este projeto foi desenvolvido por uma equipe de estudantes com o objetivo de aprofundar o estudo da obra Memórias Póstumas de Brás Cubas, escrita por Machado de Assis, utilizando recursos digitais e metodologias interativas.',

        equipe: en ? 'Team' : 'Equipe',
        integrantesIndisponiveis: en
            ? 'Team members unavailable at the moment.'
            : 'Integrantes indisponíveis no momento.',
        fotoAlt: en ? 'Photo of' : 'Foto de',

        objetivoTitulo: en ? 'Project Objective' : 'Objetivo do projeto',
        objetivoP1: en
            ? 'The Book Club is a collaborative digital platform developed as the 2026 Integrative Project. Our primary objective is to create a tool that unites technology and education, helping students prepare for college entrance exams (ENEM, FUVEST, Unicamp) through interactive and structured content.'
            : 'O Clube do Livro é uma plataforma digital colaborativa desenvolvida como Projeto Integrador de 2026. O nosso objetivo primordial é criar uma ferramenta que una tecnologia e educação, auxiliando estudantes na preparação para os vestibulares (ENEM, FUVEST, Unicamp) através de conteúdos interativos e estruturados.',
        objetivoP2: en
            ? 'The great differentiator of this project is its interdisciplinarity and collaboration. The system meets the requirements of Systems Development (with REST API consumption and PostgreSQL modeling), while also deepening competencies in Portuguese Language through literary analysis and in English, ensuring bilingual support for the platform.'
            : 'O grande diferencial deste projeto é a sua interdisciplinaridade e colaboração. O sistema atende aos requisitos de Desenvolvimento de Sistemas (com consumo de apis REST e modelagem em PostgreSQL), ao mesmo tempo em que aprofunda as competências de Língua Portuguesa na análise literária e de Inglês, garantindo o suporte bilíngue à plataforma.',
    };

    return (
        <>
            <Header />

            <div
                className="aobra-page"
                style={{
                    backgroundColor: '#F4EFE6',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <main className="main-content" style={{ flex: 1 }}>
                    {loading ? (
                        <LoadingBook title={t.loading} />
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="sobre-container">
                            <div className="page-header">
                                <h1>{t.pageTitle}</h1>
                                <p>{t.pageDesc}</p>
                            </div>

                            <div className="sobre-content">
                                <div className="equipe-card">
                                    <h2>{t.equipe}</h2>
                                    <div className="equipe-list">
                                        {integrantes.length > 0 ? (
                                            <div className="grid-personagens">
                                                {integrantes.map((membro, index) => (
                                                    <div className="personagem-card" key={index}>
                                                        {membro.foto ? (
                                                            <img
                                                                className="personagem-photo"
                                                                src={membro.foto}
                                                                alt={`${t.fotoAlt} ${membro.nome}`}
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="personagem-initials">
                                                                {(
                                                                    (membro.nome || '')
                                                                        .split(' ')
                                                                        .map((n) => n[0])
                                                                        .filter(Boolean)
                                                                        .slice(0, 2)
                                                                        .join('') || '?'
                                                                ).toUpperCase()}
                                                            </div>
                                                        )}

                                                        <div className="personagem-info">
                                                            <p className="nome-integrante">
                                                                {membro.nome}
                                                            </p>
                                                            {membro.curso && (
                                                                <span className="curso-integrante">
                                                                    {membro.curso}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>{t.integrantesIndisponiveis}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="objetivo-section">
                                    <h2>{t.objetivoTitulo}</h2>
                                    <p>{t.objetivoP1}</p>
                                    <p>{t.objetivoP2}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </>
    );
}