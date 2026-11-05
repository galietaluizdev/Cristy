import { Link } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { TopBar } from "../../components/TopBar/TopBar";
import style from "./_dentistas.module.css";
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
import DentistaAPI from '../../services/DentistaAPI'

export function Dentistas() {
  const [dentistas, setDentistas] = useState([]);
  const [dentistaSelecionado, setDentistaSelecionado] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);

  const handleDeletar = async () => {
    try {
      await DentistaAPI.DefinirSituacaoAsync(dentistaSelecionado.Id);
      setDentistas(dentistas.filter((u) => u.Id !== dentistaSelecionado.Id));
    } catch (error) {
      console.error("Erro ao  deletar dentista: ", error);
    } finally {
      handleFecharModal();
    }
  };

  const handleFecharModal = () => {
    setMostrarModal(false);
    setDentistaSelecionado(null);
  };

  const handleClickDeletar = (dentista) => {
    setDentistaSelecionado(dentista);
    setMostrarModal(true);
  };

    useEffect(() => {
    async function buscarDentistas(ativo) {
      try {
        const resultado = await DentistaAPI.ListarAsync(ativo)
        setDentistas(resultado);
        console.log(resultado);
      } catch (error) {
        console.error("Erro ao carregar dentistas:", error);
        setDentistas([]);
      }
    }

    buscarDentistas(true);
  }, []);


  const colunas = [
    { titulo: "Nome" },
    { titulo: "Email" },
    { titulo: "Telefone" },
    { titulo: "Nascimento" },
    { titulo: "CRO" },
    { titulo: "Especialidade" },
    { titulo: "Ações", className: `${style.colunaAcoes} pe-5` },
  ];

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.pagina_cabecalho}>
            <h1>Dentistas</h1>
            <Link to={"/dentista/novo"} className={style.botao_novo}>
              + Novo
            </Link>
          </div>
        </div>

        <div className={style.tabela}>
          <Table responsive>
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
              {dentistas.length > 0 ? (
                dentistas.map((dentista) => (
                  <tr key={dentista.id}>
                    <td>{dentista.nome}</td>
                    <td>{dentista.email}</td>
                    <td>{dentista.telefone}</td>
                    <td>{dentista.dataDeNascimento}</td>
                    <td>{dentista.cro}</td>
                    <td>{dentista.especialidade}</td>
                    <td className={`${style.colunaAcoes}  pe-2`}>
                      <Link
                        to="/dentista/editar"
                        state={{ id: dentista.Id }}
                        className={style.botao_editar}
                      >
                        <FaUserEdit />
                      </Link>
                      <Button
                        variant=""
                        onClick={() => handleClickDeletar(dentista)}
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
                    Nenhum dentista encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Modal show={mostrarModal} onHide={handleFecharModal}>
          <ModalHeader closeButton>
            <ModalTitle>Confirmar Exclusão</ModalTitle>
          </ModalHeader>
          <ModalBody>
            Tem certeza que deseja excluir o dentista{" "}
            {dentistaSelecionado?.nome}?
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
