import BurgerMenu from "../common/burgerMenu/BurgerMenu.js";
import './styles/Header.css'

const Header = ({titleApp, onLogout}) => {
    return (
        <div className="header__container">
            <div className="header__title">
                <h1>{titleApp}</h1>
            </div>
            
            
            <BurgerMenu onLogout={onLogout}/>{/*hacerle variante para que siempre sea boton o que cambie a nav*/}

        </div>
    )
};
    


export default Header;