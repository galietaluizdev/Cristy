import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import style from "./_login.module.css";

export function Login() {
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    try {
      // aqui entra a validação do login
      navigate("/pacientes"); // troque pela rota que você usa
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={style.pagina_conteudo}>
      <Form onSubmit={handleSubmit}>
        <Button
          type="submit"
          className={style.botao_entrar}
          disabled={carregando}
        >
          {carregando ? "Entrando..." : "Entrar"}
        </Button>
      </Form>
    </div>
  );
}