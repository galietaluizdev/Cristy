import style from './_bottomBarItem.module.css';

import{ Link } from 'react-router-dom';


export function BottomBarItem({ link , logo}){
    return (
        <Link to={link} className={style.bottomBar_item}>
            {logo}
            <h3 className={style.texto_link}></h3>
        </Link>
    )
}