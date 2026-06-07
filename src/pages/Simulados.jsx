import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingBook from "../components/LoadingBook";
import "../styles/Simulados.css";

const API_BASE = "https://projeto-clubyx.onrender.com";
const API_HEADERS = { "x-api-key": "Clubyx_dev" };

export default function Simulados() {
  const [livro, setLivro] = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [simuladoConcluido, setSimuladoConcluido] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "pt");

  useEffect(() => {
    const atualizarIdioma = () => {
      setIdioma(localStorage.getItem("idioma") || "pt");
    };
    window.addEventListener("idiomaAlterado", atualizarIdioma);
    return () => window.removeEventListener("idiomaAlterado", atualizarIdioma);
  }, []);

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

        setLivro(Array.isArray(dataSimulados) ? dataSimulados[0] : dataSimulados);
        setQuestoes(Array.isArray(dataQuestoes) ? dataQuestoes : [dataQuestoes]);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError(
          idioma === "en"
            ? "Could not load quiz data."
            : "Não foi possível carregar os dados."
        );
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [idioma]);

  const en = idioma === "en";

  const t = {
    loading: en ? "Loading quizzes..." : "Carregando simulados...",

    nomeSimulado: en
      ? livro?.nomeSimuladoIng || livro?.nome
      : livro?.nome || "Nome indisponível no momento.",
    resumoSimulado: en
      ? livro?.resumoSimuladoIng || livro?.resumo
      : livro?.resumo || "Resumo indisponível no momento.",

    questao: en ? "Question" : "Questão",
    de: en ? "of" : "de",
    enunciadoIndisponivel: en
      ? "Statement unavailable at the moment."
      : "Enunciado indisponível no momento.",
    alternativaIndisponivel: en ? "Option unavailable." : "Alternativa indisponível.",

    anterior: en ? "← Previous Question" : "← Questão Anterior",
    proxima: en ? "Next Question →" : "Próxima Questão →",
    finalizar: en ? "Finish Quiz ✓" : "Finalizar Simulado ✓",

    concluido: en ? "Quiz Completed! 🎉" : "Simulado Concluído! 🎉",
    voceAcertou: en ? "You got" : "Você acertou",
    de2: en ? "out of" : "de",
    questoes: en ? "questions." : "questões.",
    aproveitamento: en ? "% Success Rate" : "% de Aproveitamento",
    gabarito: en ? "📋 Review Answer Key:" : "📋 Gabarito de Revisão:",
    questaoLabel: en ? "Question" : "Questão",
    suaResposta: en ? "👉 Your answer:" : "👉 Sua resposta:",
    respostaCorreta: en ? "✅ Correct answer:" : "✅ Resposta correta:",
    naoRespondida: en ? "Not answered" : "Não respondida",
    naoDisponivel: en ? "N/A" : "N/A",
    refazer: en ? "Retake Quiz" : "Refazer Simulado",
  };

  const questaoAtual = questoes[indiceAtual] || null;

  const irParaAnterior = () => setIndiceAtual((prev) => Math.max(prev - 1, 0));
  const irParaProxima = () =>
    setIndiceAtual((prev) => Math.min(prev + 1, questoes.length - 1));

  const handleAlternativaClick = (questaoIndex, alternativaIndex) => {
    if (respostas[questaoIndex] !== undefined) return;
    const alternativa = questoes[questaoIndex]?.alternativas?.[alternativaIndex];
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

  const getEnunciado = (q) =>
    en ? q?.enunciadoIng || q?.enunciado : q?.enunciado;

  const getExplicacao = (q) =>
    en ? q?.explicacaoIng || q?.explicacao : q?.explicacao;

  const getTextoAlternativa = (alt) =>
    en ? alt?.questaoIng || alt?.texto : alt?.texto;

  return (
    <>
      <Header />

      {loading ? (
        <div className="aobra-page">
          <main className="main-content">
            <LoadingBook title={t.loading} />
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
            // ── Tela de resultado ────────────────────────────────────────
            <main className="content">
              <h2>{t.concluido}</h2>
              <p style={{ fontSize: "1.2rem" }}>
                {t.voceAcertou} <strong>{pontuacao}</strong> {t.de2}{" "}
                <strong>{questoes.length}</strong> {t.questoes}
              </p>
              <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "15px 0" }}>
                {((pontuacao / questoes.length) * 100).toFixed(0)}{t.aproveitamento}
              </p>

              <h3 style={{ marginTop: "30px" }}>{t.gabarito}</h3>
              <div style={{ width: "100%", marginTop: "10px" }}>
                {questoes.map((q, idx) => {
                  const resp = respostas[idx];
                  const respondida = resp !== undefined;
                  const acertou = resp?.correta || false;
                  const altCorreta = q.alternativas?.find((a) => a.correta);
                  const altEscolhida = respondida
                    ? getTextoAlternativa(q.alternativas?.[resp.index])
                    : t.naoRespondida;
                  const explicacao = getExplicacao(q);

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
                        <strong>{t.questaoLabel} {idx + 1}:</strong>{" "}
                        {getEnunciado(q) || t.enunciadoIndisponivel}
                      </p>
                      <p style={{ margin: "5px 0 0 0" }}>
                        {t.suaResposta}{" "}
                        <strong style={{ color: acertou ? "green" : "red" }}>
                          {altEscolhida}
                        </strong>
                      </p>
                      <p style={{ margin: "2px 0 0 0" }}>
                        {t.respostaCorreta}{" "}
                        <strong style={{ color: "green" }}>
                          {getTextoAlternativa(altCorreta) || t.naoDisponivel}
                        </strong>
                      </p>
                      {explicacao && (
                        <p style={{ fontStyle: "italic", marginTop: "8px", fontSize: "0.9rem", color: "#555" }}>
                          💡 {explicacao}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="next-button-container">
                <button className="next-button" onClick={reiniciarSimulado}>
                  {t.refazer}
                </button>
              </div>
            </main>
          ) : (
            // ── Tela do simulado ─────────────────────────────────────────
            <>
              <section className="hero">
                <h1 className="texto-formatado">{t.nomeSimulado}</h1>
                <p className="texto-formatado">{t.resumoSimulado}</p>
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
                          backgroundColor: ativa ? "#333" : respondida ? "#4caf50" : "#fff",
                          color: ativa || respondida ? "#fff" : "#333",
                          borderColor: ativa ? "#333" : respondida ? "#4caf50" : "#ccc",
                        }}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Questão atual */}
                <h2>
                  {t.questao} {indiceAtual + 1} {t.de} {questoes.length}
                </h2>

                <h4 className="texto-formatado">
                  {getEnunciado(questaoAtual) || t.enunciadoIndisponivel}
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
                        className = "correcta";
                      }
                    }

                    return (
                      <button
                        key={altIndex}
                        onClick={() => handleAlternativaClick(indiceAtual, altIndex)}
                        className={className}
                        disabled={foiRespondida}
                      >
                        {getTextoAlternativa(alt) || t.alternativaIndisponivel}
                      </button>
                    );
                  })}
                </div>

                {/* Navegação */}
                <div
                  className="next-button-container"
                  style={{ display: "flex", gap: "12px", justifyContent: "center" }}
                >
                  <button
                    className="next-button"
                    onClick={irParaAnterior}
                    disabled={indiceAtual === 0}
                    style={{ opacity: indiceAtual === 0 ? 0.4 : 1 }}
                  >
                    {t.anterior}
                  </button>

                  {indiceAtual < questoes.length - 1 ? (
                    <button className="next-button" onClick={irParaProxima}>
                      {t.proxima}
                    </button>
                  ) : (
                    <button className="next-button" onClick={finalizarSimulado}>
                      {t.finalizar}
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