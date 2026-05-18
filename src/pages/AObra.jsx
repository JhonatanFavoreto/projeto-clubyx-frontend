import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AObra.css';

export default function AObra() {
    useEffect(() => {
        const carregarLivros = async () => {
            try {
                const response = await fetch('https://projeto-clubyx.onrender.com/livros', {
                    headers: {
                        API_KEY: 'Clubyx_dev',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao buscar /livros`);
                }

                const data = await response.json();
                console.log('Resposta de /livros:', data);
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
            }
        };

        carregarLivros();
    }, []);

    return (
        <div className="aobra-page">
            <Header />

            <main className="main-content">
                <section className="section-header">
                    <h1 className="title-main">A Obra: Memórias Póstumas</h1>
                    <p className="subtitle-main">
                        A obra Memórias Póstumas de Brás Cubas, escrita por Machado de Assis e
                        publicada originalmente em 1881, é um marco do realismo na literatura
                        brasileira e uma das narrativas mais inovadoras do século XIX.
                    </p>
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Resumo sobre o livro</h2>
                    <p>
                        Narrado em primeira pessoa após a sua morte, Brás Cubas decide escrever sua
                        autobiografia com uma honestidade brutal e cínica, livre das amarras morais
                        da sociedade. O livro narra desde sua infância como um "menino diabo",
                        passando por seus romances frustrados com a cortesã Marcela e com Virgília
                        (seu grande amor adúltero), até a sua vida adulta medíocre.
                    </p>
                    <p>
                        Brás tenta a carreira política sem grande sucesso e busca a glória
                        inventando o "Emplasto Brás Cubas", um remédio milagroso que curaria a
                        melancolia humana. Ironicamente, ele contrai pneumonia enquanto trabalhava
                        nessa invenção e morre. A obra termina com a famosa constatação de que ele
                        não transmitiu a nenhuma criatura o legado de nossa miséria, considerando
                        sua vida um zero a zero com uma leve vantagem: não teve filhos.
                    </p>
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Análise da Obra</h2>
                    <p>
                        Publicada em 1881, esta é a obra que inaugura o Realismo no Brasil. Machado
                        de Assis rompe drasticamente com o idealismo do Romantismo. A estrutura do
                        livro é inovadora: apresenta capítulos curtíssimos, digressões filosóficas
                        constantes e quebra frequentemente a "quarta parede", dialogando e
                        ironizando o próprio leitor.
                    </p>
                    <p>
                        A genialidade do livro reside no narrador não confiável. Como "defunto
                        autor", Brás Cubas usa o pessimismo e a ironia para escancarar a hipocrisia,
                        o parasitismo e a futilidade da elite burguesa do século XIX. Temas como a
                        vaidade humana, o egoísmo e a relatividade da moral são o núcleo central das
                        análises de vestibulares.
                    </p>
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Personagens Principais</h2>
                    <div className="grid-personagens">
                        <div className="personagem-card">
                            <div className="placeholder-img bras"></div>
                            <div className="personagem-info">
                                <h3>Brás Cubas</h3>
                                <p>
                                    O narrador-defunto. Típico representante da elite carioca:
                                    egoísta, vaidoso e acomodado. Narra sua vida com distanciamento
                                    e cinismo.
                                </p>
                            </div>
                        </div>
                        <div className="personagem-card">
                            <div className="placeholder-img virgilia"></div>
                            <div className="personagem-info">
                                <h3>Virgília</h3>
                                <p>
                                    O grande amor de Brás Cubas. Movida pelas convenções sociais,
                                    prefere casar-se com Lobo Neves por status, mantendo Brás como
                                    amante.
                                </p>
                            </div>
                        </div>
                        <div className="personagem-card">
                            <div className="placeholder-img marcela"></div>
                            <div className="personagem-info">
                                <h3>Marcela</h3>
                                <p>
                                    Uma cortesã que se envolve com Brás na juventude, imortalizada
                                    pela frase: "amou-me durante quinze meses e onze contos de
                                    réis".
                                </p>
                            </div>
                        </div>
                        <div className="personagem-card">
                            <div className="placeholder-img quincas"></div>
                            <div className="personagem-info">
                                <h3>Quincas Borba</h3>
                                <p>
                                    Amigo de infância que se torna um filósofo mendigo. É o criador
                                    do "Humanitismo", uma sátira filosófica que reaparece no livro
                                    seguinte de Machado.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="obra-bloco">
                    <h2 className="title-section">Contexto Histórico</h2>
                    <p>
                        A obra reflete o Brasil do final do Segundo Reinado. O país vivia uma
                        transição conturbada: o desgaste da Monarquia, os debates fervilhantes sobre
                        a Abolição da Escravatura (que só ocorreria em 1888) e as ideias científicas
                        e filosóficas europeias (como o positivismo e o darwinismo social) chegando
                        ao país.
                    </p>
                    <p>
                        Machado de Assis retrata uma sociedade paradoxal: uma elite que tentava
                        espelhar a modernidade e os valores liberais da Europa, mas que ainda
                        mantinha a base estrutural escravocrata e o clientelismo. A passividade e o
                        tédio de Brás Cubas são, na verdade, o reflexo de toda uma classe social
                        parasita daquela época.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}
