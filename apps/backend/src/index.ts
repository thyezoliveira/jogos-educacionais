import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

interface Player {
  id: string;
  name: string;
  email: string;
  team: 'azul' | 'vermelha';
}

interface Room {
  id: string;
  game: string;
  status: 'idle' | 'playing' | 'paused';
  players: Player[];
  config: {
    difficulty: number;
    operations: string[];
    timePerQuestion: number;
  };
  currentQuestion?: {
    a: number;
    b: number;
    op: string;
    ans: number;
  };
  scores: { azul: number; vermelha: number };
  queues: { azul: string[]; vermelha: string[] };
}

const rooms: Map<string, Room> = new Map();

function generateCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function generateQuestion(config: Room['config']) {
  const a = Math.floor(Math.random() * (config.difficulty * 10)) + 1;
  const b = Math.floor(Math.random() * (config.difficulty * 10)) + 1;
  const op = config.operations[Math.floor(Math.random() * config.operations.length)];
  let ans = 0;
  switch (op) {
    case '+': ans = a + b; break;
    case '-': ans = a - b; break;
    case '*': ans = a * b; break;
    case '/': ans = Math.floor(a / b); break;
  }
  return { a, b, op, ans };
}

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('room:create', (config) => {
    const roomId = generateCode();
    const room: Room = {
      id: roomId,
      game: 'batalha-de-contas',
      status: 'idle',
      players: [],
      config,
      scores: { azul: 0, vermelha: 0 },
      queues: { azul: [], vermelha: [] }
    };
    rooms.set(roomId, room);
    socket.join(roomId);
    socket.emit('room:created', roomId);
    console.log(`Room created: ${roomId}`);
  });

  socket.on('room:join', ({ roomId, name, email }) => {
    const room = rooms.get(roomId);
    if (!room) {
      socket.emit('error', 'Sala não encontrada');
      return;
    }

    const team = room.queues.azul.length <= room.queues.vermelha.length ? 'azul' : 'vermelha';
    const player: Player = { id: socket.id, name, email, team };
    
    room.players.push(player);
    room.queues[team].push(socket.id);
    
    socket.join(roomId);
    socket.emit('room:joined', { team, player, config: room.config });
    io.to(roomId).emit('room:players_update', room.players);
    console.log(`Player ${name} joined room ${roomId} in team ${team}`);
  });

  socket.on('game:start', (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      room.status = 'playing';
      room.currentQuestion = generateQuestion(room.config);
      io.to(roomId).emit('game:started', { 
        question: room.currentQuestion,
        queues: room.queues
      });
    }
  });

  socket.on('game:pause', (roomId) => {
    const room = rooms.get(roomId);
    if (room) {
      room.status = 'paused';
      io.to(roomId).emit('game:paused');
    }
  });

  socket.on('game:answer', ({ roomId, answer }) => {
    const room = rooms.get(roomId);
    if (!room || room.status !== 'playing') return;

    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;

    // Check if it's player's turn
    const isPlayerTurn = room.queues[player.team][0] === socket.id;
    if (!isPlayerTurn) return;

    if (answer === room.currentQuestion?.ans) {
      room.scores[player.team] += 1;
      // Rotate queue
      const finishedPlayer = room.queues[player.team].shift();
      if (finishedPlayer) room.queues[player.team].push(finishedPlayer);
      
      room.currentQuestion = generateQuestion(room.config);
      io.to(roomId).emit('game:update', {
        scores: room.scores,
        question: room.currentQuestion,
        queues: room.queues,
        lastWinner: player.name
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Cleanup room players if necessary
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
