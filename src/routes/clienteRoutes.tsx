import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/home';
import Agendar from '../pages/agendar';
import EscanearQr from '@/pages/escanerQr';

export default function ClienteRoutes() {

  return (
    <Routes>
      <Route path='home' element={<Home />} />
      <Route path='escanear' element={<EscanearQr />} />
      <Route path='agendar' element={<Agendar />} />
    </Routes>
  )
}