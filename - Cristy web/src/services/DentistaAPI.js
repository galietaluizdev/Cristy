import {HTTPClient } from "./client";

const DentistaAPI = {
  async ListarAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Dentista/Listar?Ativo=${ativos}`,
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao listar dentistas:", error);
      throw error;
    }
  },
};
export default DentistaAPI;