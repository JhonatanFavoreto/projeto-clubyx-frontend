import { Link } from 'react-router-dom';
import '../styles/Header.css'

export default function Header() {
    return (
        <header className="header">
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
                        <Link to="/videoaulas">Videoaulas</Link>
                    </li>
                    <li>
                        <Link to="/curiosidades">Curiosidades</Link>
                    </li>
                    <li>
                        <Link to="/sobre">Sobre</Link>
                    </li>
                    <li>
                        <Link to="/simulados">Simulados</Link>
                    </li>
                </ul>
            </nav>
            <button className="btn-idioma">PT / EN</button>
        </header>
    );
}
