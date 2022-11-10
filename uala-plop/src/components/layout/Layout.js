import './styles/Layout.css'
import Header from "./Header.js";
import { Outlet } from 'react-router-dom';

const Layout = () => {
    
    return (
        <div className="layout">
            
            <Header className='header'/>
            
            
            <main className='main'>
                <Outlet />
            </main> 
            
            <footer className="footer">@JosSid2022</footer>
        </div>
    )
}

export default Layout;