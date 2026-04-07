import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '../styles/index.css'

// Importas ambas páginas
import AuthPage from '../features/auth/pages/AuthPage.jsx'
import RegisterPage from '../features/auth/pages/RegisterPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta para el Login */}
        <Route path="/login" element={<AuthPage />} />

        {/* Ruta para el Registro */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Redirección automática al login si entran a la raíz o ruta inexistente */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)