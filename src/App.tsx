import { Routes, Route, Navigate } from "react-router-dom";
import ClienteRoutes from '@/routes/clienteRoutes'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cliente-final/home" replace />} />
      <Route path="/cliente-final/*" element={<ClienteRoutes />} />
    </Routes>
  )
}
