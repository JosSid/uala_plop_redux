import './styles/Layout.css'
import Header from "./Header.js";
import { useState } from 'react';


const Layout = ({titleApp, title, onLogout,children}) => {



    


    return (
        <div className="layout">
            
            <Header className='header' titleApp={titleApp} onLogout={onLogout}/>
        
            
            <main className='main'>
                <h2>{title}</h2>
                <section>{children}</section>
            </main> 
            
            <footer className="footer">@JosSid2022</footer>
        </div>
    )
}

export default Layout;