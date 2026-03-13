# Plano do Projeto - Plataforma de Jogos Educativos

## Objetivo
Desenvolver uma plataforma web moderna para hospedar e executar jogos educativos, focada na rede municipal de Saquarema (SMEC). O produto será uma **SPA (Single Page Application)** otimizada para instalação no Google Chrome (Chromebooks), com foco em facilidade de acesso e controle em tempo real.

## Arquitetura do Sistema
A plataforma será dividida em:
- **Frontend:** Next.js (Interface do Professor e Interface do Aluno).
- **Backend:** API e Servidor de Sockets para gestão de progresso, usuários e comunicação em tempo real.
- **Jogos:** Desenvolvidos com **Phaser.js**, organizados em pastas separadas e integrados ao frontend React via módulos de controle.

## Autenticação e Identidade (SMEC Saquarema)
A plataforma utilizará o ecossistema Google Workspace da SMEC para identificação automática:
- **Domínio Institucional:** `@smec.saquarema.rj.gov.br`
- **Professores:** Acesso via e-mail nominal (`nome@smec.saquarema.rj.gov.br`).
- **Alunos:** Identificação automática via e-mail de matrícula (`matricula@smec.saquarema.rj.gov.br`) integrado ao login do Chrome/Chromebook.
- **Fluxo:** Ao abrir a SPA, o sistema deve capturar a identidade do usuário logado no navegador para validar permissões e registrar progresso.

## Stack Tecnológica
- **Framework Web:** Next.js (React)
- **Estilização:** Tailwind CSS
- **Engine de Jogos:** Phaser.js
- **Comunicação Real-time:** WebSockets (Socket.io)
- **Deployment:** Inicialmente local, evoluindo para Nuvem (PWA/SPA instalável).

## Detalhamento das Funcionalidades

### 1. Interface do Professor (Controle e Configuração)
- **Login Institucional:** Acesso via Google Auth com domínio SMEC.
- **Configuração de Jogos:** Seleção e parametrização de desafios da biblioteca modular.
- **Gestão de Sala de Aula:**
    - Geração de **Código de Sala** único exibido em destaque.
    - **Monitoramento em Tempo Real:** Visualização da lista de alunos (nome/matrícula) que entram na sala via Sockets.
- **Controle da Partida:** Comandos de **Iniciar (Play)** e **Pausar** sincronizados para todos os dispositivos dos alunos.

### 2. Interface do Aluno (Participação e Gameplay)
- **Identificação Automática:** O aluno entra na plataforma já identificado pelo seu e-mail institucional.
- **Acesso à Sala:** Inserção do código da sala. O sistema vincula a matrícula do aluno à sessão do professor.
- **Execução do Jogo:**
    - Carregamento do jogo Phaser e interação de acordo com as regras.
    - Estado do jogo (ativo/pausado) controlado remotamente pelo professor.

### 3. Estrutura Modular dos Jogos
- **Pastas Separadas:** Organização isolada de cada jogo para fácil manutenção e expansão.
- **Módulos de Controle React:** Componentes que gerenciam a ponte entre a UI do Next.js e o motor Phaser.
