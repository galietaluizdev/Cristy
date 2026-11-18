import style from "./_consultaEditar.module.css";

import { useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { TopBar } from "../../../components/TopBar/TopBar";
import { BottomBar } from "../../../components/BottomBar/BottomBar";
import ConsultaAPI from "../../../services/ConsultaAPI";

export function ConsultaEditar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [id] = useState(location.state?.id);
  const [dataConsulta, setDataConsulta] = useState(new Date());
  const [descricao, setDescricao] = useState("");

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataLimite = new Date();
  dataLimite.setFullYear(hoje.getFullYear() - 1);
  dataLimite.setHours(0, 0, 0, 0);

  const dataZerada = dataConsulta ? new Date(dataConsulta + "T00:00:00") : null; // define o horario zerado pra comparacao

  const isFormValid = () => {
    return (
      dataZerada >= dataLimite &&
      dataZerada <= hoje &&
      descricao.trim().length > 0
    );
  };

  const handleCancelar = () => {
    navigate("/consultas");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        setSalvando(true);
        let consulta = {
          id,
          dataConsulta,
          descricao,
        };
        await ConsultaAPI.AtualizarAsync({id, dataConsulta, descricao});
        navigate("/consultas");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    } finally {
      setSalvando(false);
    }
  };

  useEffect(() => {
    async function CarregarConsulta(id) {
      try {
        setCarregando(true);

        const consulta = await ConsultaAPI.BuscarPorIdAsync(id);
        if (consulta != null) {
          setDataConsulta(consulta.dataConsulta);
          setDescricao(consulta.descricao);
        }
      } catch (error) {
        console.error("Erro ao buscar consulta:", error);
      } finally {
        setCarregando(false);
      }
    }
    CarregarConsulta(id);
  }, [id]);

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <div className={style.cabecalho}>
            <h3 className={style.titulo}>Editar Consulta</h3>
          </div>
          {carregando ? (
            <div className={style.carregando}>Carregando consulta...</div>
          ) : (
            <div className={style.campo}>
              <Form className={style.formulario} onSubmit={handleSubmit}>
                <Form.Group controlId="formData" className="mb-3">
                  <Form.Label className={style.label}>
                    Data da Consulta
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Insira a data da consulta"
                    name="dataConsulta"
                    className={style.input}
                    value={dataConsulta}
                    disabled={salvando}
                    onChange={(e) => setDataConsulta(e.target.value)}
                    autoFocus
                    required
                  />
                  <Form.Text className={style.orientacao}>
                    Data limite -&gt; {dataLimite.toLocaleDateString("pt-BR")} -
                    Pode ser de até 1 ano atrás
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formDescricao" className="mb-3">
                  <Form.Label className={style.label}>Descrição</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Insira a descrição"
                    name="descricao"
                    className={style.input}
                    value={descricao}
                    disabled={salvando}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                  />
                  <Form.Text className={style.orientacao}>
                    Descrição sera usada para registro de historico do paciente
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
                    type="submit"
                    className={style.botao_salvar}
                    disabled={salvando || !isFormValid()}
                  >
                    {salvando ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </div>
      </TopBar>
    </BottomBar>
  );
}
