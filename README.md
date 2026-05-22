# CLUBYX - Plataforma de Clube do Livro Digital

**Projeto Integrador: SENAI + SESI**

Uma plataforma educacional colaborativa desenvolvida para centralizar o estudo de obras literárias, preparar alunos para vestibulares e integrar competências de desenvolvimento de sistemas com ensino de línguas (Português e Inglês).

## 📋 Descrição do Projeto

CLUBYX é uma aplicação web (React) que integra conteúdo de múltiplas equipes de desenvolvimento, cada uma responsável por uma obra literária principal. A plataforma oferece funcionalidades para estudo colaborativo, análise de obras, simulados e conteúdos interativos.

### 🎯 Objetivos

- Centralizar conteúdo educacional com foco em preparação para vestibular
- Integrar conhecimentos de diferentes disciplinas (Português, Inglês, Desenvolvimento de Sistemas)
- Proporcionar experiência multilíngue (Português e Inglês)
- Demonstrar integração entre APIs desenvolvidas por diferentes equipes

### Principais Funcionalidades

- **Home**: Apresentação do projeto e destaques do livro principal da equipe
- **Sobre**: Informações da equipe, cursos e objetivo do projeto
- **Livro Principal**: Resumo completo, análise, personagens e contexto histórico
- **Biblioteca**: Acervo centralizado de todos os livros das equipes (integração com APIs)
- **Dicas de Vestibular**: Conteúdo focado no livro principal com interpretações
- **Videoaulas**: Conteúdos produzidos pelos alunos sobre o livro principal
- **Simulados/Quiz**: Questões estilo vestibular com correção
- **Curiosidades**: Fatos sobre o livro, autor e contexto histórico/social
- **Autenticação**: Sistema de login e cadastro de usuários
- **Suporte Multilíngue**: Português (padrão) e Inglês (obrigatório)

## 🚀 Stack Técnico

### Frontend (Este Projeto)

- **React 19.2.5**: Biblioteca JavaScript para construção da UI
- **React Router DOM 7.15.0**: Roteamento de páginas e navegação
- **Vite 8.0.10**: Bundler e servidor de desenvolvimento
- **CSS3**: Estilização das páginas
- **ESLint**: Análise estática de código

### Backend (Equipes Responsáveis)

- **Node.js**: Runtime JavaScript
- **Express**: Framework web REST
- **PostgreSQL**: Banco de dados relacional

### Mobile (Equipe Responsável)

- **React Native**: Desenvolvimento de aplicativo mobile

## 🧩 Estrutura do Projeto Integrador

**Total de Equipes:** 5
- **4 equipes** → Frontend Web (React)
- **1 equipe** → Mobile (React Native)

Cada equipe é responsável por:
- Um livro principal específico
- Conteúdos complementares integrados com outras equipes
- API Backend própria
- Frontend Web ou Mobile

### Integração entre Equipes

A plataforma CLUBYX centraliza conteúdo de todas as equipes:
- A página **Biblioteca** consome as APIs das demais equipes
- Cada página de **Livro Principal** é específica da equipe
- Compartilhamento de estrutura de navegação e autenticação

## 📁 Estrutura do Projeto

```
projeto-clubyx-frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Footer.jsx     # Rodapé da aplicação
│   │   ├── Header.jsx     # Cabeçalho e navegação
│   │   └── LoadingBook.jsx # Componente de carregamento
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home.jsx       # Página inicial
│   │   ├── AObra.jsx      # Detalhes da obra
│   │   ├── Biblioteca.jsx # Biblioteca de livros
│   │   ├── VestibularA.jsx # Informações sobre vestibular
│   │   ├── Videoaulas.jsx # Videoaulas
│   │   ├── Curiosidades.jsx # Curiosidades educacionais
│   │   ├── SobreA.jsx     # Página sobre
│   │   ├── Login.jsx      # Autenticação de usuários
│   │   ├── Cadastro.jsx   # Registro de usuários
│   │   ├── Simulados.jsx  # Primeiro módulo de simulados
│   │   ├── Simulados2.jsx # Segundo módulo de simulados
│   │   ├── Simulados3.jsx # Terceiro módulo de simulados
│   │   ├── Simulados4.jsx # Quarto módulo de simulados
│   │   ├── Simulados5.jsx # Quinto módulo de simulados
│   │   └── Resultado.jsx  # Exibição de resultados
│   ├── services/          # Serviços de API
│   │   ├── fetchClient.js # Cliente HTTP configurado
│   │   ├── homeService.js # Serviço da página home
│   │   └── curiosidadesService.js # Serviço de curiosidades
│   ├── styles/            # Folhas de estilos CSS
│   │   ├── Home.css
│   │   ├── Biblioteca.css
│   │   ├── AObra.css
│   │   ├── Vestibular.css
│   │   ├── Videoaulas.css
│   │   ├── Curiosidades.css
│   │   ├── Sobre.css
│   │   ├── Login.css
│   │   ├── Cadastro.css
│   │   ├── Simulados.css
│   │   ├── Resultado.css
│   │   ├── Header.css
│   │   ├── LoadingBook.css
│   │   └── index.css
│   ├── App.jsx            # Componente raiz com rotas
│   ├── main.jsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── public/                # Arquivos estáticos
├── eslint.config.js       # Configuração do ESLint
├── vite.config.js         # Configuração do Vite
├── package.json           # Dependências do projeto
└── README.md              # Este arquivo
```

