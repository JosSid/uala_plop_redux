import { useState } from 'react';
import './LoginPage.css';
import Button from '../common/Button.js';
import CheckBox from '../common/CheckBox.js';
import FormField from '../common/formField/FormField.js';
import { login } from './service.js';
import storage from '../../utils/storage';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import { useAuthContext } from './Context.js';
const LoginPage = () => {
  const { handleLogin, titleApp } = useAuthContext();
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

      handleLogin();

      !check && storage.remove('auth');
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  };

  const isEnabledButton = () => email && password && !isFetching;

  return (
    <div className='loginPage'>
      <h1 className='loginPage__title'>
        {'Welcome to'} <br />
        {`${titleApp}`}
      </h1>
      <h4 className='loginPage__title'>
        Please,login for search or create your advertismen
      </h4>
      <form className='loginPage__form' onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='username'
          label='eMail'
          className='loginForm__field'
          onChange={handleChangeEMail}
          value={email}
        />

        <FormField
          type='password'
          name='password'
          label='password'
          className='loginForm__field'
          onChange={handleChangePassword}
          value={password}
        />

        <Button
          type='submit'
          className='loginForm__submit'
          disabled={!isEnabledButton()}
        >
          Log in
        </Button>
        <CheckBox
          name='checklog'
          label='Check for recording Login'
          onChange={(event) => setCheck(event.target.checked)}
        />
      </form>
      {error && <ErrorDisplay error={error} resetError={resetError} />}
    </div>
  );
};

export default LoginPage;
