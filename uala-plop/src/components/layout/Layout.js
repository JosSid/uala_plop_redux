import '../../styles/Layout.css'
import Header from "./Header.js";

const Layout = ({titleApp}) => {
    return (
        <div className="layout">
            <Header titleApp={titleApp} />
            <div className="footer">@JosSid2022</div>
        </div>
    )
}

export default Layout;