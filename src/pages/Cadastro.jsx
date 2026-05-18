import { Link } from 'react-router-dom';
import '../styles/Cadastro.css';
import Footer from '../components/Footer';

export default function Cadastro() {
    return (
        <div className="auth-page">
            <div className="auth-container cadastro-container">
                <div className="cadastro-content">
                    <h1 className="auth-title">Criar Conta</h1>
                    <p className="auth-subtitle text-center">Junte-se ao Clubyx - SENAI/SESI.</p>

                    <form className="auth-form cadastro-form">
                        <div className="form-group">
                            <label>Nome completo</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            <label>E-mail Académico</label>
                            <input type="email" />
                        </div>
                        <div className="form-group">
                            <label>Número de telefone</label>
                            <input type="text" />
                        </div>
                        <div className="form-group">
                            <label>
                                Senha <span className="label-hint">(mínimo de 6 caracteres)</span>
                            </label>
                            <input type="password" />
                        </div>
                        <div className="form-group">
                            <label>Repetir senha</label>
                            <input type="password" />
                        </div>

                        <div className="form-group photo-upload-group">
                            <div className="photo-upload-label">
                                <label>Envie uma foto de perfil</label>
                                <span className="label-hint block">
                                    Priorize fotos em 1000x1000 px
                                </span>
                            </div>
                            <div className="photo-upload-box">
                                <input type="file" id="profile-photo" accept="image/*" />
                                <label htmlFor="profile-photo"></label>
                            </div>
                        </div>

                        <div className="auth-actions">
                            <button type="submit" className="btn-submit">
                                Finalizar Registo
                            </button>
                            <span className="auth-link-text">
                                Já tem uma conta?{' '}
                                <Link to="/login" className="auth-link">
                                    Voltar ao Login
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
