import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Vestibular.css';

export default function Vestibular() {
    return (
        <div
            style={{
                backgroundColor: '#F4EFE6',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Header />
            <main className="vestibular-container">
                <div className="page-header">
                    <h1>Dicas de Vestibular</h1>
                    <p>
                        Domine Memórias Póstumas de Brás Cubas. Explore o que as bancas exigem, a
                        visão crítica da nossa equipe e aprenda a usar a obra como um poderoso
                        repertório sociocultural na sua redação.
                    </p>
                </div>

                <section>
                    <h2 className="titulo-secao">Foco nas Provas</h2>
                    <div className="foco-vestibular">
                        <div className="topico-card">
                            <h3>A Inovação Narrativa</h3>
                            <ul>
                                <li>
                                    <strong>O Defunto Autor:</strong> Diferente de um "autor
                                    defunto", Brás Cubas já morreu e, por isso, está livre das
                                    convenções sociais para dizer a verdade nua e crua.
                                </li>
                                <li>
                                    <strong>Metalinguagem:</strong> O narrador dialoga diretamente
                                    com o leitor o tempo todo (quebra da quarta parede), criticando
                                    quem o lê ou explicando como decidiu escrever o livro.
                                </li>
                                <li>
                                    <strong>Não Confiabilidade:</strong> Brás tenta justificar as
                                    suas falhas o tempo todo. O leitor atento do vestibular não deve
                                    confiar na versão bondosa que ele tenta vender de si mesmo.
                                </li>
                            </ul>
                        </div>
                        <div className="topico-card">
                            <h3>Crítica Social (Realismo)</h3>
                            <ul>
                                <li>
                                    <strong>O Homem Medíocre:</strong> Brás Cubas representa a elite
                                    escravocrata do século XIX: teve dinheiro, educação na Europa,
                                    mas nunca produziu nada de útil.
                                </li>
                                <li>
                                    <strong>As Relações por Interesse:</strong> Casamentos e amores
                                    na obra (como Virgília e Marcela) são pautados por status social
                                    e dinheiro, e não por afeto.
                                </li>
                                <li>
                                    <strong>O Privilégio:</strong> A cena do escravo Prudêncio (que
                                    compra o seu próprio escravo após ser liberto) é muito cobrada
                                    para mostrar como a violência estava enraizada na sociedade.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="titulo-secao">A Visão da Nossa Equipe</h2>
                    <div className="interpretacao-box">
                        <h3>O "Emplasto" Contemporâneo</h3>
                        <p>
                            Durante as nossas análises no Projeto Integrador, a nossa equipe chegou
                            a uma conclusão central: Brás Cubas não é apenas um retrato do século
                            XIX, ele é o espelho de comportamentos que ainda vemos hoje.
                        </p>

                        <p>
                            A maior ironia do livro é o "Emplasto Brás Cubas". Brás queria criar um
                            remédio para a melancolia da humanidade, mas o seu verdadeiro objetivo
                            não era ajudar as pessoas, e sim ver o seu nome estampado nas farmácias
                            e nos jornais. Sob a nossa ótica, isso representa a extrema vaidade
                            humana e a busca vazia por reconhecimento (os famosos "15 minutos de
                            fama"), algo muito semelhante à atual cultura das redes sociais, onde a
                            aparência de fazer o bem importa mais do que a ação em si.
                        </p>

                        <p>
                            O livro ensina-nos que uma sociedade baseada apenas no privilégio, onde
                            as pessoas herdam tudo e não precisam se esforçar por nada, tende a
                            produzir indivíduos entediados, vazios e cínicos.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="titulo-secao">Temas de Redação (Repertório)</h2>
                    <p className="subtitulo-redacao">
                        Domine Memórias Póstumas de Brás Cubas. Explore o que as bancas exigem, a
                        visão crítica da nossa equipa e aprenda a usar a obra como um poderoso
                        repertório sociocultural na sua redação.
                    </p>

                    <div className="temas-grid">
                        <div className="tema-redacao">
                            <h3>
                                Tema: A vaidade e a busca incessante por status na sociedade
                                contemporânea.
                            </h3>
                            <h4>Como usar o livro:</h4>
                            <p>
                                Na introdução ou desenvolvimento, cite o Emplasto Brás Cubas. Pode
                                argumentar que, assim como o personagem machadiano buscava inventar
                                um remédio apenas pela glória de ter o seu nome reconhecido, grande
                                parte da sociedade atual pauta as suas ações na busca por likes e
                                status, esvaziando o sentido real da empatia e do trabalho.
                            </p>
                        </div>

                        <div className="tema-redacao">
                            <h3>
                                Tema: O privilégio e a perpetuação das desigualdades sociais no
                                Brasil.
                            </h3>
                            <h4>Como usar o livro:</h4>
                            <p>
                                Utilize a figura do próprio Brás Cubas como exemplo de privilégio
                                herdado. Pode comparar a "vida parasitária" da elite brasileira do
                                século XIX — que não precisava trabalhar e vivia das riquezas
                                geradas pelos escravos — com a atual concentração de renda no
                                Brasil. O "menino diabo" que maltratava os escravos reflete como a
                                educação e o ambiente perpetuam a desigualdade.
                            </p>
                        </div>

                        <div className="tema-redacao tema-card-full">
                            <h3>Tema: A superficialidade e a liquidez das relações afetivas.</h3>
                            <h4>Como usar o livro:</h4>
                            <p>
                                Faça um paralelo com a personagem Marcela ("amou-me durante quinze
                                meses e onze contos de réis") ou com Virgília (que preferiu a
                                segurança social ao lado de Lobo Neves a fugir com Brás). O livro
                                serve perfeitamente como repertório para ilustrar como as relações
                                humanas, muitas vezes, são baseadas em contratos sociais de
                                conveniência e bens materiais, e não em conexões emocionais
                                genuínas.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
