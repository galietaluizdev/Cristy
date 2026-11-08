import { HTTPClient } from "./client";

const ConsultaAPI = {
  async ListarAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Consulta/Listar?Ativo=${ativos}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar consultas:", error);
      throw error;
    }
  },
  async BuscarPorId(Id) {
    try {
      const response = await HTTPClient.get(`/Consulta/Obter/${Id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar consulta:", error);
      throw error;
    }
  },
};

export default ConsultaAPI;
