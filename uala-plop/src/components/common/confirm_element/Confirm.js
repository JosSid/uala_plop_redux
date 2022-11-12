import Button from '../Button.js';
import './Confirm.css';
const Confirm = ({ children, confirm, notConfirm }) => {
  return (
    <div className='confirm__container'>
      <div className='confirm__message'>{children}</div>

      <div className='confirm__button__container'>
        <Button onClick={confirm} variant='primary'>
          Yes
        </Button>
        <Button onClick={notConfirm} variant='primary'>
          No
        </Button>
      </div>
    </div>
  );
};

export default Confirm;
