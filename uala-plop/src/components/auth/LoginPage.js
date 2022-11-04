import { useState } from 'react';
import './LoginPage.css';
import Button from '../common/Button.js';
import CheckBox from '../common/CheckBox.js';
import FormField from '../common/formField/FormField.js';
import { login } from './service.js';
import storage from '../../utils/storage';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js'
const LoginPage = ({ onLogin, titleApp }) => {
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
      <h1 className='loginPage-title'>{titleApp}</h1>
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

        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={!isEnabledButton()}
        >
          Log in
        </Button>
        <CheckBox name="checklog" label="Check for recording Login" onChange={(event) => setCheck(event.target.checked)}/>

      </form>
      {error && (
       <ErrorDisplay error={error} resetError={resetError} />
      )}
    </div>
  );
};

export default LoginPage;
