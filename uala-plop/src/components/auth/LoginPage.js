import { useState } from 'react';
import './LoginPage.css';
import FormField from '../common/formField/FormField.js';
import { login } from './service.js';
import storage from '../../utils/storage';
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleChangeEMail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);

  const resetError = () => setError(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      resetError();
      setIsFetching(true);
      await login({ email, password });

      onLogin();

      !check && storage.remove('auth');
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  };

  const isEnabledButton = () => email && password && !isFetching;

  return (
    <div className='loginPage'>
      <h1 className='loginPage-title'>Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='username'
          label='eMail'
          className='loginForm-field'
          onChange={handleChangeEMail}
          value={email}
        />

        <FormField
          type='password'
          name='password'
          label='password'
          className='loginForm-field'
          onChange={handleChangePassword}
          value={password}
        />

        <button
          type='submit'
          className='button__wrapper'
          disabled={!isEnabledButton()}
        >
          Login
        </button>
        <input
          type='checkbox'
          onChange={(event) => setCheck(event.target.checked)}
        />
        <label htmlFor='input'>Desea seguir login?</label>
      </form>
      {error && (
        <div className='loginPage-error' onClick={resetError}>
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
