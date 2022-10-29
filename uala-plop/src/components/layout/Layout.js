import './styles/Layout.css'
import Header from "./Header.js";
import AdsPage from '../ads/AdsPage.js';

const Layout = ({titleApp}) => {
    return (
        <div className="layout">
            <Header titleApp={titleApp} />
            <AdsPage />
            <div className="footer">@JosSid2022</div>
        </div>
    )
}

export default Layout;