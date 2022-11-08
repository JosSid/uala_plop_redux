import BurgerMenu from "../common/burgerMenu/BurgerMenu.js";
import './styles/Header.css'
import Confirm from "../common/confirm_element/Confirm.js";
import { useState, useContext } from "react";
import AuthContext from "../auth/Context.js";

const Header = () => {
    const {titleApp, handleLogout} = useContext(AuthContext)
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
            {confirm && <Confirm className='header__confirm' children={message} confirm={handleLogout} notConfirm={notConfirm}/>}
            

        </header>
    )
};
    


export default Header;