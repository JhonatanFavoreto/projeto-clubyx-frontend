# CLUBYX - Plataforma de Clube do Livro Digital

**Projeto Integrador: SENAI + SESI**

Uma plataforma web colaborativa focada no estudo de obras literárias e preparação para vestibulares. O projeto centraliza o conteúdo de 5 equipes diferentes, integrando conhecimentos de Desenvolvimento de Sistemas, Português e Inglês.

---

## 🚀 Tecnologias Utilizadas

* **Frontend:** React 19, React Router DOM, Vite, CSS3
* **Backend (APIs Integradas):** Node.js, Express, PostgreSQL
* **Mobile:** React Native

---

## ⚙️ Como Rodar o Projeto

**Pré-requisitos:** Node.js (v16+) instalado.

1. Clone o repositório:

```bash
git clone <https://github.com/JhonatanFavoreto/projeto-clubyx-frontend.git>
cd projeto-clubyx-frontend

```

2. Instale as dependências:

```bash
npm install

```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev

```

O app estará disponível em `http://localhost:5173`.

---

## 🎯 Principais Funcionalidades

* **Home (`/`):** Destaques da plataforma e do livro da equipe.
* **Livro Principal (`/obra`):** Resumo, análise e contexto histórico.
* **Biblioteca (`/biblioteca`):** Acervo geral (consome as APIs de *todas* as outras equipes).
* **Preparação (`/simulados`, `/vestibular`):** Questões de prova e dicas de redação.
* **Conteúdo Extra (`/videoaulas`, `/curiosidades`):** Vídeos dos alunos e fatos históricos.

---

## ⚠️ Regras Essenciais (Critérios de Avaliação)

Para garantir a aprovação no projeto integrador, as seguintes regras são **obrigatórias**:

1. **Código Autoral:** O desenvolvimento deve ser 100% feito pelos alunos. **É terminantemente proibido usar IA para gerar código ou plagiar trabalhos** (Sujeito a nota ZERO).
2. **Tecnologias Restritas:** É permitido usar **apenas** as ferramentas e tecnologias abordadas nas aulas.
3. **Bilinguismo (SESI):** O site deve funcionar em Português e Inglês. **Proibido usar tradução automática**; o conteúdo deve ser adaptado pelos alunos.
4. **Integração de APIs:** As requisições para os backends das equipes exigem o header de autenticação: `x-api-key: Clubyx_dev`.

---

## 📁 Estrutura de Pastas

```text
src/
├── components/    # Componentes reutilizáveis (Header, Footer, etc.)
├── pages/         # Telas principais da aplicação
├── services/      # Configuração de rotas de API (fetch)
├── styles/        # Arquivos CSS modulares
├── App.jsx        # Roteamento central
└── main.jsx       # Ponto de entrada do React

```

---

**Desenvolvido com dedicação por alunos SENAI + SESI.**
