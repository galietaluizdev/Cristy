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
  async AtualizarAsync({id, nome, email, telefone, dataDeNascimento}) {
    try {
      const envelope = {
        id: id,
        nome: nome,
        email: email,
        telefone: telefone,
        dataDeNascimento: dataDeNascimento
      }
      await HTTPClient.put(`/Paciente/Atualizar/`, envelope);
    } catch (error) {
      console.error("Erro ao atualizar paciente: ", error);
      throw error;
    }
  },
  async BuscarAsync(id) {
    try {
      const response = await HTTPClient.get(`/Paciente/Obter/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar paciente:", error);
    }
  },
  async DefinirSituacaoAsync(Id, Ativo) {
    try {
      console.log(Id);
      await HTTPClient.put(`Paciente/DefinirSituacao/${Id}?Ativo=${Ativo}`);
    } catch (error) {
      console.error("Erro ao definir sitação do paciente:", error);
      throw error;
    }
  },
  async CadastrarAsync({ nome, email, telefone, dataDeNascimento }) {
    try {
      const envelope = {
        nome: nome,
        email: email,
        telefone: telefone,
        dataDeNascimento: dataDeNascimento,
      };
      await HTTPClient.post(`/Paciente/Cadastrar/`, envelope);
    } catch (error) {
      console.error("Erro ao cadastrar paciente: ", error);
      throw error;
    }
  },
};
export default PacienteAPI;
