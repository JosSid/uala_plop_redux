import './BurgerMenu.css';
import burguerPic from '../../../assets/menu.svg';
import Button from '../Button.js';



const BurgerMenu = ({onLogout}) => {
  const offCheck = () => {
    const inputElement = document.getElementById('menu');
    inputElement.checked = false;
  };



  return (
    <div className='burger__menu__wrapper'>
      <label htmlFor='menu' className='burger__menu__label'>
        <img src={burguerPic} className='burger__menu__img' alt='Menu' />
      </label>
      <input type='checkbox' id='menu' className='burger__menu__input' />
      <div className='burger__menu__list' onClick={offCheck}>

        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          onClick={console.log('create ad')}
        >
          Create Ad
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          onClick={onLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default BurgerMenu;
