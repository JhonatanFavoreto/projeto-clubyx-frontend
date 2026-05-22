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
import Simulados2 from './pages/Simulados2';
import Simulados3 from './pages/Simulados3';
import Simulados4 from './pages/Simulados4';
import Simulados5 from './pages/Simulados5';
import Resultado from './pages/Resultado';
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
                <Route path="/simulados2" element={<Simulados2 />} />
                <Route path="/simulados3" element={<Simulados3 />} />
                <Route path="/simulados4" element={<Simulados4 />} />
                <Route path="/simulados5" element={<Simulados5 />} />
                <Route path="/resultado" element={<Resultado />} />
            </Routes>
        </Router>
    );
}

export default App;
