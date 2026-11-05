import style from "./_bottomBar.module.css";
import { MdPeopleAlt } from "react-icons/md";
import { RiToothFill,RiBookAiLine } from "react-icons/ri";
import { BottomBarItem } from "./BottomBarItem.jsx/BottomBarItem";
export function BottomBar({ children }) {
  return (
    <div>
      <div className={style.bottombar_conteudo}>

        <div className={style.bottombar_corpo}>
          <BottomBarItem 
            link={"/pacientes"}
            logo={<MdPeopleAlt/>}
          />
          <BottomBarItem 
            link={"/dentistas"}
            logo={<RiToothFill/>}
          />
          <BottomBarItem 
            link={"/consultas"}
            logo={<RiBookAiLine/>}
          />
        </div>
      </div>

      <div className={style.pagina_conteudo}>{children}</div>
    </div>
  );
}
