import style from "./_pacientes.module.css";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { TopBar } from "../../components/TopBar/TopBar";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Table,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import PacienteAPI from "../../services/PacienteAPI";

export function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const handleDeletar = async () => {
    try {
      await PacienteAPI.DefinirSituacaoAsync(pacienteSelecionado.id, false);
      setPacientes(pacientes.filter((u) => u.id !== pacienteSelecionado.id));
    } catch (error) {
      console.error("Erro ao  deletar paciente: ", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setPacienteSelecionado(null);
  };

  const handleClickDeletar = (paciente) => {
    setPacienteSelecionado(paciente);
    setMostrarModal(true);
  };

  useEffect(() => {
    async function buscarPacientes(ativo) {
      try {
        const resultado = await PacienteAPI.ListarAsync(ativo);
        setPacientes(resultado);
        console.log(resultado);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
        setPacientes([]);
      }
    }

    buscarPacientes(true);
  }, []);

  const colunas = [
    { titulo: "Nome" },
    { titulo: "Email" },
    { titulo: "Telefone" },
    { titulo: "Nascimento" },
    { titulo: "Ações", className: style.colunaAcoes },
  ];

  const formatarTelefone = (t) =>
    t?.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.pagina_cabecalho}>
            <h1>Pacientes</h1>
            <Link to={"/paciente/novo"} className={style.botao_novo}>
              + Novo
            </Link>
          </div>
        </div>

        <div className={style.tabela}>
          <div className={style.tabela_rolagem}>
            <Table hover className="align-middle">
              <thead className={style.tabela_cabecalho}>
                <tr>
                  {colunas.map((coluna) => (
                    <th key={coluna.titulo} className={coluna.className}>
                      {coluna.titulo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={style.tabela_corpo}>
                {pacientes.length > 0 ? (
                  pacientes.map((paciente) => (
                    <tr key={paciente.id}>
                      <td>
                        {paciente.nome.length > 30
                          ? paciente.nome.slice(0, 30) + "..."
                          : paciente.nome}
                      </td>
                      <td>
                        {paciente.email.length > 30
                          ? paciente.email.slice(0, 30) + "..."
                          : paciente.email}
                      </td>
                      <td>{formatarTelefone(paciente.telefone)}</td>
                      <td>
                        {new Date(paciente.dataDeNascimento).toLocaleDateString(
                          "pt-BR",
                          {
                            timeZone: "UTC",
                          },
                        )}
                      </td>
                      <td className={`${style.colunaAcoes}  pe-2`}>
                        <Link
                          to="/paciente/editar"
                          state={{ id: paciente.id }}
                          className={style.botao_editar}
                        >
                          <FaUserEdit />
                        </Link>
                        <Button
                          variant=""
                          onClick={() => handleClickDeletar(paciente)}
                          className={style.botao_deletar}
                        >
                          <FaDeleteLeft />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={colunas.length} className="text-center">
                      Nenhum paciente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <Modal show={mostrarModal} onHide={handleFecharModal}>
          <ModalHeader closeButton>
            <ModalTitle>Confirmar Exclusão</ModalTitle>
          </ModalHeader>
          <ModalBody>
            Tem certeza que deseja excluir o paciente{" "}
            <strong>
              {pacienteSelecionado?.nome?.length > 30
                ? pacienteSelecionado?.nome?.slice(0, 30) + "..."
                : pacienteSelecionado?.nome}
              ?
            </strong>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={handleFecharModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeletar}>
              Confirmar
            </Button>
          </ModalFooter>
        </Modal>
      </TopBar>
    </BottomBar>
  );
}
