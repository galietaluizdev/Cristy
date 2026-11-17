import style from "./_dentistaNovo.module.css";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../../components/BottomBar/BottomBar";
import { useState } from "react";
import { TopBar } from "../../../components/TopBar/TopBar";
import { Button, Form } from "react-bootstrap";
import DentistaAPI from "../../../services/DentistaAPI";

export function DentistaNovo() {
  const [nome, setNome] = useState(``);
  const [email, setEmail] = useState(``);
  const [telefone, setTelefone] = useState(``);
  const [dataDeNascimento, setDataDeNascimento] = useState(``);
  const [cro, setCro] = useState(``);
  const [especialidade, setEspecialidade] = useState(``);

  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  const isFormValid = async () => {
    return (
      nome.length < 100 &&
      email.length < 100 &&
      telefone.length == 11 &&
      dataDeNascimento != null &&
      validarFormatoCRO(cro)
    );
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isFormValid()) {
        setSalvando(true);
        await DentistaAPI.CadastrarAsync({
          nome,
          email,
          telefone,
          dataDeNascimento,
          cro,
          especialidade}
        );
        navigate("/dentistas");
      }
    } catch (error) {
      console.error("Erro ao criar tarefa: ", error);
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    navigate("/dentistas");
  };

  function validarFormatoCRO(valor) {
    return regexCRO.test(valor.trim());
  }
  const regexCRO =
    /^CRO[-\s/]?(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)[-\s]?\d{3,6}$/i; // peguei o regex da internet
  const handleCroChange = (e) => {
    const limpo = e.target.value
      .toUpperCase()
      .replace(/^CRO/, "")
      .replace(/[^A-Z0-9]/g, "");

    const uf = limpo.replace(/[^A-Z]/g, "").slice(0, 2);
    const num = limpo.replace(/[^0-9]/g, "").slice(0, 6);

    const formatado = uf ? `CRO-${uf}${num ? " " + num : ""}` : "";
    setCro(formatado);
  };

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.cabecalho}>
            <h3 className={style.titulo}>Novo Dentista</h3>
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
                  Insira o nome completo do dentista
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                {/*mb-3 é padrao */}
                <Form.Label className={style.label}> Email </Form.Label>
                <Form.Control
                  type="text"
                  className={style.input}
                  placeholder="dentista@email.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={salvando}
                />
                <Form.Text className={style.orientacao}>
                  Insira o email do dentista
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formTelefone" className="mb-3">
                {/*mb-3 é padrao */}
                <Form.Label className={style.label}> Telefone </Form.Label>
                <Form.Control
                  type="tel"
                  maxLength={11}
                  className={style.input}
                  placeholder="Ex: (35) 99999-9999"
                  name="email"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                  disabled={salvando}
                />
                <Form.Text className={style.orientacao}>
                  Insira o telefone do dentista
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
                  Insira data de nascimento do dentista
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formCro" className="mb-3">
                <Form.Label>Conselho Regional de Odontologia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="CRO-UF 123456"
                  name="cro"
                  className={style.input}
                  value={cro}
                  disabled={salvando}
                  onChange={handleCroChange}
                  required
                />
                <Form.Text className={style.orientacao}>
                  Insira o CRO do dentista (Lembre-se que isto é um documento,
                  confira antes de inserir)
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formEspecialidade" className="mb-3">
                <Form.Label>Especialidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Bucomaxilo"
                  name="especialidade"
                  className={style.input}
                  value={especialidade}
                  disabled={salvando}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  required
                />
                <Form.Text className={style.orientacao}>
                  Insira a especiladade do dentista
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
export default DentistaNovo;
