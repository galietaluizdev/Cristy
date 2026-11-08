import {HTTPClient } from "./client";

const PacienteAPI = {
  async ListarAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Paciente/Listar?Ativo=${ativos}`,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao listar pacientes:", error);
      throw error;
    }
  },
};
export default PacienteAPI;