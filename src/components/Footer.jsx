import '../styles/Home.css';

export default function Footer() {
    const en = (localStorage.getItem('idioma') || 'pt') === 'en';

    return (
        <footer className="footer" style={{ marginTop: 'auto' }}>
            <p>
                {en
                    ? 'Integrative Project 2026 | SENAI (Systems Development) + SESI'
                    : 'Projeto Integrador 2026 | SENAI (Desenvolvimento de Sistemas) + SESI'}
            </p>
            <p>
                {en
                    ? 'Collaboratively developed.'
                    : 'Desenvolvido de forma colaborativa.'}
            </p>
        </footer>
    );
}