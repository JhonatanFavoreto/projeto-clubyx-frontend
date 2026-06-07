import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingBook from "../components/LoadingBook";
import "../styles/Vestibular.css";

export default function ConteudosResumos() {
  const [conteudo, setConteudo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const carregarConteudo = async () => {
      try {
        const response = await fetch(
          "https://projeto-clubyx.onrender.com/conteudo",
          {
            headers: {
              "x-api-key": "Clubyx_dev",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Erro retornado por /conteudo:", errorText);
          throw new Error(`Erro ${response.status} ao buscar /conteudo`);
        }

        const data = await response.json();
        console.log("Resposta de /conteudo:", data);

        let listaFinal = [];

        if (Array.isArray(data)) {
          listaFinal = data
            .map((item) => ({
              materia: item.materia ? item.materia.trim() : "",
              resumo: item.resumo ? item.resumo.trim() : "",
              dicas: item.dicas ? item.dicas.trim() : "",
              analises: item.analises ? item.analises.trim() : "",
              curiosidades: item.curiosidades ? item.curiosidades.trim() : "",
              videoAulas: item.videoAulas ? item.videoAulas.trim() : "",
              // campos em inglês
              materiaIng: item.materiaIng ? item.materiaIng.trim() : "",
              resumoConteudoIng: item.resumoConteudoIng ? item.resumoConteudoIng.trim() : "",
              dicasIng: item.dicasIng ? item.dicasIng.trim() : "",
              analisesIng: item.analisesIng ? item.analisesIng.trim() : "",
              curiosidadesIng: item.curiosidadesIng ? item.curiosidadesIng.trim() : "",
            }))
            .filter((item) => item.materia !== "");
        } else if (data?.materia) {
          const materias = data.materia.split(",").map((n) => n.trim());
          const resumos = data.resumo ? data.resumo.split(",").map((c) => c.trim()) : [];
          const dicas = data.dicas ? data.dicas.split(",").map((c) => c.trim()) : [];
          const analises = data.analises ? data.analises.split(",").map((c) => c.trim()) : [];
          const curiosidades = data.curiosidades ? data.curiosidades.split(",").map((c) => c.trim()) : [];

          listaFinal = materias
            .map((materia, index) => ({
              materia,
              resumo: resumos[index] || data.resumo || "",
              dicas: dicas[index] || data.dicas || "",
              analises: analises[index] || data.analises || "",
              curiosidades: curiosidades[index] || data.curiosidades || "",
              videoAulas: "",
              materiaIng: "",
              resumoConteudoIng: "",
              dicasIng: "",
              analisesIng: "",
              curiosidadesIng: "",
            }))
            .filter((item) => item.materia !== "");
        }

        setConteudo(listaFinal);
      } catch (error) {
        console.error("Erro ao buscar conteudo:", error);
        setError(
          idioma === "pt"
            ? "Não foi possível carregar os dados dos conteúdos e resumos."
            : "Could not load content and summaries data."
        );
      } finally {
        setLoading(false);
      }
    };

    carregarConteudo();
  }, [idioma]);

  // Helpers para pegar o campo no idioma correto
  const getMateria = (item) =>
    idioma === "en" ? item.materiaIng || item.materia : item.materia;

  const getResumo = (item) =>
    idioma === "en" ? item.resumoConteudoIng || item.resumo : item.resumo;

  const getDicas = (item) =>
    idioma === "en" ? item.dicasIng || item.dicas : item.dicas;

  const getAnalises = (item) =>
    idioma === "en" ? item.analisesIng || item.analises : item.analises;

  const getCuriosidades = (item) =>
    idioma === "en" ? item.curiosidadesIng || item.curiosidades : item.curiosidades;

  return (
    <>
      <Header />

      <div className="vestibular-page">
        <main className="main-content">
          {loading ? (
            <LoadingBook
              title={idioma === "pt" ? "Carregando conteúdos..." : "Loading content..."}
            />
          ) : (
            <>
              <section className="section-header">
                <div className="hero-conteudo">
                  <div className="hero-topo">
                    <div>
                      <p className="hero-etiqueta">
                        {idioma === "pt" ? "Vestibular" : "College Entrance"}
                      </p>
                      <h1 className="title-main">
                        {idioma === "pt" ? "Conteúdos e Resumos" : "Content & Summaries"}
                      </h1>
                    </div>
                  </div>
                  <p className="subtitle-main">
                    {idioma === "pt"
                      ? "Explore os resumos focados nas principais matérias e tópicos exigidos nos vestibulares, analisados pela nossa equipe."
                      : "Explore summaries focused on the main subjects and topics required in college entrance exams, analyzed by our team."}
                  </p>
                </div>
              </section>

              {error ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>{error}</p>
                </div>
              ) : (
                <section>
                  <div className="temas-grid">
                    {conteudo.length > 0 ? (
                      conteudo.map((item, index) => (
                        <div className="obra-bloco" key={index}>
                          <h3
                            className="title-section"
                            style={{ textAlign: "left", fontSize: "2rem" }}
                          >
                            {getMateria(item)}
                          </h3>

                          <div className="conteudo-grid">
                            {/* CONTAINER 1: RESUMO E ANÁLISES */}
                            <div className="bloco-conteudo-principal">
                              {getResumo(item) && (
                                <div className="sub-bloco-info">
                                  <h4 className="hero-etiqueta" style={{ marginBottom: "0.5rem" }}>
                                    {idioma === "pt" ? "Resumo" : "Summary"}
                                  </h4>
                                  <p className="texto-formatado">{getResumo(item)}</p>
                                </div>
                              )}

                              {getAnalises(item) && (
                                <div className="sub-bloco-info" style={{ marginTop: "1.5rem" }}>
                                  <h4 className="hero-etiqueta" style={{ marginBottom: "0.5rem" }}>
                                    {idioma === "pt" ? "Análises" : "Analysis"}
                                  </h4>
                                  <p className="texto-formatado">{getAnalises(item)}</p>
                                </div>
                              )}
                            </div>

                            {/* CONTAINER 2: DICAS E CURIOSIDADES */}
                            {(getDicas(item) || getCuriosidades(item)) && (
                              <div className="bloco-conteudo-dicas">
                                {getDicas(item) && (
                                  <div className="sub-bloco-info">
                                    <h4 className="hero-etiqueta" style={{ marginBottom: "0.5rem" }}>
                                      {idioma === "pt" ? "Dicas" : "Tips"}
                                    </h4>
                                    <p className="texto-formatado">{getDicas(item)}</p>
                                  </div>
                                )}

                                {getCuriosidades(item) && (
                                  <div className="sub-bloco-info" style={{ marginTop: "1.5rem" }}>
                                    <h4 className="hero-etiqueta" style={{ marginBottom: "0.5rem" }}>
                                      {idioma === "pt" ? "Curiosidades" : "Fun Facts"}
                                    </h4>
                                    <p className="texto-formatado">{getCuriosidades(item)}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ textAlign: "center", width: "100%" }}>
                        {idioma === "pt"
                          ? "Nenhum conteúdo ou resumo disponível no momento."
                          : "No content or summaries available at the moment."}
                      </p>
                    )}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}