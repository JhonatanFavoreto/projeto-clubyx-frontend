import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    const idiomaAtual = localStorage.getItem('idioma') || 'pt';
    const en = idiomaAtual === 'en';

    const trocarIdioma = () => {
        const novoIdioma = idiomaAtual === 'pt' ? 'en' : 'pt';
        localStorage.setItem('idioma', novoIdioma);
        window.dispatchEvent(new Event('idiomaAlterado'));
        window.location.reload();
    };

    const navLinks = [
        { to: '/',            label: en ? 'Home'           : 'Início'       },
        { to: '/obra',        label: en ? 'The Work'       : 'Obra'         },
        { to: '/biblioteca',  label: en ? 'Library'        : 'Biblioteca'   },
        { to: '/vestibular',  label: en ? 'College Entrance': 'Vestibular'  },
        { to: '/simulados',   label: en ? 'Mock Exams'     : 'Simulados'    },
        { to: '/videoaulas',  label: en ? 'Video Lessons'  : 'Videoaulas'   },
        { to: '/curiosidades',label: en ? 'Fun Facts'      : 'Curiosidades' },
        { to: '/sobre',       label: en ? 'About'          : 'Sobre'        },
    ];

    const getTituloNavegador = (path) => {
        const titles = {
            '/':             en ? 'CLUBYX | Home'          : 'CLUBYX | Início',
            '/obra':         en ? 'CLUBYX | The Work'      : 'CLUBYX | Obra',
            '/biblioteca':   en ? 'CLUBYX | Library'       : 'CLUBYX | Biblioteca',
            '/vestibular':   en ? 'CLUBYX | College Entrance' : 'CLUBYX | Vestibular',
            '/simulados':    en ? 'CLUBYX | Mock Exams'    : 'CLUBYX | Simulados',
            '/simulados2':   en ? 'CLUBYX | Mock Exams'    : 'CLUBYX | Simulados',
            '/simulados3':   en ? 'CLUBYX | Mock Exams'    : 'CLUBYX | Simulados',
            '/simulados4':   en ? 'CLUBYX | Mock Exams'    : 'CLUBYX | Simulados',
            '/simulados5':   en ? 'CLUBYX | Mock Exams'    : 'CLUBYX | Simulados',
            '/videoaulas':   en ? 'CLUBYX | Video Lessons' : 'CLUBYX | Videoaulas',
            '/curiosidades': en ? 'CLUBYX | Fun Facts'     : 'CLUBYX | Curiosidades',
            '/sobre':        en ? 'CLUBYX | About'         : 'CLUBYX | Sobre',
            '/login':        'CLUBYX | Login',
            '/cadastro':     en ? 'CLUBYX | Register'      : 'CLUBYX | Cadastro',
            '/resultado':    en ? 'CLUBYX | Result'        : 'CLUBYX | Resultado',
        };
        return titles[path] || 'CLUBYX';
    };

    useEffect(() => {
        document.title = getTituloNavegador(location.pathname);
    }, [location]);

    return (
        <header className="header">
            <style>{`
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

                header.header .btn-idioma:hover {
                    color: #F4EFE6 !important;
                    background-color: #4A0E17 !important;
                    border-color: #4A0E17 !important;
                }

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
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <button className="btn-idioma" onClick={trocarIdioma}>
                {idiomaAtual === 'pt' ? 'PT / EN' : 'EN / PT'}
            </button>
        </header>
    );
}