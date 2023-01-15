import classNames from 'classnames';
import inputWithValue from '../inputWithValue';
import './FormField.css';

export const FormField = ({ className, label, ...props }) => {
  return (
    <div className={classNames('formField', className)}>
      <label className='formField__label'>
        <span>{label}</span>
        <input className='formField__input' {...props} />
      </label>
    </div>
  );
};

export default inputWithValue({initialState: ''})(FormField);
