import { Link } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { TopBar } from "../../components/TopBar/TopBar";
import style from "./_consultas.module.css";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Table } from "react-bootstrap";
import ConsultaAPI from "../../services/ConsultaAPI";
import { FaClipboardList, FaDeleteLeft } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

export function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [consultaSelecionado, setConsultaSelecionado] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);

  const handleDeletar = async () => {
    try {
      await ConsultaAPI.DefinirSituacaoAsync(consultaSelecionado.Id);
      setConsultas(consultas.filter((u) => u.Id !== consultaSelecionado.Id));
    } catch (error) {
      console.error("Erro ao  deletar consulta: ", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setConsultaSelecionado(null);
  };

  const handleClickDeletar = (consulta) => {
    setConsultaSelecionado(consulta);
    setMostrarModal(true);
  };

  useEffect(() => {
    async function buscarConsultas(ativo) {
      try {
        const resultado = await ConsultaAPI.ListarAsync(ativo);
        setConsultas(resultado);
        console.log(resultado);
      } catch (error) {
        console.error("Erro ao carregar consultas:", error);
        setConsultas([]);
      }
    }

    buscarConsultas(true);
  }, []);

  const colunas = [
    { titulo: "Paciente" },
    { titulo: "Dentista" },
    { titulo: "Data" },
    { titulo: "Status" },
    { titulo: "Ações", className: style.colunaAcoes },
  ];

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.pagina_cabecalho}>
            <h1>Consultas</h1>
            <Link to={"/consulta/novo"} className={style.botao_novo}>
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
                {consultas.length > 0 ? (
                  consultas.map((consulta) => (
                    <tr key={consulta.id}>
                      <td>{consulta.pacienteNome}</td>
                      <td>{consulta.dentistaNome}</td>
                      <td>
                        {new Date(consulta.dataConsulta).toLocaleDateString(
                          "pt-BR",
                        )}
                      </td>
                      <td>{consulta.status}</td>
                      <td className={`${style.colunaAcoes}  pe-3`}>
                        <Link
                          to={"/consulta/detalhes"}
                          state={{ id: consulta.id }}
                          className={style.botao_detalhar}
                        >
                          <FaClipboardList />
                        </Link>
                        <Link
                          to="/consulta/editar"
                          state={{ id: consulta.Id }}
                          className={style.botao_editar}
                        >
                          <FaUserEdit />
                        </Link>
                        <Button
                          variant=""
                          onClick={() => handleClickDeletar(consulta)}
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
                      Nenhum consulta encontrado
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
            Tem certeza que deseja excluir o consulta{" "}
            {consultaSelecionado?.nome}?
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
