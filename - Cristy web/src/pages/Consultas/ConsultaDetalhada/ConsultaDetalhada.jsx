import { Link, useLocation, useNavigate } from "react-router-dom";
import { BottomBar } from "../../../components/BottomBar/BottomBar";
import { TopBar } from "../../../components/TopBar/TopBar";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import style from "./_consultaDetalhada.module.css";
import ConsultaAPI from "../../../services/ConsultaAPI";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

export function ConsultaDetalhada() {
  const location = useLocation();
  const navigate = useNavigate();
  const [id] = useState(location.state?.id);
  const [consultaExibir, setConsultaExibir] = useState({});

  const nomeCurto = consultaExibir?.pacienteNome
    ? consultaExibir.pacienteNome.trim().split(/\s+/).slice(0, 2).join(" ")
    : "Carregando...";

  const itens =
    consultaExibir.informacoesRelevantes?.split("\n").filter(Boolean) ?? [];

  useEffect(() => {
    async function BuscarConsulta(Id) {
      try {
        const consultaEncontrada = await ConsultaAPI.BuscarPorId(Id);
        setConsultaExibir(consultaEncontrada);
      } catch (error) {
        console.error("Erro ao carregar consulta:", error);
      }
    }
    BuscarConsulta(id);
  }, []);

  return (
    <BottomBar>
      <TopBar>
        <div className={style.pagina_conteudo}>
          <Link to="/consultas" className={style.botao_voltar}>
            <IoMdArrowRoundBack />
          </Link>
          <div className={style.pagina_cabecalho}>
            <h3>Consulta de {nomeCurto}</h3>

            <Button className={style.botao_processar} onClick={""}>
              Solicitar processamento
            </Button>
          </div>

          <Row className={style.info_barra}>
            <Col className={style.info_campo}>
              <span className={style.info_rotulo}>Paciente</span>
              <span className={style.info_valor}>
                {consultaExibir?.pacienteNome}
              </span>
            </Col>

            <Col className={style.info_campo}>
              <span className={style.info_rotulo}>Dentista</span>
              <span className={style.info_valor}>
                {consultaExibir?.dentistaNome}
              </span>
            </Col>

            <Col className={style.info_campo}>
              <span className={style.info_rotulo}>Data</span>
              <span className={style.info_valor}>
                {consultaExibir?.dataConsulta &&
                  new Date(consultaExibir.dataConsulta).toLocaleDateString(
                    "pt-BR",
                  )}
              </span>
            </Col>

            <Col xs="auto">
              <Badge pill bg="" className={style.status}>
                {consultaExibir?.status}
              </Badge>
            </Col>
          </Row>
          <div className={style.colunas}>
            <Card className={style.card_descricao}>
              <Card.Body className={style.card_corpo}>
                <Card.Title className={style.card_titulo}>
                  Descrição do dentista
                </Card.Title>
                <Card.Text className={style.card_texto}>
                  {consultaExibir?.descricao}
                </Card.Text>
              </Card.Body>
            </Card>

            <Card className={style.painel_ia}>
              <Card.Body className={style.painel_corpo}>
                <Card.Title className={style.painel_titulo}>
                  Análise da IA
                </Card.Title>

                {consultaExibir.historicoProcessado != null ? (
                  <>
                    <span className={style.texto_ia}>{consultaExibir.historicoProcessado}</span>
                    <ul>
                      {itens.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  "Ainda não processado"
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </TopBar>
    </BottomBar>
  );
}
