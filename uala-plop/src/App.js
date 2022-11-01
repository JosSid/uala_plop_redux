import LoginPage from './components/auth/LoginPage.js';
import './App.css';
import Layout from './components/layout/Layout.js';
import { useState } from 'react';
import {logout} from './components/auth/service.js'

function App({ haveToken }) {
  const [isLogged, setIsLogged] = useState(haveToken);

  const titleApp = 'Uala Plop';

  const handleLogin = () => setIsLogged(true);

  const handleLogout = () => {
    if(window.confirm('Sure you want Logout?')) {
      logout()
      setIsLogged(false)
    }
     
    
  };
  return (
    <div className='app'>
      {isLogged ? (
        <Layout titleApp={titleApp} onLogout={handleLogout}/>
      ) : (
        <LoginPage titleApp={titleApp} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
