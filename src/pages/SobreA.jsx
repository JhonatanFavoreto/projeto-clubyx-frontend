import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingBook from "../components/LoadingBook";
import "../styles/Sobre.css";

export default function Sobre() {
  // Agora armazenará um array de objetos: [{ nome: "...", curso: "..." }]
  const [integrantes, setIntegrantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarIntegrantes = async () => {
      try {
        const response = await fetch(
          "https://projeto-clubyx.onrender.com/integrantes",
          {
            headers: {
              "x-api-key": "Clubyx_dev",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.log("Erro retornado por /integrantes:", errorText);
          throw new Error(`Erro ${response.status} ao buscar /integrantes`);
        }

        const data = await response.json();
        console.log("Resposta de /integrantes:", data);

        let listaFinal = [];

        // LÓGICA ATUALIZADA: Extrai NOME e CURSO
        if (Array.isArray(data)) {
          // Se a API retornar um array de objetos (um para cada integrante)
          listaFinal = data
            .map((item) => ({
              nome: item.nome ? item.nome.trim() : "",
              curso: item.curso ? item.curso.trim() : "",
            }))
            .filter((item) => item.nome !== "");
        } else if (data?.nome) {
          // Se a API retornar um único objeto com strings separadas por vírgula
          const nomes = data.nome.split(",").map((n) => n.trim());
          const cursos = data.curso ? data.curso.split(",").map((c) => c.trim()) : [];

          listaFinal = nomes
            .map((nome, index) => ({
              nome: nome,
              // Pega o curso na mesma posição do array, ou usa o único curso disponível
              curso: cursos[index] || data.curso || "",
            }))
            .filter((item) => item.nome !== "");
        }

        setIntegrantes(listaFinal);
      } catch (error) {
        console.error("Erro ao buscar integrantes:", error);
        setError("Não foi possível carregar os dados dos integrantes.");
      } finally {
        setLoading(false);
      }
    };

    carregarIntegrantes();
  }, []);

  return (
    <>
      <Header />

      <div
        className="aobra-page"
        style={{
          backgroundColor: "#F4EFE6",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main className="main-content" style={{ flex: 1 }}>
          {loading ? (
            <LoadingBook title="Carregando sobre..." />
          ) : error ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p>{error}</p>
            </div>
          ) : (
            <div className="sobre-container">
              <div className="page-header">
                <h1>Sobre o Projeto</h1>
                <p>
                  Este projeto foi desenvolvido por uma equipe de estudantes
                  com o objetivo de aprofundar o estudo da obra Memórias
                  Póstumas de Brás Cubas, escrita por Machado de Assis,
                  utilizando recursos digitais e metodologias interativas.
                </p>
              </div>

              <div className="sobre-content">
                <div className="equipe-card">
                  <h2>Equipe</h2>
                  <div className="equipe-list">
                    {integrantes.length > 0 ? (
                      <div className="grid-personagens">
                        {integrantes.map((membro, index) => (
                          <div className="personagem-card" key={index}>
                            <div className="personagem-info">
                              <p className="nome-integrante">{membro.nome}</p>
                              {/* Renderiza o curso apenas se ele existir */}
                              {membro.curso && (
                                <span className="curso-integrante">{membro.curso}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>Integrantes indisponíveis no momento.</p>
                    )}
                  </div>
                </div>

                <div className="objetivo-section">
                  <h2>Objetivo do projeto</h2>
                  <p>
                    O Clube do Livro é uma plataforma digital colaborativa
                    desenvolvida como Projeto Integrador de 2026. O nosso
                    objetivo primordial é criar uma ferramenta que uma
                    tecnologia e educação, auxiliando estudantes na preparação
                    para os vestibulares (ENEM, FUVEST, Unicamp) através de
                    conteúdos interativos e estruturados.
                  </p>
                  <p>
                    O grande diferencial deste projeto é a sua
                    interdisciplinaridade e colaboração. O sistema atende aos
                    requisitos de Desenvolvimento de Sistemas (com consumo de
                    apis REST e modelagem em PostgreSQL), ao mesmo tempo em
                    que aprofunda as competências de Língua Portuguesa na
                    análise literária e de Inglês, garantindo o suporte
                    bilíngue à plataforma.
                  </p>
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
