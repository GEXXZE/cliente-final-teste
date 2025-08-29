import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/cliente-final/home';
import Agendar from '../pages/cliente-final/agendar';
import EscanearQr from '@/pages/cliente-final/escanerQr';

export default function ClienteRoutes() {

  return (
    <Routes>
      <Route path='home' element={<Home />} />
      <Route path='escanear' element={<EscanearQr />} />
      <Route path='agendar' element={<Agendar />} />
    </Routes>
  )
}