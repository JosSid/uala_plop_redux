import BurgerMenu from "../common/burgerMenu/BurgerMenu.js";
import './styles/Header.css'
import Confirm from "../common/confirm_element/Confirm.js";
import { useState } from "react";

const Header = ({titleApp, onLogout}) => {
    const [confirm, setConfirm] = useState(false);

    const handleConfirm = () => setConfirm(true);

    const notConfirm = () => setConfirm(false);

    const message = 'Are you sure for Logout?'

    return (
        <header className="header__main">
        <div className="header__container">
            <div className="header__title">
                <h1>{titleApp}</h1>
            </div>
            
            
            <BurgerMenu  confirm={confirm} className='header__menu' onLogout={handleConfirm} />{/*hacerle variante para que siempre sea boton o que cambie a nav*/}

        </div>
            {confirm && <Confirm className='header__confirm' children={message} confirm={onLogout} notConfirm={notConfirm}/>}
            

        </header>
    )
};
    


export default Header;