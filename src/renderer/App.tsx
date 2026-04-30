import { useState, useEffect } from 'react'

function App() {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking')

  useEffect(() => {
    window.api.invoke('products', 'getAll')
      .then((data) => {
        console.log(data);
        setDbStatus('connected');
      })
      .catch(() => setDbStatus('error'));
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-brand-bg text-white font-sans">
      {/* 1. Titlebar (Sincronizada com o Main Process) */}
      <header className="titlebar border-b border-brand-border bg-brand-dark">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-white-400">
            Boilerplate Desktop <span className="text-amber-500">v{window.api.version}</span>
          </span>
        </div>
      </header>

      {/* 2. Área de Conteúdo Principal */}
      <main className="content flex-1 p-8 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-brand-dark via-brand-bg to-brand-bg">
        
        {/* Header de Boas-vindas */}
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex justify-center gap-6 mb-6">
            <img 
              src="https://www.electronjs.org/assets/img/logo.svg" 
              className="h-20 drop-shadow-[0_0_15px_rgba(71,171,194,0.4)] hover:scale-110 transition-transform animate-[spin_20s_linear_infinite]" 
              alt="Electron logo" 
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
              className="h-20 drop-shadow-[0_0_15px_rgba(97,218,251,0.4)] animate-[spin_20s_linear_infinite]" 
              alt="React logo" 
            />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Boilerplate <span className="text-amber-500">Desktop</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Electron, Node.js, Supabase, React & Tailwind.
          </p>
        </section>

        {/* Grid de Status (Cards Modernos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          
          <StatusCard 
            label="Ambiente" 
            value={window.api.status} 
            icon="🛠️" 
          />
          
          <StatusCard 
            label="Arquitetura" 
            value="Context Isolated" 
            icon="🔒" 
          />

          {/* Database Status Card */}
          <div className="bg-brand-dark/50 border border-brand-border p-5 rounded-xl backdrop-blur-sm shadow-xl transition-all hover:border-brand-accent/50 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Database</span>
              <span className="text-xl">🗄️</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                dbStatus === 'connected' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 
                dbStatus === 'error' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-yellow-500'
              }`} />
              <span className={`font-mono text-sm font-bold ${
                dbStatus === 'connected' ? 'text-green-400' : 
                dbStatus === 'error' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {dbStatus === 'checking' && 'VERIFICANDO...'}
                {dbStatus === 'connected' && 'ONLINE'}
                {dbStatus === 'error' && 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Informativo */}
        <footer className="mt-12 pt-6 border-t border-brand-border/30 w-full max-w-lg">
          <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
            <span>Process: <span className="text-gray-300">Renderer</span></span>
            <span>Engine: <span className="text-gray-300">Vite + Tailwind v4</span></span>
            <span>Uptime: <span className="text-gray-300">Stable</span></span>
          </div>
        </footer>
      </main>
    </div>
  )
}

// Sub-componente para manter o código limpo
function StatusCard({ label, value, icon }: { label: string, value: string, icon: string }) {
  return (
    <div className="bg-brand-dark/50 border border-brand-border p-5 rounded-xl backdrop-blur-sm shadow-xl transition-all hover:border-brand-accent/50 group text-left">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</span>
        <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>
      <div className="text-sm font-mono text-brand-accent truncate">
        {value.toUpperCase()}
      </div>
    </div>
  )
}

export default App