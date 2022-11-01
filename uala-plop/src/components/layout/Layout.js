import './styles/Layout.css'
import Header from "./Header.js";
import AdsPage from '../ads/AdsPage.js';

const Layout = ({titleApp, onLogout}) => {
    return (
        <div className="layout">
            <Header titleApp={titleApp} onLogout={onLogout}/>
            <AdsPage />
            <div className="footer">@JosSid2022</div>
        </div>
    )
}

export default Layout;