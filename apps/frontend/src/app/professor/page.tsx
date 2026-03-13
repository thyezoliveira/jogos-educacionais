'use client';

import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';

export default function ProfessorPage() {
  const { socket, isConnected } = useSocket();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [scores, setScores] = useState({ azul: 0, vermelha: 0 });

  useEffect(() => {
    if (!socket) return;

    socket.on('room:created', (id) => setRoomId(id));
    socket.on('room:players_update', (p) => setPlayers(p));
    socket.on('game:update', (data) => setScores(data.scores));

    return () => {
      socket.off('room:created');
      socket.off('room:players_update');
      socket.off('game:update');
    };
  }, [socket]);

  const createRoom = () => {
    socket?.emit('room:create', {
      difficulty: 1,
      operations: ['+'],
      timePerQuestion: 10
    });
  };

  const startGame = () => {
    if (roomId) {
      socket?.emit('game:start', roomId);
      setGameStarted(true);
    }
  };

  const pauseGame = () => {
    if (roomId) socket?.emit('game:pause', roomId);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Painel do Professor - SMEC</h1>
        <div className={`px-4 py-2 rounded ${isConnected ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {isConnected ? 'Conectado' : 'Desconectado'}
        </div>
      </header>

      {!roomId ? (
        <div className="flex justify-center">
          <button 
            onClick={createRoom}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg"
          >
            Criar Nova Sala
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-6 rounded-xl shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-xl text-gray-600">Código da Sala</h2>
              <div className="text-8xl font-black text-blue-600 tracking-widest">{roomId}</div>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              {!gameStarted ? (
                <button onClick={startGame} className="bg-green-500 text-white px-6 py-3 rounded-md font-bold text-lg">
                  Iniciar Partida (Play)
                </button>
              ) : (
                <button onClick={pauseGame} className="bg-yellow-500 text-white px-6 py-3 rounded-md font-bold text-lg">
                  Pausar Partida
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <h3 className="text-blue-800 font-bold mb-2">Time Azul: {scores.azul} pts</h3>
                <ul className="space-y-1">
                  {players.filter(p => p.team === 'azul').map(p => (
                    <li key={p.id} className="text-blue-600">• {p.name}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <h3 className="text-red-800 font-bold mb-2">Time Vermelho: {scores.vermelha} pts</h3>
                <ul className="space-y-1">
                  {players.filter(p => p.team === 'vermelha').map(p => (
                    <li key={p.id} className="text-red-600">• {p.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Configurações do Jogo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ano Escolar</label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  <option>1º Ano</option>
                  <option>2º Ano</option>
                  <option>3º Ano</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Operações</label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center"><input type="checkbox" checked readOnly /> Soma</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
