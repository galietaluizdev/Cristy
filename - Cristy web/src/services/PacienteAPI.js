import { HTTPClient } from "./client";

const PacienteAPI = {
  async ListarAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Paciente/Listar?Ativo=${ativos}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);
      throw error;
    }
  },
  async AtualizarAsync(paciente) {
    try {
      console.log(paciente)
      await HTTPClient.put(`/Paciente/Atualizar`,paciente);
    } catch (error) {}
  },
  async BuscarAsync(id) {
    try {
      const response = await HTTPClient.get(`/Paciente/Obter/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  },
};
export default PacienteAPI;