## 🔗 Rotas Disponíveis

| Rota | Página | Descrição | Status Obrigatório |
|------|--------|-----------|-------------------|
| `/` | Home | Apresentação do projeto e destaque do livro principal | ✅ Obrigatório |
| `/sobre` | Sobre | Informações da equipe, curso de cada integrante e objetivo | ✅ Obrigatório |
| `/livro-principal` | Livro Principal | Resumo, análise, personagens e contexto histórico | ✅ Obrigatório |
| `/biblioteca` | Biblioteca | Acervo centralizado de livros (integração com APIs externas) | ✅ Obrigatório |
| `/vestibular` | Dicas de Vestibular | Interpretações e possíveis temas de redação | ✅ Obrigatório |
| `/simulados` | Simulados/Quiz | Questões estilo vestibular com correção | ✅ Obrigatório |
| `/videoaulas` | Videoaulas | Vídeos produzidos pelos alunos sobre o livro principal | ✅ Obrigatório |
| `/curiosidades` | Curiosidades | Fatos sobre livro, autor e contexto histórico | ✅ Obrigatório |
| `/login` | Login | Autenticação de usuários | Recomendado |
| `/cadastro` | Cadastro | Registro de novos usuários | Recomendado |
| `/resultado` | Resultado | Visualização de resultados dos simulados | Recomendado |

## 📦 Instalação

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn

### Passos de Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd projeto-clubyx-frontend
```

2. Instale as dependências:

```bash
npm install
```

## 🛠️ Desenvolvimento

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:5173` (por padrão no Vite).

### Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview da build de produção

```bash
npm run preview
```

### Validação de código (Linting)

```bash
npm run lint
```

## 🌍 Suporte Multilíngue

**Requisito SESI: Todas as páginas devem suportar dois idiomas**

- 🇧🇷 **Português Brasileiro** (idioma padrão)
- 🇺🇸 **Inglês** (obrigatório)

### Regras de Tradução

- ⚠️ **Proibido**: Uso de tradução automática
- ✅ **Obrigatório**: Conteúdo adaptado, não apenas traduzido
- 📋 **Avaliação**: Será realizada conjuntamente com a professora de inglês

### Implementação

O sistema deve incluir um seletor de idioma visível em todas as páginas para facilitar a troca entre português e inglês.

## 🔐 Integração com APIs Externas

A plataforma consome APIs desenvolvidas pelas outras equipes do projeto integrador.

### Página de Biblioteca

- Consome `GET /livros` das APIs das equipes parceiras
- Exibe títulos, descrições e informações de todos os livros
- Mantém integração dinâmica com as demais equipes

### Autenticação

- **Header obrigatório**: `x-api-key: Clubyx_dev`
- Utilizado em todas as requisições à API Backend

## 📝 Componentes Principais

### Header
- Navegação entre páginas
- Seletor de idioma (Português/Inglês)
- Menu de acesso às diferentes seções
- Atualização dinâmica do título da página

### Footer
- Informações adicionais
- Links úteis
- Copyright
- Informações da equipe responsável

### LoadingBook
- Componente de carregamento visual
- Usado durante requisições à API

## 🎨 Estilização

O projeto utiliza CSS puro com estilos isolados por página. Cada página possui seu próprio arquivo CSS na pasta `styles/`.

### Arquivo de Estilos Globais
- `src/index.css` - Estilos aplicados globalmente

## 🏗️ Arquitetura e Padrões

### Serviços (Services)
Os serviços centralizam a comunicação com a API, permitindo reutilização e facilidade de manutenção:

```javascript
// src/services/homeService.js
import { fetchClient } from './fetchClient';

export const getHomeConteudo = async () => {
    return await fetchClient.get('/conteudo-home');
};
```

### Gerenciamento de Estado
Utiliza React Hooks (`useState`, `useEffect`) para gerenciar estado local das páginas:

```javascript
const [dados, setDados] = useState(null);
const [loading, setLoading] = useState(true);
const [erro, setErro] = useState(null);
```

## 🚦 Status do Projeto

**Projeto Integrador SENAI + SESI - Clube do Livro (CLUBYX)**

Versão: **0.0.0** (em desenvolvimento)

Status: 🟡 **Desenvolvimento Ativo**

## ⚠️ Restrições Importantes

O desenvolvimento deste projeto deve seguir rigorosamente as seguintes regras:

### ✅ O que É Permitido

- Utilizar **exclusivamente** as tecnologias trabalhadas em sala de aula
- Referenciar documentações oficiais de tecnologias aprendidas
- Colaborar com equipes parceiras para integração de APIs
- Usar controle de versão (Git) e boas práticas de código

### ❌ O que É PROIBIDO

- ❌ **Usar tecnologias diferentes das abordadas em aula** → Resultará em nota ZERO
- ❌ **Plagiar código** (total ou parcial) → Resultará em nota ZERO
- ❌ **Utilizar IA para gerar código ou partes significativas** → Resultará em nota ZERO

