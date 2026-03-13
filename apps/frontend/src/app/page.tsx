import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-5xl font-black mb-4 text-center">Jogos Educativos SMEC</h1>
      <p className="text-xl mb-12 text-blue-200 text-center max-w-2xl">
        Plataforma interativa de aprendizagem em tempo real para a rede municipal de Saquarema.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link href="/professor" className="group bg-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">
          <div className="text-4xl mb-4 group-hover:animate-bounce">👩‍🏫</div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Interface do Professor</h2>
          <p className="text-gray-600">Crie salas, gerencie turmas e controle a lousa digital em tempo real.</p>
        </Link>

        <Link href="/aluno" className="group bg-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all">
          <div className="text-4xl mb-4 group-hover:animate-bounce">👨‍🎓</div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Interface do Aluno</h2>
          <p className="text-gray-600">Entre na sala com seu e-mail institucional e participe das batalhas matemáticas.</p>
        </Link>
      </div>

      <footer className="absolute bottom-8 text-blue-300 text-sm">
        Prefeitura de Saquarema - Secretaria Municipal de Educação
      </footer>
    </div>
  );
}
