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
  async AtualizarAsync({
    id,
    nome,
    email,
    telefone,
    dataDeNascimento,
    cro,
    especialidade,
  }) {
    try {
      const envelope = {
        id: id,
        nome: nome,
        email: email,
        telefone: telefone,
        dataDeNascimento: dataDeNascimento,
        cro: cro,
        especialidade: especialidade,
      };
      await HTTPClient.put(`/Dentista/Atualizar`, envelope);
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
  async DefinirSituacaoAsync(Id, Ativo) {
    try {
      console.log(Id);
      await HTTPClient.put(`Dentista/DefinirSituacao/${Id}?Ativo=${Ativo}`);
    } catch (error) {
      console.error("Erro ao definir situação do dentista:", error);
      throw error;
    }
  },
  async CadastrarAsync({
    nome,
    email,
    telefone,
    dataDeNascimento,
    cro,
    especialidade,
  }) {
    try {
      const envelope = {
        nome: nome,
        email: email,
        telefone: telefone,
        dataDeNascimento: dataDeNascimento,
        cro: cro,
        especialidade: especialidade,
      };
      await HTTPClient.post(`/Dentista/Cadastrar/`, envelope);
    } catch (error) {
      console.error("Erro ao cadastrar dentista: ", error);
      throw error;
    }
  },
};
export default DentistaAPI;
