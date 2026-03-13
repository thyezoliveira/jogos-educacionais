# Plano de Interface Principal - SMEC Saquarema

## 🎨 Identidade Visual e Estilo
- **Framework:** Tailwind CSS.
- **Cores:** Paleta institucional (Azul SMEC, Branco, tons de cinza para legibilidade).
- **Tipografia:** Sans-serif moderna (Inter ou Roboto) focada em acessibilidade escolar.
- **Responsividade:** Mobile-first, otimizado para o formato de tela dos Chromebooks (1366x768).

## 👩‍🏫 Interface do Professor

### 1. Dashboard Principal
- Lista de jogos disponíveis em cards com miniaturas.
- Botão de configuração para cada jogo (Dificuldade, tempo, temas).
- Botão "Criar Sala" para iniciar uma sessão.

### 2. Painel de Controle da Sala (Live)
- **Cabeçalho:** Nome do jogo e status da conexão.
- **Destaque:** Código da Sala em fonte gigante (ex: `AB12`) para projeção em sala de aula.
- **Lista de Alunos (Sidebar/Grid):** Cards individuais com Nome/Matrícula que "acendem" quando o aluno entra.
- **Controles de Fluxo:** 
  - Botão flutuante ou barra inferior com `Play`, `Pause` e `Encerrar`.
- **Relatório em Tempo Real:** Gráfico simples ou lista de progresso/acertos dos alunos.

## 👨‍🎓 Interface do Aluno

### 1. Tela de Entrada
- Banner institucional SMEC.
- Exibição do e-mail identificado automaticamente: `Logado como: matricula@smec.saquarema.rj.gov.br`.
- Campo de entrada de texto focado para o **Código da Sala**.
- Botão "Entrar no Jogo".

### 2. Tela de Espera
- Mensagem: "Aguardando o professor iniciar a partida...".
- Animação simples de carregamento ou lista de quem já entrou.

### 3. Tela de Gameplay (Phaser Container)
- Área central ocupando o máximo da tela para o jogo.
- Overlay discreto de "PAUSADO" quando o professor acionar o comando.
- Botão de "Sair" ou "Voltar" (com confirmação).

## 🛠️ Componentes Compartilhados (Módulos React)
- **SocketStatus:** Indicador de conexão (Verde/Vermelho).
- **GameWrapper:** Componente que encapsula a instância do Phaser.js e gerencia a comunicação via props.
- **ModalFeedback:** Para mensagens de erro de código inválido ou desconexão.

## 📱 Estratégia de Instalação (PWA/SPA)
- Manifesto configurado para permitir "Adicionar à tela inicial" no Chrome.
- Ícone institucional da SMEC.
- Modo `standalone` para remover barras de navegação do browser.
