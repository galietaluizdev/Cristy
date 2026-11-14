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
  async AtualizarAsync(consulta) {
    try {
      console.log(consulta);
      await HTTPClient.put(`/Consulta/Atualizar`, consulta);
    } catch (error) {
      console.error("Erro ao atualizar consulta: ", error);
      throw error;
    }
  },
  async BuscarPorIdAsync(Id) {
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
