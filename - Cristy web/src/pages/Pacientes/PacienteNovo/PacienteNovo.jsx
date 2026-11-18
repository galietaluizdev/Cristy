import style from "./_pacienteNovo.module.css";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../../components/BottomBar/BottomBar";
import { useState } from "react";
import { TopBar } from "../../../components/TopBar/TopBar";
import { Button, Form } from "react-bootstrap";
import PacienteAPI from "../../../services/PacienteAPI";

export function PacienteNovo() {
  const [nome, setNome] = useState(``);
  const [email, setEmail] = useState(``);
  const [telefone, setTelefone] = useState(``);
  const [dataDeNascimento, setDataDeNascimento] = useState(``);

  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  const isFormValid = async () => {
    return nome.length < 100 && (email.length < 100) & (telefone.length == 11);
  };

  const handleSubmit = async (e) => {
    try {
      setSalvando(true);
      e.preventDefault();
      if (isFormValid()) {
        await PacienteAPI.CadastrarAsync({nome, email, telefone, dataDeNascimento});
        navigate("/pacientes");
      } 
    } catch (error) {
      console.error("Erro ao criar tarefa: ", error);
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    navigate("/pacientes");
  };

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.cabecalho}>
            <h3 className={style.titulo}>Novo Paciente</h3>
          </div>

          <div className={style.campo}>
            <Form className={style.formulario} onSubmit={handleSubmit}>
              <Form.Group controlId="formNome" className="mb-3">
                {/*mb-3 é padrao */}
                <Form.Label className={style.label}> Nome </Form.Label>
                <Form.Control
                  type="text"
                  className={style.input}
                  placeholder="Nome Sobrenome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  disabled={salvando}
                  autoFocus
                />
                <Form.Text className={style.orientacao}>
                  Insira o nome completo do paciente
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                {/*mb-3 é padrao */}
                <Form.Label className={style.label}> Email </Form.Label>
                <Form.Control
                  type="text"
                  className={style.input}
                  placeholder="paciente@email.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={salvando}
                  />
                <Form.Text className={style.orientacao}>
                  Insira o email do paciente
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formTelefone" className="mb-3">
                {/*mb-3 é padrao */}
                <Form.Label className={style.label}> Telefone </Form.Label>
                <Form.Control
                  type="tel"
                  maxLength={15}
                  className={style.input}
                  placeholder="Ex: (35) 99999-9999"
                  name="email"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                  disabled={salvando}
                  />
                <Form.Text className={style.orientacao}>
                  Insira o telefone do paciente
                </Form.Text>
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
                  onChange={(e) => setDataDeNascimento(e.target.value)}
                  required
                  />
                <Form.Text className={style.orientacao}>
                  Insira data de nascimento do paciente
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
export default PacienteNovo;
