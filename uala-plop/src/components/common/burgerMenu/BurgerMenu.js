import './BurgerMenu.css';
import burguerPic from '../../../assets/menu.svg';
import Button from '../Button.js';
import { NavLink } from 'react-router-dom';

const BurgerMenu = ({ onLogout }) => {
  const offCheck = () => {
    const inputElement = document.getElementById('menu');
    inputElement.checked = false;
  };

  return (
    <nav className='burger__menu__wrapper'>
      <label htmlFor='menu' className='burger__menu__label'>
        <img src={burguerPic} className='burger__menu__img' alt='Menu' />
      </label>
      <input type='checkbox' id='menu' className='burger__menu__input' />
      <div className='burger__menu__list' onClick={offCheck}>
        <Button type='submit' variant='primary' className='loginForm-submit'>{/*modificar a link con as link*/}
          <NavLink
            style={{ color: 'rgb(242, 245, 232)', textDecoration: 'none' }}
            to='/ads/new'
          >
            Create Ad
          </NavLink>
        </Button>

        <Button
          type='submit'
          variant='primary'
          className='loginForm-submit'
          onClick={onLogout}
        >
          Log out
        </Button>
      </div>
    </nav>
  );
};

export default BurgerMenu;
