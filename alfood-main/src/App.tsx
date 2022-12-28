import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurantes/AdministraçaoRestaurantes';
import FormRestaurante from './paginas/AdministracaoRestaurantes/FormRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/novoRestaurante" element={<FormRestaurante/>} />
      <Route path="/admin/restaurantes/:id" element={<FormRestaurante/>} />


    </Routes>
  );
}

export default App;
