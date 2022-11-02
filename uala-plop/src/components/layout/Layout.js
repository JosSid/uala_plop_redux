import './styles/Layout.css'
import Header from "./Header.js";


const Layout = ({titleApp, title, onLogout,children}) => {

    


    return (
        <div className="layout">
            
                <Header titleApp={titleApp} onLogout={onLogout}/>
        
            
            <main>
                <h2>{title}</h2>
                <section>{children}</section>
            </main> 
            
            <footer className="footer">@JosSid2022</footer>
        </div>
    )
}

export default Layout;