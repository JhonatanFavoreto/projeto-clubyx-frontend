import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AObra from './pages/AObra';
import Biblioteca from './pages/Biblioteca';
import Vestibular from './pages/VestibularA';
import Videoaulas from './pages/Videoaulas';
import Curiosidades from './pages/Curiosidades';
import Sobre from './pages/SobreA';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Simulados from './pages/Simulados';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/obra" element={<AObra />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
                <Route path="/vestibular" element={<Vestibular />} />
                <Route path="/videoaulas" element={<Videoaulas />} />
                <Route path="/curiosidades" element={<Curiosidades />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/simulados" element={<Simulados />} />
            </Routes>
        </Router>
    );
}

export default App;
