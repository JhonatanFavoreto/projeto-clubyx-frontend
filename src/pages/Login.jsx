import { Link } from 'react-router-dom';
import '../styles/Login.css';
import Footer from '../components/Footer';

export default function Login() {
    return (
        <div className="auth-page">
            <div className="auth-container login-container">
                <div className="login-left">
                    <h2 className="login-logo-text">Projeto Clubyx | SENAI + SESI</h2>
                    <div className="login-quote-wrapper">
                        <p className="login-quote">
                            "Não tive filhos, não transmiti a nenhuma criatura o legado da nossa
                            miséria."
                        </p>
                        <p className="login-author">
                            — Machado de Assis, Memórias Póstumas de Brás Cubas
                        </p>
                    </div>
                </div>
                <div className="login-right">
                    <h1 className="auth-title">Acesso ao Portal</h1>
                    <p className="auth-subtitle">
                        Insira as suas credenciais para continuar os estudos.
                    </p>

                    <form className="auth-form">
                        <div className="form-group">
                            <label>E-mail Académico</label>
                            <input type="email" />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" />
                        </div>
                        <div className="auth-actions">
                            <button type="submit" className="btn-submit">
                                Efetuar Login
                            </button>
                            <span className="auth-link-text">
                                Não tem uma conta?{' '}
                                <Link to="/cadastro" className="auth-link">
                                    Registe-se aqui
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
