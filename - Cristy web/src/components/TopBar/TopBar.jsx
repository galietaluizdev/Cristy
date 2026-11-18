import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

import style from "./_topBar.module.css";

export function TopBar({ children }) {
  return (
    <div>
      <div className={style.topbar_conteudo}>
        <div className={style.usuario_container}></div>
        <Link to={"/"} className={style.botao_deslogar}>
          <FaArrowRightFromBracket />
        </Link>
      </div>
      <div className={style.pagina_conteudo}>{children}</div>
    </div>
  );
}
