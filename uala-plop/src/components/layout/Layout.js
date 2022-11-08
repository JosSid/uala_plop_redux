import './styles/Layout.css'
import Header from "./Header.js";
import { Outlet } from 'react-router-dom';



const Layout = ({titleApp, title, onLogout,children}) => {



    


    return (
        <div className="layout">
            
            <Header className='header' titleApp={titleApp} onLogout={onLogout}/>
        
            
            <main className='main'>
                <Outlet />
            </main> 
            
            <footer className="footer">@JosSid2022</footer>
        </div>
    )
}

export default Layout;