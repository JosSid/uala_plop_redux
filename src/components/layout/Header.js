import BurgerMenu from '../common/burgerMenu/BurgerMenu.js';
import styles from './styles/Header.module.css';
import Confirm from '../common/confirm_element/Confirm.js';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { authLogout } from '../../store/actions.js';

const Header = ({titleApp}) => {
  const  dispatch  = useDispatch()
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => setConfirm(true);

  const notConfirm = () => setConfirm(false);

  const message = 'Are you sure for Logout?';

  return (
    <header className={styles.header__main}>
      <div className={styles.header__container}>
        <div className={styles.header__title}>
          <h1>{titleApp}</h1>
        </div>

        <BurgerMenu confirm={confirm} onLogout={handleConfirm} />
      </div>
      {confirm && (
        <Confirm
          className={styles.header__confirm}
          children={message}
          confirm={dispatch(authLogout)}
          notConfirm={notConfirm}
        />
      )}
    </header>
  );
};

export default Header;
