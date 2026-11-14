import { HTTPClient } from "./client";

const DentistaAPI = {
  async ListarAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Dentista/Listar?Ativo=${ativos}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar dentistas:", error);
      throw error;
    }
  },
  async AtualizarAsync(dentista) {
    try {
      console.log(dentista);
      await HTTPClient.put(`/Dentista/Atualizar`, dentista);
    } catch (error) {
      console.error("Erro ao atualizar dentista: ", error);
      throw error;
    }
  },
  async BuscarAsync(id) {
    try {
      const response = await HTTPClient.get(`/Dentista/Obter/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dentista:", error);
    }
  },
    async DefinirSituacaoAsync(Id , Ativo){
    try {
      console.log(Id)
      await HTTPClient.put(`Dentista/DefinirSituacao/${Id}?Ativo=${Ativo}`)
    } catch (error) {
      console.error("Erro ao definir situação do dentista:", error);
      throw error;
    }
  }
};
export default DentistaAPI;
