### 1. Entendendo o Problema Atual (Hardcoded)
Se você olhar o seu arquivo Home.jsx ou Videoaulas.jsx, vai ver que textos como *"Memórias Póstumas de Brás Cubas"*, subtítulos, vídeos e cartões da biblioteca estão digitados direto no código HTML/JSX.

**O problema disso:** Para alterar uma vírgula ou adicionar um novo vídeo, você precisaria abrir o código-fonte, alterar e fazer deploy (publicar) novamente sua aplicação.
**A solução:** O React vai ficar "vazio" no começo, vai bater na porta do Backend (via requisição / API), buscar os textos/links/imagens e só então "pintar" a tela com os dados que o Banco de Dados enviar.

### 2. A Arquitetura Ideal (Organização de Pastas)
Para o seu frontend se comunicar bem, não jogue as requisições soltas dentro das páginas. Crie uma camada de comunicação na pasta src:

Sugestão de estrutura:
```text
src/
  api/
    axios.js (ou api.js)    // Configuração global da conexão
  services/
    homeService.js          // Métodos para buscar coisas da Home
    videoService.js         // Métodos para buscar vídeos
  pages/
    Home.jsx
    Videoaulas.jsx
  ...
```

### 3. Fetch vs Axios
Para conversar com o backend, existem duas formas populares:
- **Fetch API:** Já vem nativa nos navegadores. É boa, mas exige escrever um pouco mais (converter as respostas pra JSON manualmente, etc).
- **Axios:** Uma biblioteca externa muito famosa. É mais fácil de usar, lida com erros de forma mais limpa e é o padrão de mercado atual.

**Recomendação:** Instale o axios executando no terminal:
`npm install axios`

### 4. Criando o canal de comunicação (A prática)

#### Passo A: Configurar a API
Crie um arquivo em `src/api/api.js`:
```javascript
import axios from 'axios';

const api = axios.create({
  // Coloque aqui a URL base de onde seu backend está rodando
  baseURL: 'http://localhost:3000',
});

export default api;
```

#### Passo B: Criar o Serviço
Crie: `src/services/homeService.js`. Aqui ficarão as funções que vão no Backend buscar os dados:
```javascript
import api from '../api/api';

export const getHomeConteudo = async () => {
    // Faz um GET na rota (endpoint) /conteudo-home do seu backend
    const resposta = await api.get('/conteudo-home');
    return resposta.data; // Retorna os dados que vieram do banco
};
```

#### Passo C: Refatorando o Home.jsx (A mágica acontece)
Como o React faz para buscar dados vivos? Ele usa dois *Hooks*:
- `useState`: Para criar variáveis que, quando mudam, atualizam a tela.
- `useEffect`: Para rodar a busca no backend apenas UMA vez quando a tela abre.

Vamos refatorar o topo de Home.jsx:

```jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';
import { getHomeConteudo } from '../services/homeService';

export default function Home() {
    // 1. Criamos os "States" para guardar os dados e controlar os status
    const [conteudo, setConteudo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    // 2. useEffect roda ao abrir a página
    useEffect(() => {
        const carregarDados = async () => {
            try {
                // Chama a API
                const dadosBackend = await getHomeConteudo();
                setConteudo(dadosBackend); // Atualiza os dados
                setLoading(false); // Desliga a tela de carregamento
            } catch (error) {
                setErro("Erro ao buscar os dados do servidor.");
                setLoading(false);
            }
        };

        carregarDados();
    }, []); // O Array vazio significa "rode só uma vez"

    // 3. Cenários de Loading e Erro (Boa Prática de UX)
    if (loading) return <div>Carregando plataforma...</div>;
    if (erro) return <div>{erro}</div>;

    // 4. Aqui agora substituímos os textos fixos pelas variáveis do backend
    return (
        <>
            <Header />
            <section className="hero-section" id="home">
                {/* O backend deve mandar algo como: { tituloHero: "...", subtituloHero: "..." } */}
                <h1>{conteudo.tituloHero}</h1>
                <p className="hero-subtitle">
                    {conteudo.subtituloHero}
                </p>
                <button className="btn-primario">Começar os Estudos</button>
            </section>

            {/* resto do código... */}
        </>
    );
}
```

E para listas (como a de **Videoaulas** ou as bolinhas da **Biblioteca**)?
Quando vem do backend, vem como um Array. No React usamos a função `.map()`. Exemplo:
```jsx
// Suponha que conteudo.cards seja [ { id: 1, titulo: "A Obra", texto: "..." }, {...} ]
<div className="cards-grid">
    {conteudo.cards.map((card) => (
        <div className="card" key={card.id}>
            <h3>{card.titulo}</h3>
            <p>{card.texto}</p>
        </div>
    ))}
</div>
```

---

### 5. E como funcionam as URLs e Imagens?
Imagens não são salvas "dentro do banco de dados" como um arquivo inteiro.
No banco de dados (MySQL, PostgreSQL, MongoDB), salvamos apenas uma STRING, que é **o caminho (URL)** de onde essa imagem está hospedada.

**Como funciona no Backend (Node.js/Express ou Python ou C# etc)?**
O seu backend deve receber os uploads de imagem e salvar fisicamente em uma pasta no seu servidor `(ex: /uploads)`. Quando o React pedir as listas, o backend manda o JSON assim (Endpoint REST):
```json
{
  "id": 1,
  "titulo": "Memórias Póstumas",
  "imagemCapaUrl": "http://localhost:3000/uploads/imagem-livro.jpg"
}
```
**No React**, você vai pegar esse endereço e renderizar normal na tag `img`:
```jsx
<img src={livro.imagemCapaUrl} alt={livro.titulo} />
```

---

### 6. Como estruturar o seu Backend REST
Um padrão de mercado para sua equipe de Back construir, para esse projeto literário, seria algo assim:
* `GET /api/home` - Devolve todos os banners, títulos da tela inicial.
* `GET /api/videos` - Devolve uma lista de todos os vídeos `[{id:1, titulo: "Aula 1", urlYoutube: "...", resumo: "..."}]`
* `GET /api/obras` - Traz a lista de obras na sessão Biblioteca.
* `POST /api/contato` (Exemplo para formulários, o React mandaria dados ao backend).

### Resumo Intermediário (Boas Práticas de Clean Code aplicadas acima):
1. **Single Responsibility (Responsabilidade Única):** Perceba que tirei o código do `axios.get` de dentro do Home.jsx e criei o `homeService.js`. Se a URL mudar amanhã, o dev só abre o Service e altera, o Componente do React nem fica sabendo!
2. **Controle de Estado Local (`useState`):** Nunca assumir que algo vai carregar instantâneo. Sempre tenha um estado de `loading` para exibir um giratório ("spinner") ao usuário enquanto o "fetch" viaja pela internet.
3. **Escalabilidade:** Trabalhando com o `.map()` como expliquei acima, se o cliente adicionar 100 vídeos no backend no mês que vem, o React renderizará tudo automático, não será preciso alterar 1 linha de código de Frontend.
