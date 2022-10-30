import { useState } from "react";
import './LoginPage.css'
import FormField from "../common/formField/FormField.js";
import { login } from "./service.js";
const LoginPage = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEMail = event => setEmail(event.target.value);
    const handleChangePassword = event => setPassword(event.target.value);

    const handleSubmit =  async (event) => {
        event.preventDefault();
        await login({email, password})
        
        onLogin()
        
    };

    const isEnabledButton = () => email && password
       
    

    return (
        <div className="loginPage">
            <h1 className="loginPage-title">Bienvenido</h1>
            <form onSubmit={handleSubmit}>
                <FormField 
                    type="text"
                    name="username"
                    label="eMail"
                    className="loginForm-field"
                    onChange={handleChangeEMail}
                    value={email}
                />

                <FormField 
                    type="password"
                    name="password"
                    label="password"
                    className="loginForm-field"
                    onChange={handleChangePassword}
                    value={password}
                />

                <button type="submit" className="button__wrapper" disabled={!isEnabledButton()}>Click me</button>
            </form>
            
        </div>
    )

};

export default LoginPage;