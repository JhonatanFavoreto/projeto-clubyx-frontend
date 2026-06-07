import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingBook from "../components/LoadingBook";
import "../styles/Home.css";

export default function Home() {
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "pt");

  useEffect(() => {
    const atualizarIdioma = () => {
      setIdioma(localStorage.getItem("idioma") || "pt");
    };

    window.addEventListener("idiomaAlterado", atualizarIdioma);

    return () => {
      window.removeEventListener("idiomaAlterado", atualizarIdioma);
    };
  }, []);

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const response = await fetch(
          "https://projeto-clubyx.onrender.com/livros",
          {
            headers: {
              "x-api-key": "Clubyx_dev",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Erro retornado por /livros:", errorText);
          throw new Error(`Erro ${response.status} ao buscar /livros`);
        }

        const data = await response.json();
        console.log("Resposta de /livros:", data);
        setLivro(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setError("Não foi possível carregar os dados do livro.");
      } finally {
        setLoading(false);
      }
    };

    carregarLivros();
  }, [idioma]);

  const nomeLivro = idioma === "en"
    ? livro?.nomeIng || livro?.nome
    : livro?.nome;

  // Textos fixos traduzidos
  const t = {
    loadingHome: idioma === "pt" ? "Carregando a página inicial..." : "Loading home page...",

    heroSubtitle: idioma === "pt"
      ? '"Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas."'
      : '"To the worm that first gnawed the cold flesh of my corpse, I dedicate, as a fond remembrance, these posthumous memoirs."',

    btnComeCar: idioma === "pt" ? "Começar os Estudos" : "Start Studying",

    secTecTitle: idioma === "pt"
      ? "Onde a Tecnologia Encontra a Literatura"
      : "Where Technology Meets Literature",

    secTecP1: idioma === "pt"
      ? "O Clube do Livro é uma plataforma digital colaborativa que nasce da união entre tecnologia e literatura. Desenvolvido em parceria pelos alunos de Desenvolvimento de Sistemas (SENAI) e as áreas de Língua Portuguesa e Inglês (SESI), nosso objetivo principal é transformar e facilitar a preparação para os vestibulares."
      : "The Book Club is a collaborative digital platform born from the union of technology and literature. Developed in partnership by students from Systems Development (SENAI) and the Portuguese and English departments (SESI), our main goal is to transform and facilitate college entrance exam preparation.",

    secTecP2: idioma === "pt"
      ? "Através de um ambiente interativo e totalmente bilíngue, oferecemos análises literárias, simulados e conteúdos multimídia focados nos maiores clássicos nacionais. É uma ferramenta inovadora construída de alunos para alunos, promovendo o aprendizado interdisciplinar e o trabalho em equipe."
      : "Through an interactive and fully bilingual environment, we offer literary analyses, mock exams, and multimedia content focused on the greatest national classics. It is an innovative tool built by students for students, promoting interdisciplinary learning and teamwork.",

    secNavTitle: idioma === "pt" ? "Navegue pela Plataforma" : "Explore the Platform",

    cardObra: idioma === "pt" ? "A Obra" : "The Work",
    cardObraDesc: idioma === "pt"
      ? "Resumo, personagens e contexto histórico."
      : "Summary, characters and historical context.",

    cardBiblioteca: idioma === "pt" ? "Biblioteca" : "Library",
    cardBibliotecaDesc: idioma === "pt"
      ? "Conheça as obras estudadas pelas outras equipes."
      : "Discover the works studied by other teams.",

    cardVestibular: idioma === "pt" ? "Vestibular" : "College Entrance",
    cardVestibularDesc: idioma === "pt"
      ? "Dicas, interpretação e possíveis temas de redação."
      : "Tips, interpretation and possible essay topics.",

    cardVideoaulas: idioma === "pt" ? "Videoaulas" : "Video Lessons",
    cardVideoaulasDesc: idioma === "pt"
      ? "Conteúdos exclusivos gravados pela equipe."
      : "Exclusive content recorded by the team.",

    cardCuriosidades: idioma === "pt" ? "Curiosidades" : "Fun Facts",
    cardCuriosidadesDesc: idioma === "pt"
      ? "Explore curiosidades sobre Machado de Assis e os bastidores históricos deste clássico."
      : "Explore curiosities about Machado de Assis and the historical background of this classic.",

    cardSobre: idioma === "pt" ? "Sobre" : "About",
    cardSobreDesc: idioma === "pt"
      ? "Conheça a equipe do SENAI e SESI por trás do projeto, e a plataforma."
      : "Meet the SENAI and SESI team behind the project and the platform.",

    cardSimulados: idioma === "pt" ? "Simulados" : "Mock Exams",
    cardSimuladosDesc: idioma === "pt"
      ? "Simulados para testar o seu conhecimento com base no livro."
      : "Mock exams to test your knowledge based on the book.",

    secProjetoTitle: idioma === "pt" ? "Projeto Integrador 2026" : "Integrative Project 2026",
    secProjetoDesc: idioma === "pt"
      ? "Esta plataforma digital colaborativa foi desenvolvida pelas turmas de Desenvolvimento de Sistemas (SENAI) em parceria com Língua Portuguesa e Inglês (SESI). Nosso objetivo principal é unir tecnologia e literatura para criar uma ferramenta bilíngue e auxiliar os estudantes na preparação para os vestibulares, promovendo um aprendizado interdisciplinar e colaborativo."
      : "This collaborative digital platform was developed by the Systems Development classes (SENAI) in partnership with Portuguese and English (SESI). Our main goal is to unite technology and literature to create a bilingual tool and help students prepare for college entrance exams, promoting interdisciplinary and collaborative learning.",
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="aobra-page">
          <main className="main-content">
            <LoadingBook title={t.loadingHome} />
          </main>
        </div>
      ) : (
        <>
          <section className="hero-section" id="home">
            <h1>
              {error ? "Memórias Póstumas de Brás Cubas" : nomeLivro || "A Obra"}
            </h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <button className="btn-primario" onClick={() => navigate("/obra")}>
              {t.btnComeCar}
            </button>
          </section>

          <section className="secao-tecnologia" id="obra">
            <h2>{t.secTecTitle}</h2>
            <p>{t.secTecP1}</p>
            <p>{t.secTecP2}</p>
          </section>

          <section className="secao-navegacao" id="biblioteca">
            <h2>{t.secNavTitle}</h2>
            <div className="cards-grid">
              <Link to="/obra" className="card">
                <h3>{t.cardObra}</h3>
                <p>{t.cardObraDesc}</p>
              </Link>

              <Link to="/biblioteca" className="card">
                <h3>{t.cardBiblioteca}</h3>
                <p>{t.cardBibliotecaDesc}</p>
              </Link>

              <Link to="/vestibular" className="card">
                <h3>{t.cardVestibular}</h3>
                <p>{t.cardVestibularDesc}</p>
              </Link>

              <Link to="/videoaulas" className="card">
                <h3>{t.cardVideoaulas}</h3>
                <p>{t.cardVideoaulasDesc}</p>
              </Link>

              <Link to="/curiosidades" className="card">
                <h3>{t.cardCuriosidades}</h3>
                <p>{t.cardCuriosidadesDesc}</p>
              </Link>

              <Link to="/sobre" className="card">
                <h3>{t.cardSobre}</h3>
                <p>{t.cardSobreDesc}</p>
              </Link>

              <Link to="/simulados" className="card card-simulados">
                <h3>{t.cardSimulados}</h3>
                <p>{t.cardSimuladosDesc}</p>
              </Link>
            </div>
          </section>

          <section className="secao-projeto">
            <h2>{t.secProjetoTitle}</h2>
            <p>{t.secProjetoDesc}</p>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}