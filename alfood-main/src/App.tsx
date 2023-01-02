import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormRestaurante from './paginas/AdministracaoRestaurantes/Restaurante/FormRestaurante';
import AdministraçaoRestaurantes from './paginas/AdministracaoRestaurantes/Restaurante/AdministraçaoRestaurantes';
import Pratos from './paginas/AdministracaoRestaurantes/Pratos/Pratos';
import FormPrato from './paginas/AdministracaoRestaurantes/Pratos/FormPrato';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministraçaoRestaurantes />} />
      <Route path="/admin/novoRestaurante" element={<FormRestaurante/>} />
      <Route path="/admin/restaurantes/:id" element={<FormRestaurante/>} />
      <Route path="/admin/pratos" element={<Pratos/>} />
      <Route path="/admin/novoPrato" element={<FormPrato/>} />
      <Route path="/admin/prato/:id" element={<FormRestaurante/>} />




    </Routes>
  );
}

export default App;