### 📌 Objetivo

Avaliar o aprendizado real de cada equipe. Todo desenvolvimento deve ser:
- **Autoral** (desenvolvido pelos integrantes da equipe)
- **Alinhado** ao conteúdo visto em aula
- **Documentado** com explicações técnicas

## 🤝 Fluxo de Trabalho em Equipe

### Padrão Git

1. Crie uma branch para sua feature: `git checkout -b feature/NomeDaFeature`
2. Commit suas mudanças: `git commit -m 'Descrição clara da mudança'`
3. Push para a branch: `git push origin feature/NomeDaFeature`
4. Abra um Pull Request para revisão
5. Após revisão, faça merge na main

### Commits Significativos

```
✅ Bom: "Add login form component with validation"
✅ Bom: "Fetch books from API on library page"
❌ Ruim: "Fixed stuff"
❌ Ruim: "ajuste"
```

## 📋 Convenções de Código

- ✅ Use componentes funcionais com React Hooks
- ✅ Mantenha a estrutura de pastas organizada
- ✅ Crie estilos CSS isolados por componente/página
- ✅ Use nomes descritivos para funções e variáveis
- ✅ Siga as regras do ESLint
- ✅ Centralize requisições de API nos services
- ✅ Adicione comentários para lógica complexa
- ✅ Use const ao invés de let quando possível

## � Requisitos Não Funcionais

| Requisito | Descrição | Meta |
|-----------|-----------|------|
| **Responsividade** | Funcionamento em diferentes tamanhos de tela | Web: Desktop, Tablet, Mobile |
| **Usabilidade** | Interface intuitiva e fácil de usar | Navegação clara e sem confusões |
| **Performance** | Tempo de resposta da API | < 4 segundos |
| **Organização de Código** | Estrutura clara e documentada | Seguir padrões de clean code |
| **Versionamento** | Controle de versão obrigatório | Git com commits significativos |
| **Deploy** | Publicação do sistema | Backend deployed (ex: Render, Heroku) |

## 📦 Arquivos de Configuração

- **vite.config.js**: Configuração do bundler Vite
- **eslint.config.js**: Regras de linting do projeto
- **package.json**: Dependências e scripts do projeto
- **.gitignore**: Arquivos ignorados pelo Git

## 🐛 Troubleshooting

### Erro de conexão com API

Verifique se:
- A URL da API está correta
- A chave `x-api-key` está sendo enviada nos headers
- O servidor backend está operacional
- CORS está configurado corretamente no backend

### Problema ao instalar dependências

```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale as dependências
npm install
```

### Porta 5173 já em uso

```bash
npm run dev -- --port 3000
```

### Problema com idioma não carregando

Verifique se:
- Os arquivos de tradução estão no local correto
- O seletor de idioma está funcionando
- As traduções foram feitas manualmente (não automaticamente)

## 🎯 Boas Práticas de Desenvolvimento

### 1. Single Responsibility (Responsabilidade Única)
Cada serviço tem uma responsabilidade específica. Se a URL mudar, altere apenas no serviço.

### 2. Controle de Estado
Sempre use estados para `loading` e `error` para melhorar a experiência do usuário.

### 3. Escalabilidade
Use `.map()` para renderizar listas vindas da API, permitindo adicionar novos itens sem alterar código.

### 4. Organização de Arquivos
Mantenha páginas, componentes, serviços e estilos em suas respectivas pastas para fácil manutenção.

### 5. Controle de Versão
- Commits significativos e bem descritivos
- Branches para novas features
- Pull Requests com explicação das mudanças

## 🤝 Integração com Outras Equipes

### Comunicação

- **API da equipe**: Disponibilizar endpoints GET e GET by ID documentados
- **Formato de dados**: Acordar padrão JSON para responses
- **CORS**: Configurar adequadamente no backend

### Consumo de APIs Externas

- **Biblioteca centralizada**: Consumir dados de todos os livros das equipes
- **Tratamento de erros**: Exibir mensagens claras quando uma API não responder
- **Cache**: Considerar implementar cache para melhorar performance

## 📞 Contato do Projeto

**Plataforma:** CLUBYX - Clube do Livro Digital
**Instituição:** SENAI + SESI
**Objetivo:** Projeto Integrador Multidisciplinar

Para dúvidas sobre integração com outras equipes, consulte:
- Documentação compartilhada no repositório
- Postman/Swagger das APIs parceiras
- Coordenador do projeto

## 🎯 Próximos Passos

1. ✅ Definir livro principal da equipe (com Ivonete)
2. ✅ Estruturar banco de dados (DER)
3. ✅ Desenvolver API Backend em Node.js
4. ✅ Criar páginas Frontend em React
5. ✅ Implementar suporte multilíngue
6. ✅ Integrar com APIs das demais equipes
7. ✅ Testes e ajustes
8. ✅ Deploy e apresentação

---

**Desenvolvido com dedicação por equipe de alunos SENAI + SESI**

*Projeto avaliado conforme critérios de autoria, organização de código e aprendizado real*
