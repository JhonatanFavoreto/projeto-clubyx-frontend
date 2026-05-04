export default function Header() {
    return (
        <header className="header">
            <div className="logo">O Defunto Autor</div>
            <nav className="nav">
                <ul>
                    <li>
                        <a href="#obra">A Obra</a>
                    </li>
                    <li>
                        <a href="#autor">O Autor</a>
                    </li>
                    <li>
                        <a href="#capitulos">Capítulos</a>
                    </li>
                </ul>
            </nav>
            <button className="btn-idioma">PT / EN</button>
        </header>
    );
}
