import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Pacientes } from "./pages/Pacientes/Pacientes";
import { Dentistas } from "./pages/Dentistas/Dentistas";
import { Consultas } from "./pages/Consultas/Consultas";
import { ConsultaDetalhada } from "./pages/Consultas/ConsultaDetalhada/ConsultaDetalhada";
import { PacienteEditar } from "./pages/Pacientes/PacienteEditar/PacienteEditar";
import { DentistaEditar } from "./pages/Dentistas/DentistaEditar/DentistaEditar";
import { ConsultaEditar } from "./pages/Consultas/ConsultaEditar/ConsultaEditar";
import { PacienteNovo } from "./pages/Pacientes/PacienteNovo/PacienteNovo";
import { DentistaNovo } from "./pages/Dentistas/DentistaNovo/DentistaNovo";
import { ConsultaNovo } from "./pages/Consultas/ConsultaNovo/ConsultaNovo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={}/> */}
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/paciente/editar" element={<PacienteEditar />} />
        <Route path="/paciente/novo" element={<PacienteNovo />} />

        <Route path="/dentistas" element={<Dentistas />} />
        <Route path="/dentista/editar" element={<DentistaEditar />} />
        <Route path="/dentista/novo" element={<DentistaNovo />} />
        
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/consulta/detalhes" element={<ConsultaDetalhada />} />
        <Route path="/consulta/editar" element={<ConsultaEditar />} />
        <Route path="/consulta/novo" element={<ConsultaNovo />} />


      </Routes>
    </BrowserRouter>
  );
}
export default App;
