import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Pacientes } from "./pages/Pacientes/Pacientes";
import { Dentistas } from "./pages/Dentistas/Dentistas";
import { Consultas } from "./pages/Consultas/Consultas";
import { ConsultaDetalhada } from "./pages/Consultas/ConsultaDetalhada/ConsultaDetalhada";
import { PacienteEditar } from "./pages/Pacientes/PacienteEditar/PacienteEditar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={}/> */}
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/paciente/editar" element={<PacienteEditar />} />
        <Route path="/dentistas" element={<Dentistas />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/consulta/detalhes" element={<ConsultaDetalhada />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
