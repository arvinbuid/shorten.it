import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JwtProvider } from './context/JwtContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JwtProvider>
      <App />
    </JwtProvider>
  </StrictMode>,
)
