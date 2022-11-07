import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage.js';
import './App.css';
import Layout from './components/layout/Layout.js';
import { useState } from 'react';
import { logout } from './components/auth/service.js';
import NewAdPage from './components/ads/NewAdPage.js';
import AdPage from './components/ads/AdPage.js';
import AdsPage from './components/ads/AdsPage.js';
import RequireAuth from './components/auth/RequireAuth.js';
import NotFound from './components/common/error/notFound/NotFound.js';
function App({ haveToken }) {
  const [isLogged, setIsLogged] = useState(haveToken);

  const titleApp = 'Uala Plop';

  const handleLogin = () => setIsLogged(true);

  const handleLogout = () => {
    logout();
    setIsLogged(false);
  };

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/login'
          element={
            !isLogged ? (
              <LoginPage titleApp={titleApp} onLogin={handleLogin} />
            ) : (
              <Navigate to='/ads' />
            )
          }
        />
        ;
        <Route path='/ads'>
          <Route
            index
            element={
              <RequireAuth isLogged={isLogged}>
                <Layout
                  titleApp={titleApp}
                  title='hola'
                  isLogged={isLogged}
                  onLogout={handleLogout}
                  children={<AdsPage />}
                />
              </RequireAuth>
            }
          />
          <Route
            path=':id'
            element={
              <RequireAuth isLogged={isLogged}>
                <Layout
                  titleApp={titleApp}
                  title='anuncio'
                  isLogged={isLogged}
                  onLogout={handleLogout}
                  children={<AdPage />}
                />
              </RequireAuth>
            }
          />
          ;
          <Route
            path='new'
            element={
              <RequireAuth isLogged={isLogged}>
                <Layout
                  titleApp={titleApp}
                  isLogged={isLogged}
                  onLogout={handleLogout}
                  children={<NewAdPage />}
                />
              </RequireAuth>
            }
          />
          ;
        </Route>
        <Route
          path='/'
          element={isLogged ? <Navigate to='/ads' /> : <Navigate to='/login' />}
        />
        ;
        <Route path='/404' element={<NotFound error={{ message: '404' }} />} />;
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </div>
  );
}

export default App;
