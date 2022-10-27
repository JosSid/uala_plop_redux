const Header = ({titleApp}) => {
    return (
        <div className="header__container">
            <h1>{titleApp}</h1>
            {/*Sacar de aqui el menu y importar el componente*/}
            <div className="burger__menu__wrapper">
                <label className="burger__menu__label">
                    <img src="../assets/menu.svg" className="burger__menu__img" alt="Menu" />
                </label>
                <input type="checkbox" id="menu" className="burger__menu__input" />
                <div className="burger__menu__list">
                    
                </div>
            </div> 

        </div>
    )
};
    


export default Header;