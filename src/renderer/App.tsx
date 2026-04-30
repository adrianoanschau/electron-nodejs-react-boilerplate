import { useState, useEffect } from 'react'
import './assets/index.css'

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
    <div className="App">
      <div>
        <a href="https://electronjs.org" target="_blank" rel="noreferrer">
          <img src="https://www.electronjs.org/assets/img/logo.svg" className="logo" alt="Electron logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Electron + React Template</h1>
      
      <div className="card">
        <div className="status-grid">
          <div className="status-item">
            <span>Runtime:</span>
            <code className="status-tag">Node.js</code>
          </div>
          <div className="status-item">
            <span>Bridge:</span>
            <code className="status-tag">Context Isolated</code>
          </div>
          <div className="status-item">
            <span>Database:</span>
            <code className={`status-tag ${dbStatus}`}>
              {dbStatus === 'checking' && 'Verificando...'}
              {dbStatus === 'connected' && 'Online'}
              {dbStatus === 'error' && 'Offline/Error'}
            </code>
          </div>
        </div>
      </div>

      <p className="footer">
        Versão do Core: <strong>{window.api.version}</strong> | Ambiente: <strong>{window.api.status}</strong>
      </p>
    </div>
  )
}

export default App
