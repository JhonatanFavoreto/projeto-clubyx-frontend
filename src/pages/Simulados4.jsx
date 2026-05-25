import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingBook from "../components/LoadingBook";
import "../styles/Simulados.css";

export default function AObra() {
  const [livro, setLivro] = useState(null);
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respostas, setRespostas] = useState({});

  const navigate = useNavigate();

  const proximaPagina = () => {
    navigate("/simulados5");
  };

  const paginaAnterior = () => {
    navigate("/simulados");
  };

  const handleAlternativaClick = (questaoIndex, alternativaIndex) => {
    if (respostas[questaoIndex]) return; // Já foi respondida

    const alternativa =
      questoes[questaoIndex]?.alternativas?.[alternativaIndex];
    if (alternativa) {
      setRespostas({
        ...respostas,
        [questaoIndex]: {
          index: alternativaIndex,
          correta: alternativa.correta || false,
        },
      });
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resSimulados, resQuestoes] = await Promise.all([
          fetch("https://projeto-clubyx.onrender.com/simulados", {
            headers: { "x-api-key": "Clubyx_dev" },
          }),
          fetch("https://projeto-clubyx.onrender.com/questoes", {
            headers: { "x-api-key": "Clubyx_dev" },
          }),
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
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <div className="aobra-page">
          <main className="main-content">
            <LoadingBook
              title="Carregando simulados"
              message="Aguarde enquanto carregamos as questões."
            />
          </main>
        </div>
      ) : (
        <div className="simulados-page">
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <section className="hero">
                <h1 className="texto-formatado">
                  {livro?.nome || "Nome indisponivel no momento."}
                </h1>

                <p className="texto-formatado">
                  {livro?.resumo || "Resumo indisponivel no momento."}
                </p>
              </section>

              <main className="content">
                <h2>Questão 04</h2>

                <h4 className="texto-formatado">
                  {questoes[3]?.enunciado ||
                    "Enunciado indisponivel no momento."}
                </h4>

                <div className="options">
                  <button
                    onClick={() => handleAlternativaClick(3, 0)}
                    className={`${
                      respostas[3]?.index === 0
                        ? respostas[3]?.correta
                          ? "correcta"
                          : "incorreta"
                        : ""
                    }`}
                    disabled={!!respostas[3]}
                  >
                    {questoes[3]?.alternativas?.[0]?.texto ||
                      "Enunciado indisponível no momento."}
                  </button>
                  <button
                    onClick={() => handleAlternativaClick(3, 1)}
                    className={`${
                      respostas[3]?.index === 1
                        ? respostas[3]?.correta
                          ? "correcta"
                          : "incorreta"
                        : ""
                    }`}
                    disabled={!!respostas[3]}
                  >
                    {questoes[3]?.alternativas?.[1]?.texto ||
                      "Enunciado indisponível no momento."}
                  </button>
                  <button
                    onClick={() => handleAlternativaClick(3, 2)}
                    className={`${
                      respostas[3]?.index === 2
                        ? respostas[3]?.correta
                          ? "correcta"
                          : "incorreta"
                        : ""
                    }`}
                    disabled={!!respostas[3]}
                  >
                    {questoes[3]?.alternativas?.[2]?.texto ||
                      "Enunciado indisponível no momento."}
                  </button>
                  <button
                    onClick={() => handleAlternativaClick(3, 3)}
                    className={`${
                      respostas[3]?.index === 3
                        ? respostas[3]?.correta
                          ? "correcta"
                          : "incorreta"
                        : ""
                    }`}
                    disabled={!!respostas[3]}
                  >
                    {questoes[3]?.alternativas?.[3]?.texto ||
                      "Enunciado indisponível no momento."}
                  </button>
                </div>

                <div className="buttons-container">
                  <button className="back-button" onClick={paginaAnterior}>
                    ← Voltar
                  </button>

                  <button className="next-button" onClick={proximaPagina}>
                    Próxima questão →
                  </button>
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
