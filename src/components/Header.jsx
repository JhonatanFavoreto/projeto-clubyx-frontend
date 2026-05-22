import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            {/* Controle de responsividade, cores e efeitos globais */}
            <style>{`
                /* ===================================================
                   ESTILOS PARA TELAS GRANDES (Desktops e Notebooks)
                   =================================================== */
                header.header {
                    display: flex !important;
                    flex-direction: row !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    flex-wrap: wrap !important;
                    gap: 1.5rem !important;
                    padding: 1rem 5% !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    height: auto !important;
                    background-color: #ffffff;
                }

                header.header .logo {
                    font-size: 1.8rem !important;
                    font-weight: bold !important;
                    white-space: nowrap !important;
                    color: #4A0E17 !important;
                }

                header.header .nav {
                    display: flex !important;
                    align-items: center !important;
                    flex: 1 !important;
                    justify-content: center !important;
                }

                header.header .nav ul {
                    display: flex !important;
                    flex-direction: row !important;
                    flex-wrap: wrap !important;
                    justify-content: center !important;
                    align-items: center !important;
                    gap: 0.5rem 1.5rem !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    list-style: none !important;
                }

                header.header .nav ul li {
                    margin: 0 !important;
                    padding: 0 !important;
                }

                header.header .nav ul li a {
                    text-decoration: none !important;
                    font-size: 1rem !important;
                    font-weight: 600 !important;
                    color: #222222 !important;
                    padding: 0.5rem !important;
                    display: inline-block !important;
                    white-space: nowrap !important;
                    transition: color 0.2s ease, opacity 0.2s ease;
                }

                header.header .nav ul li a:hover {
                    color: #4A0E17 !important;
                    opacity: 0.9;
                }

                /* Estilo base do Botão de Idioma */
                header.header .btn-idioma {
                    white-space: nowrap !important;
                    padding: 0.5rem 1rem !important;
                    cursor: pointer !important;
                    color: #222222 !important;
                    background-color: transparent;
                    border: 1px solid #4A0E17;
                    border-radius: 4px;
                    font-weight: 600;
                    transition: all 0.2s ease-in-out;
                }

                /* HOVER DO BOTÃO: Fundo vinho e texto na cor desejada #F4EFE6 */
                header.header .btn-idioma:hover {
                    color: #F4EFE6 !important; /* COR DO TEXTO ATUALIZADA */
                    background-color: #4A0E17 !important;
                    border-color: #4A0E17 !important;
                }

                /* ===================================================
                   MEDIA QUERY PARA TELAS MÉDIAS E PEQUENAS (Tablets e Celulares)
                   =================================================== */
                @media (max-width: 1024px) {
                    header.header {
                        flex-direction: column !important;
                        justify-content: center !important;
                        gap: 1.2rem !important;
                        padding: 1.2rem 1rem !important;
                    }

                    header.header .nav {
                        width: 100% !important;
                        justify-content: center !important;
                    }

                    header.header .nav ul {
                        gap: 0.6rem 1rem !important;
                        width: 100% !important;
                    }

                    header.header .nav ul li a {
                        font-size: 0.95rem !important;
                        padding: 0.4rem 0.6rem !important;
                    }

                    header.header .logo {
                        font-size: 2rem !important;
                    }
                }
            `}</style>

            <div className="logo">CLUBYX</div>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/obra">A Obra</Link>
                    </li>
                    <li>
                        <Link to="/biblioteca">Biblioteca</Link>
                    </li>
                    <li>
                        <Link to="/vestibular">Vestibular</Link>
                    </li>
                    <li>
                        <Link to="/simulados">Simulados</Link>
                    </li>
                    <li>
                        <Link to="/videoaulas">Videoaulas</Link>
                    </li>
                    <li>
                        <Link to="/curiosidades">Curiosidades</Link>
                    </li>
                    <li>
                        <Link to="/sobre">Sobre</Link>
                    </li>
                </ul>
            </nav>
            <button className="btn-idioma">PT / EN</button>
        </header>
    );
}