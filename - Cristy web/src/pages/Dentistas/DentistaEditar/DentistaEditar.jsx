import style from "./_dentistaEditar.module.css";

import { useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { TopBar } from "../../../components/TopBar/TopBar";

import { BottomBar } from "../../../components/BottomBar/BottomBar";
import PacienteAPI from "../../../services/PacienteAPI";
import DentistaAPI from "../../../services/DentistaAPI";

export function DentistaEditar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [id] = useState(location.state?.id);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataDeNascimento, setDataNascimento] = useState("");
  const [cro, setCro] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  const handleCancelar = () => {
    navigate("/dentistas");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        setSalvando(true);
        let dentista = {
          id,
          nome,
          email,
          telefone,
          dataDeNascimento,
          cro,
          especialidade,
        };
        await DentistaAPI.AtualizarAsync(dentista);
        navigate("/dentistas");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    } finally {
      setSalvando(false);
    }
  };

  useEffect(() => {
    async function CarregarPaciente(Id) {
      try {
        setCarregando(true);
        console.log(location.state);
        const dentista = await DentistaAPI.BuscarAsync(Id);
        if (dentista != null) {
          setNome(dentista.nome);
          setEmail(dentista.email);
          setTelefone(dentista.telefone);
          setDataNascimento(dentista.dataDeNascimento);
          setCro(dentista.cro);
          setEspecialidade(dentista.especialidade);
          console.log(dentista);
        }
      } catch (error) {
        console.error("Erro ao buscar dentista:", error);
      } finally {
        setCarregando(false);
      }
    }
    CarregarPaciente(id);
  }, [id]);

  const isFormValid = () => {
    return (
      nome.length < 100 &&
      (email.length < 100) &
        (telefone.length == 11) &
        (cro.length < 20) &
        (especialidade.length < 50)
    );
  };

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.cabecalho}>
            <h3 className={style.titulo}>Editar Dentista</h3>
          </div>
          {carregando ? (
            <div className={style.carregando}>Carregando dentista...</div>
          ) : (
            <Form className={style.formulario} onSubmit={handleSubmit}>
              <div className={style.campo}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label className={style.label}>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira o Nome de Paciente"
                    name="nome"
                    className={style.input}
                    value={nome}
                    disabled={salvando}
                    onChange={(e) => setNome(e.target.value)}
                    autoFocus
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Insira o email"
                    name="email"
                    className={style.input}
                    value={email}
                    disabled={salvando}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formTelefone" className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder=" ( ) _ ____-____  Insira o numero de telefone"
                    name="telefone"
                    className={style.input}
                    value={telefone}
                    disabled={salvando}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formDataNascimento" className="mb-3">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Insira a data de nascimento"
                    name="dataDeNascimento"
                    className={style.input}
                    value={dataDeNascimento}
                    disabled={salvando}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCro" className="mb-3">
                  <Form.Label>Conselho Regional de Odontologia</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira seu codigo do CRO"
                    name="Cro"
                    className={style.input}
                    value={cro}
                    disabled={salvando}
                    onChange={(e) => setCro(e.target.value)}
                    required
                  />
                </Form.Group>
              </div>

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
                  type="submit"
                  className={style.botao_salvar}
                  disabled={salvando || !isFormValid()}
                >
                  {salvando ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </Form>
          )}
        </div>
      </TopBar>
    </BottomBar>
  );
}
