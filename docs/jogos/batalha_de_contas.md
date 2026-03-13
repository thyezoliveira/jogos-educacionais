# Jogo: Batalha de Contas

## 🎯 Objetivo
Um jogo de competição matemática em tempo real onde duas equipes (Azul e Vermelha) disputam quem resolve operações matemáticas com maior agilidade e precisão.

## 🎨 Visual e Ambientação
- **Cenário:** Fundo dinâmico com elementos matemáticos.
- **Equipe Azul (Esquerda):** Calculadora azul e lista de jogadores da equipe.
- **Equipe Vermelha (Direita):** Calculadora vermelha e lista de jogadores da equipe.
- **Área Central:** Exibição da operação matemática (ex: `15 + 7 = ?`) e cronômetro.

## 👥 Dinâmica de Equipes e Gerenciamento de Turnos

### 1. Fila de Jogadores (Turnos por Equipe)
- Cada equipe (Azul e Vermelha) possui sua própria **fila de jogadores** (baseada na ordem de entrada na sala).
- **Apenas um jogador de cada equipe joga por vez.**
- Quando o jogador atual do Time Azul acerta a conta:
    - O ponto é computado para o time.
    - Ele vai para o final da fila do seu time.
    - O próximo jogador da fila do Time Azul assume o controle imediatamente.
- A mesma lógica se aplica de forma independente ao Time Vermelho.

### 2. Interface do Aluno (Chromebook)
- **Estado "Sua Vez":** A calculadora de resposta fica ativa, o teclado numérico é exibido e a tela brilha na cor do time.
- **Estado "Aguardando":** A calculadora fica desabilitada (transparente ou com um cadeado visual) e exibe a mensagem: "Aguarde sua vez! [Nome do Colega] está jogando agora".
- O aluno sempre vê a conta atual e o tempo, mas só interage quando for o primeiro da fila do seu time.

### 3. Exibição na Lousa Digital (Painel do Professor)
- As listas laterais mostram os nomes dos alunos em cada equipe.
- O nome do jogador que está "na vez" em cada time fica destacado (ex: com um brilho ou uma seta).
- Ao ocorrer a troca de turno, há uma animação de transição na lista para mostrar o novo jogador assumindo a calculadora.

## 🕹️ Mecânicas de Gameplay

### Configurações de Conteúdo
- **Tipos de Operação:** O professor pode selecionar uma ou mais operações para a partida:
    - **Soma (+)**
    - **Subtração (-)**
    - **Multiplicação (×)**
    - **Divisão (÷)**
- **Níveis de Dificuldade (Ano Escolar):**
    - O nível ajusta automaticamente o intervalo numérico e a complexidade das contas (ex: 1º ano com somas até 10, 5º ano com multiplicação e divisão complexas).

### Fluxo de Partida
- **Sistema de Tempo:** Limite de **10 segundos** por questão.
- **Sincronização:** Se o jogador da vez não responder em 10 segundos, a vez passa para o próximo da fila do seu time e uma nova conta é gerada.
- O cronômetro central na lousa dita o ritmo para todos, mas os acertos são independentes por equipe.

## 🛠️ Integração com a Plataforma (Professor)
- **Painel de Configuração Pré-Jogo:**
    - Seleção do **Ano Escolar** dos alunos.
    - Escolha das **Operações** (pode misturar soma e subtração, por exemplo).
    - Definição do tempo por questão e pontuação para vitória.
- **Controle em Tempo Real:**
    - Visualização de quem é o próximo de cada fila.
    - Botão de "Pular Vez" e controle de Iniciar/Pausar.

## 🚀 Tecnologias
- **Engine:** Phaser.js.
- **Comunicação:** Socket.io (Eventos de `turn_change`, `correct_answer`, `timeout`, `config_update`).
