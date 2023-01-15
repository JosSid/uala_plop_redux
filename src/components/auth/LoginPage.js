import { useState, useEffect } from 'react';
import styles from './LoginPage.module.css';
import Button from '../common/Button.js';
import CheckBox from '../common/CheckBox.js';
import Form from '../common/form.js/Form';
import FormField from '../common/formField/FormField.js';
import storage from '../../utils/storage';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, authLogout, uiResetError } from '../../store/actions';
import { getUi, getIsLogged } from '../../store/selectors';

const LoginPage = ({ titleApp }) => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({});
  const [check, setCheck] = useState(false);
  const { isFetching, error } = useSelector(getUi);
  const isLogged = useSelector(getIsLogged)

  const handleCredentials = (event) => setCredentials({
    ...credentials,
    [event.target.name]: event.target.value
  });

  const handleChangeChecked = (event) => setCheck(event.target.checked);

  const resetError = () => dispatch(uiResetError());

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = await dispatch(authLogin(credentials));
    check && storage.set('auth', accessToken);
  };

  const isEnabledButton = () => credentials.email && credentials.password && !isFetching;

  useEffect(() => {
    isLogged && dispatch(authLogout());
  }, [dispatch, isLogged]);

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.loginPage__title}>
        {'Welcome to'} <br />
        {`${titleApp}`}
      </h1>
      <h4 className={styles.loginPage__title}>
        Please,login for search or create your advertisment
      </h4>
   
      <Form initialValue={{email: '', password: ''}} onSubmit={handleSubmit} className={styles.loginPage__form} >
        <FormField
          type='text'
          name='email'
          label='eMail'
          className={styles.loginForm__field}
          getDataEvent={handleCredentials}
        />

        <FormField
          type='password'
          name='password'
          label='password'
          className={styles.loginForm__field}
          getDataEvent={handleCredentials}
        />

        <Button
          type='submit'
          className={styles.loginForm__submit}
          disabled={!isEnabledButton()}
        >
          Log in
        </Button>
        <CheckBox
          name='checklog'
          type='checkbox'
          label='Check for recording Login'
          onChange={handleChangeChecked}
          checked={check}
        />
      </Form>

      {error && <ErrorDisplay error={error} resetError={resetError} />}
      <footer className={styles.footer}>@JosSid2022</footer>
    </div>
  );
};

export default LoginPage;
