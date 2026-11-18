import { HTTPClient } from "./client";

const ConsultaAPI = {
  async CadastrarAsync({ dataDaConsulta, paciente, dentista, descricao }) {
    try {
      const envelope = {
        dataConsulta: dataDaConsulta,
        pacienteId: paciente,
        dentistaId: dentista,
        descricao: descricao,
      };
      console.log(envelope);
      await HTTPClient.post(`/Consulta/Cadastrar`, envelope);
    } catch (error) {
      console.error("Erro ao cadastrar consulta: ", error);
      throw error;
    }
  },
  async ListarAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Consulta/Listar?Ativo=${ativos}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar consultas:", error);
      throw error;
    }
  },
  async AtualizarAsync({ id, dataConsulta, descricao }) {
    try {
      const envelope = {
        id: id,
        dataConsulta: dataConsulta,
        descricao: descricao,
      };
      await HTTPClient.put(`/Consulta/Atualizar`, envelope);
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
  async DefinirSituacaoAsync(Id, Ativo) {
    try {
      console.log(Id);
      await HTTPClient.put(`Consulta/DefinirSituacao/${Id}?Ativo=${Ativo}`);
    } catch (error) {
      console.error("Erro ao definir situação do dentista:", error);
      throw error;
    }
  },
};

export default ConsultaAPI;
