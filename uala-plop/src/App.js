import LoginPage from './components/auth/LoginPage.js';
import './App.css';
import Layout from './components/layout/Layout.js';
import { useState } from 'react';

function App({ haveToken }) {
  const [isLogged, setIsLogged] = useState(haveToken);

  const handleLogin = () => setIsLogged(true);
  return (
    <div className='app'>
      {isLogged ? (
        <Layout titleApp='Uala Plop' />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
