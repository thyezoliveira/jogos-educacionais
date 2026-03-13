'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';

export default function AlunoPage() {
  const { socket, isConnected } = useSocket();
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('aluno@smec.saquarema.rj.gov.br'); // Simulação
  const [joined, setJoined] = useState(false);
  const [playerData, setPlayerData] = useState<any>(null);
  const [gameState, setGameState] = useState<any>(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (!socket) return;

    socket.on('room:joined', (data) => {
      setJoined(true);
      setPlayerData(data.player);
    });

    socket.on('game:started', (data) => {
      setGameState(data);
    });

    socket.on('game:update', (data) => {
      setGameState(data);
    });

    return () => {
      socket.off('room:joined');
      socket.off('game:started');
      socket.off('game:update');
    };
  }, [socket]);

  const joinRoom = () => {
    if (roomId && name) {
      socket?.emit('room:join', { roomId, name, email });
    }
  };

  const sendAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && answer) {
      socket.emit('game:answer', { roomId, answer: parseInt(answer) });
      setAnswer('');
    }
  };

  const isMyTurn = gameState && playerData && gameState.queues[playerData.team][0] === socket?.id;

  if (!joined) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Entrar na Sala SMEC</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Código da Sala</label>
              <input 
                type="text" 
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 uppercase text-center text-2xl font-bold"
                placeholder="EX: AB12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Seu Nome</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nome do Aluno"
              />
            </div>
            <p className="text-xs text-gray-500 text-center italic">{email}</p>
            <button 
              onClick={joinRoom}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-colors"
            >
              ENTRAR NO JOGO
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${playerData.team === 'azul' ? 'bg-blue-600' : 'bg-red-600'} p-4 flex flex-col items-center justify-center text-white`}>
      <header className="absolute top-4 w-full px-8 flex justify-between items-center">
        <div className="text-xl font-bold">Time {playerData.team.toUpperCase()}</div>
        <div>{playerData.name}</div>
      </header>

      {!gameState ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 animate-pulse">Aguardando o professor...</h2>
          <p>Você entrou na sala {roomId}. Prepare-se!</p>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl">
          {isMyTurn ? (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">SUA VEZ!</h2>
              <div className="text-6xl font-black mb-8">
                {gameState.question.a} {gameState.question.op} {gameState.question.b} = ?
              </div>
              <form onSubmit={sendAnswer} className="flex gap-2">
                <input 
                  autoFocus
                  type="number" 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl text-3xl font-bold text-gray-900 border-none outline-none"
                  placeholder="?"
                />
                <button type="submit" className="bg-green-500 hover:bg-green-400 px-8 rounded-xl font-bold text-xl">
                  ENVIAR
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center opacity-60">
              <h2 className="text-2xl font-bold mb-4">Aguarde sua vez...</h2>
              <p className="mb-4">Seus colegas estão jogando agora.</p>
              <div className="text-4xl font-black mb-4">
                {gameState.question.a} {gameState.question.op} {gameState.question.b} = ?
              </div>
              <div className="text-sm bg-black/20 p-2 rounded">
                Placar: {gameState.scores.azul} vs {gameState.scores.vermelha}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
