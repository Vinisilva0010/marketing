# 🚀 ConteúdoMestre

Uma aplicação web front-end moderna para planejamento de conteúdo para redes sociais, construída com Next.js e TypeScript.

## 🎯 Visão Geral

**ConteúdoMestre** é uma automação para ajudar criadores e equipes de marketing a planejarem postagens para redes sociais de forma visual, estratégica e organizada.

### ✨ Funcionalidades Principais

- 📅 **Calendário Mensal Responsivo** - Visualização clara e intuitiva das suas postagens
- ➕ **Gerenciamento de Posts** - Criação, edição e exclusão de postagens com interface moderna
- 🎯 **Múltiplas Redes Sociais** - Suporte para Instagram, LinkedIn, TikTok, Facebook, Twitter, YouTube e Pinterest
- 🎪 **Objetivos de Marketing** - Categorização por objetivo (engajamento, awareness, conversão, etc.)
- 🤖 **Sugestões de IA** - Ideias criativas, CTAs e hashtags personalizadas (simulado)
- 📱 **Design Responsivo** - Interface otimizada para desktop, tablet e mobile
- 💾 **Persistência Local** - Dados salvos no localStorage do navegador
- 🎨 **Tema Futurista** - Design moderno com glass morphism e efeitos visuais
- 📄 **Exportação** - Geração de PDF do calendário para impressão ou compartilhamento

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para melhor desenvolvimento
- **TailwindCSS** - Estilização utilitária e responsiva
- **Lucide React** - Ícones modernos e consistentes
- **FullCalendar** - Componente de calendário interativo
- **localStorage** - Persistência de dados local
- **date-fns** - Manipulação de datas
- **HTML2Canvas & jsPDF** - Exportação de imagens e PDFs (preparado)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd conteudo-mestre
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa em modo de produção
- `npm run lint` - Executa verificação de código
- `npm run lint:fix` - Corrige automaticamente problemas de lint
- `npm run type-check` - Verifica tipos TypeScript
- `npm run preview` - Build e executa em modo produção
- `npm run clean` - Limpa arquivos de cache

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── globals.css        # Estilos globais e tema
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Button, Card, Input)
│   ├── layout/           # Layout (Header, Sidebar)
│   ├── calendar/         # Componente de calendário
│   ├── forms/            # Formulários (PostForm)
│   ├── ai/               # Sugestões de IA
│   └── export/           # Exportação de dados
├── lib/                  # Utilitários e configurações
│   ├── constants.ts      # Constantes da aplicação
│   ├── storage.ts        # Gerenciamento localStorage
│   └── utils.ts          # Funções utilitárias
└── types/                # Definições TypeScript
    └── index.ts          # Tipos da aplicação
```

## 🎨 Design e Interface

### Tema Visual
- **Paleta**: Tons escuros com acentos azuis e roxos
- **Estilo**: Futurista com glass morphism e gradientes
- **Responsividade**: Mobile-first design
- **Acessibilidade**: Contraste adequado e navegação por teclado

### Componentes Principais
- **Dashboard**: Visão geral com estatísticas e boas-vindas
- **Calendário**: Visualização mensal com eventos coloridos por rede social
- **Formulário de Post**: Modal completo para criação/edição
- **Sugestões de IA**: Interface para geração de conteúdo
- **Exportação**: Configuração e download de relatórios

## 📊 Funcionalidades Detalhadas

### 1. Gerenciamento de Posts
- Criação com título, rede social, objetivo, data e hora
- Campos opcionais: descrição, link da arte, CTA, hashtags
- Status: rascunho, agendado, publicado
- Edição e exclusão intuitivas

### 2. Calendário Interativo
- Visualização mensal responsiva
- Eventos coloridos por rede social
- Clique em data para criação rápida
- Clique em evento para edição
- Estatísticas integradas

### 3. Sugestões de IA (Simulado)
- Ideias personalizadas por rede social e objetivo
- CTAs otimizados por objetivo de marketing
- Hashtags relevantes e contextuais
- Interface de seleção e cópia rápida

### 4. Exportação
- Geração de PDF do calendário
- Filtros por período
- Opções de detalhamento
- Design profissional para impressão

## 🔮 Roadmap Futuro

### Fase 2 - Backend e Integração
- [ ] Autenticação com Clerk
- [ ] API backend com Supabase ou Firebase
- [ ] Sincronização em nuvem
- [ ] Compartilhamento de calendários

### Fase 3 - IA e Automação
- [ ] Integração com OpenAI ou similar
- [ ] Sugestões de IA reais
- [ ] Análise de performance
- [ ] Agendamento automático

### Fase 4 - Avançado
- [ ] Integração com APIs das redes sociais
- [ ] Publicação direta
- [ ] Analytics avançados
- [ ] Colaboração em equipe
- [ ] Templates de conteúdo

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Next.js team pelo excelente framework
- TailwindCSS pela solução de estilização
- FullCalendar pela biblioteca de calendário
- Lucide pela coleção de ícones
- Comunidade open source por todas as ferramentas utilizadas

---

**ConteúdoMestre** - Transformando o planejamento de conteúdo para redes sociais! 🚀

Para dúvidas ou sugestões, abra uma issue no repositório.