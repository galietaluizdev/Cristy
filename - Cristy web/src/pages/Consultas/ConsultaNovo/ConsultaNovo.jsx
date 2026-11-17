import style from "./_consultaNovo.module.css";
import { data, useNavigate } from "react-router-dom";
import { BottomBar } from "../../../components/BottomBar/BottomBar";
import { useEffect, useState } from "react";
import { TopBar } from "../../../components/TopBar/TopBar";
import { Button, Form } from "react-bootstrap";
import DentistaAPI from "../../../services/DentistaAPI";
import ConsultaAPI from "../../../services/ConsultaAPI";
import PacienteAPI from "../../../services/PacienteAPI";

export function ConsultaNovo() {
  const [dataDaConsulta, setDataDaConsulta] = useState(``);
  const [descricao, setDescricao] = useState(``);

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState();

  const [dentistas, setDentistas] = useState([]);
  const [dentista, setDentista] = useState();

  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  const isFormValid = async () => {
    return (
      dataDaConsulta &&
      paciente > 0 &&
      dentista > 0 &&
      descricao.trim().length < 1000
    );
  };

  useEffect(() => {
    const Buscar = async () => {
      try {
        const PacientesBuscados = await PacienteAPI.ListarAsync(true);
        setPacientes(PacientesBuscados);
        console.log(PacientesBuscados);

        const DentistasBuscados = await DentistaAPI.ListarAsync(true);
        setDentistas(DentistasBuscados);
        console.log(DentistasBuscados);
      } catch (error) {
        console.error("Erro ao listar informações ", error);
      }
    };
    Buscar();
  }, []);

useEffect(() => {
    console.log(paciente)
    console.log(dentista)
}, [paciente])
  const handleSubmit = async (e) => {
    try {
      setSalvando(true);
      console.log(paciente, "  ",dentista)
      e.preventDefault();
      if (isFormValid()) {
        await ConsultaAPI.CadastrarAsync({dataDaConsulta,paciente,dentista,descricao});
        navigate("/consultas");
      }
    } catch (error) {
      console.error("Erro ao criar tarefa: ", error);
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    navigate("/consultas");
  };

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.cabecalho}>
            <h3 className={style.titulo}>Nova Consulta</h3>
          </div>

          <div className={style.campo}>
            <Form className={style.formulario} onSubmit={handleSubmit}>
              <Form.Group controlId="formDataDaConsulta" className="mb-3">
                <Form.Label>Data da Consulta</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Insira a data da Consulta"
                  name="dataDaConsulta"
                  className={style.input}
                  value={dataDaConsulta}
                  disabled={salvando}
                  onChange={(e) => setDataDaConsulta(e.target.value)}
                  required
                />
                <Form.Text className={style.orientacao}>
                  Insira data de nascimento do dentista
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="descricao" className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dados clinicos e relatos..."
                  name="descricao"
                  className={style.input}
                  value={descricao}
                  disabled={salvando}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
                <Form.Text className={style.orientacao}>
                  Insira a descrição da consulta a ser processada e registrada
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formPaciente" className="mb-3">
                <Form.Label>Paciente</Form.Label>
                <Form.Control
                  as="select"
                  name="paciente"
                  className={style.input}
                  value={paciente}
                  disabled={salvando}
                  onChange={(e) => setPaciente(parseInt(e.target.value) || 0)}
                  required
                >
                    <option></option>
                  {pacientes.map((paciente) => (
                    
                    <option key={paciente.Id} value={paciente.id}>
                    Nome: {paciente.nome } - Email: {paciente.email}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className={style.orientacao}>
                  Selecione o paciente que foi consultado
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="Dentista" className="mb-3">
                <Form.Label>Dentista</Form.Label>
                <Form.Control
                  as="select"
                  name="paciente"
                  placeholder="Dentista"
                  className={style.input}
                  value={dentista}
                  disabled={salvando}
                  onChange={(e) => setDentista(parseInt(e.target.value) || 0)}
                  required
                >
                    <option></option>
                  {dentistas.map((dentista) => (
                    <option key={dentista.Id} value={dentista.id}>
                    Nome: {dentista.nome } - {dentista.cro}
                    </option>
                  ))}
                </Form.Control>
                <Form.Text className={style.orientacao}>
                  Selecione o dentista que realizou a consulta
                </Form.Text>
              </Form.Group>

              <div className={style.acoes}>
                <Button
                  type="button"
                  variant="secondary"
                  className={style.botao_cancelar}
                  onClick={handleCancelar}
                  disabled={salvando}
                >
                  Cancelar
                </Button>
                <Button
                  className={style.botao_salvar}
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid()}
                >
                  {salvando ? "Salvando tarefa" : "Salvar"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </TopBar>
    </BottomBar>
  );
}
export default ConsultaNovo;
