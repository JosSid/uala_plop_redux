import './styles/Layout.css';
import Header from './Header.js';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header/>

      <main>
        <Outlet />
      </main>

      <footer className='footer'>@JosSid2022</footer>
    </div>
  );
};

export default Layout;
