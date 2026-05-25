import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingBook from "../components/LoadingBook";
import "../styles/Simulados.css";

const API_BASE = "https://projeto-clubyx.onrender.com";
const API_HEADERS = { "x-api-key": "Clubyx_dev" };

export default function AObra() {
  const [livro, setLivro] = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado do simulado (igual ao primeiro código)
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [simuladoConcluido, setSimuladoConcluido] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  // ─── Carregamento da API ──────────────────────────────────────────────────
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resSimulados, resQuestoes] = await Promise.all([
          fetch(`${API_BASE}/simulados`, { headers: API_HEADERS }),
          fetch(`${API_BASE}/questoes`, { headers: API_HEADERS }),
        ]);

        if (!resSimulados.ok)
          throw new Error(`Erro ${resSimulados.status} ao buscar /simulados`);
        if (!resQuestoes.ok)
          throw new Error(`Erro ${resQuestoes.status} ao buscar /questoes`);

        const dataSimulados = await resSimulados.json();
        const dataQuestoes = await resQuestoes.json();
        console.log("DADOS DA API:", dataQuestoes);

        setLivro(
          Array.isArray(dataSimulados) ? dataSimulados[0] : dataSimulados,
        );
        setQuestoes(
          Array.isArray(dataQuestoes) ? dataQuestoes : [dataQuestoes],
        );
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  // ─── Lógica do simulado (do primeiro código) ──────────────────────────────
  const questaoAtual = questoes[indiceAtual] || null;

  const irParaAnterior = () => setIndiceAtual((prev) => Math.max(prev - 1, 0));
  const irParaProxima = () =>
    setIndiceAtual((prev) => Math.min(prev + 1, questoes.length - 1));

  const handleAlternativaClick = (questaoIndex, alternativaIndex) => {
    // Não permite trocar resposta já dada
    if (respostas[questaoIndex] !== undefined) return;

    const alternativa =
      questoes[questaoIndex]?.alternativas?.[alternativaIndex];
    if (!alternativa) return;

    setRespostas((prev) => ({
      ...prev,
      [questaoIndex]: {
        index: alternativaIndex,
        correta: alternativa.correta || false,
      },
    }));
  };

  const finalizarSimulado = () => {
    let acertos = 0;
    questoes.forEach((_, idx) => {
      if (respostas[idx]?.correta) acertos++;
    });
    setPontuacao(acertos);
    setSimuladoConcluido(true);
  };

  const reiniciarSimulado = () => {
    setRespostas({});
    setIndiceAtual(0);
    setSimuladoConcluido(false);
    setPontuacao(0);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <Header />

      {loading ? (
        <div className="aobra-page">
          <main className="main-content">
            <LoadingBook
              title="Carregando simulados..."
              message="Estamos abrindo o livro para você."
            />
          </main>
        </div>
      ) : (
        <div className="simulados-page">
          <div className="top-line"></div>

          {error ? (
            <section className="hero">
              <h2>{error}</h2>
            </section>
          ) : simuladoConcluido ? (
            // ── Tela de resultado ──────────────────────────────────────────
            <main className="content">
              <h2>Simulado Concluído! 🎉</h2>
              <p style={{ fontSize: "1.2rem" }}>
                Você acertou <strong>{pontuacao}</strong> de{" "}
                <strong>{questoes.length}</strong> questões.
              </p>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: "15px 0",
                }}
              >
                {((pontuacao / questoes.length) * 100).toFixed(0)}% de
                Aproveitamento
              </p>

              <h3 style={{ marginTop: "30px" }}>📋 Gabarito de Revisão:</h3>
              <div style={{ width: "100%", marginTop: "10px" }}>
                {questoes.map((q, idx) => {
                  const resp = respostas[idx];
                  const respondida = resp !== undefined;
                  const acertou = resp?.correta || false;
                  const altCorreta = q.alternativas?.find((a) => a.correta);
                  const altEscolhida = respondida
                    ? q.alternativas?.[resp.index]?.texto
                    : "Não respondida";

                  return (
                    <div
                      key={q.id || idx}
                      style={{
                        padding: "15px",
                        borderBottom: "1px solid #ddd",
                        marginBottom: "10px",
                        backgroundColor: acertou ? "#e8f5e9" : "#ffebee",
                        borderRadius: "6px",
                        textAlign: "left",
                      }}
                    >
                      <p>
                        <strong>Questão {idx + 1}:</strong>{" "}
                        {q.enunciado || "Enunciado indisponível."}
                      </p>
                      <p style={{ margin: "5px 0 0 0" }}>
                        👉 Sua resposta:{" "}
                        <strong style={{ color: acertou ? "green" : "red" }}>
                          {altEscolhida}
                        </strong>
                      </p>
                      <p style={{ margin: "2px 0 0 0" }}>
                        ✅ Resposta correta:{" "}
                        <strong style={{ color: "green" }}>
                          {altCorreta?.texto || "N/A"}
                        </strong>
                      </p>
                      {q.comentario && (
                        <p
                          style={{
                            fontStyle: "italic",
                            marginTop: "8px",
                            fontSize: "0.9rem",
                            color: "#555",
                          }}
                        >
                          💡 {q.comentario}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="next-button-container">
                <button className="next-button" onClick={reiniciarSimulado}>
                  Refazer Simulado
                </button>
              </div>
            </main>
          ) : (
            // ── Tela do simulado ───────────────────────────────────────────
            <>
              <section className="hero">
                <h1 className="texto-formatado">
                  {livro?.nome || "Nome indisponível no momento."}
                </h1>
                <p className="texto-formatado">
                  {livro?.resumo || "Resumo indisponível no momento."}
                </p>
              </section>

              <main className="content">
                {/* Mapa de questões */}
                <div className="questoes-map">
                  {questoes.map((_, index) => {
                    const respondida = respostas[index] !== undefined;
                    const ativa = index === indiceAtual;
                    return (
                      <button
                        key={index}
                        onClick={() => setIndiceAtual(index)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          border: "2px solid",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                          lineHeight: 1,
                          fontWeight: "bold",
                          cursor: "pointer",
                          backgroundColor: ativa
                            ? "#333"
                            : respondida
                              ? "#4caf50"
                              : "#fff",
                          color: ativa || respondida ? "#fff" : "#333",
                          borderColor: ativa
                            ? "#333"
                            : respondida
                              ? "#4caf50"
                              : "#ccc",
                        }}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Questão atual */}
                <h2>
                  Questão {indiceAtual + 1} de {questoes.length}
                </h2>

                <h4 className="texto-formatado">
                  {questaoAtual?.enunciado ||
                    "Enunciado indisponível no momento."}
                </h4>

                <div className="options">
                  {questaoAtual?.alternativas?.map((alt, altIndex) => {
                    const resp = respostas[indiceAtual];
                    const foiRespondida = resp !== undefined;
                    const estaSelecionada = resp?.index === altIndex;

                    let className = "";
                    if (foiRespondida) {
                      if (estaSelecionada) {
                        className = resp.correta ? "correcta" : "incorreta";
                      } else if (alt.correta) {
                        className = "correcta"; // mostra gabarito após responder
                      }
                    }

                    return (
                      <button
                        key={altIndex}
                        onClick={() =>
                          handleAlternativaClick(indiceAtual, altIndex)
                        }
                        className={className}
                        disabled={foiRespondida}
                      >
                        {alt.texto || "Alternativa indisponível."}
                      </button>
                    );
                  })}
                </div>

                {/* Navegação */}
                <div
                  className="next-button-container"
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="next-button"
                    onClick={irParaAnterior}
                    disabled={indiceAtual === 0}
                    style={{ opacity: indiceAtual === 0 ? 0.4 : 1 }}
                  >
                    ← Questão Anterior
                  </button>

                  {indiceAtual < questoes.length - 1 ? (
                    <button className="next-button" onClick={irParaProxima}>
                      Próxima Questão →
                    </button>
                  ) : (
                    <button className="next-button" onClick={finalizarSimulado}>
                      Finalizar Simulado ✓
                    </button>
                  )}
                </div>
              </main>
            </>
          )}

          <footer className="footer">
            <Footer />
          </footer>
        </div>
      )}
    </>
  );
}
