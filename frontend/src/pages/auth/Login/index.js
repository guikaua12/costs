import React, {useState} from 'react';
import {Input, getErrors} from '../../../components/Input/Input';
import '../index.css';
import Button from '../../../components/Button/Button';
import {FaEnvelope, FaLock} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function hasAnyErrors() {
        const emailErrors = getErrors(email, true, 4, 'email');
        const passwordErrors = getErrors(password, true, 4, 'password');
        return !!(emailErrors.length) || !!(passwordErrors.length);
    }

    function onSubmit() {
        console.log('teste');
        if(hasAnyErrors()) return;
        console.log('request sent');
    }

    return (
        <div className="login-wrapper">
            <img src="https://dreamclient.xyz/img/logo.101e7fe3.svg" alt="Logo" width="400px"/>
            <form action="auth/Login#" method="post" className="login-form" onSubmit={(e) => e.preventDefault()}>

                <Input key='email' type='email' placeholder='E-mail' value={email} icon={<FaEnvelope size={25}></FaEnvelope>} setValue={setEmail}></Input>
                <Input key='password' type='password' placeholder='Senha' icon={<FaLock size={25}></FaLock>} value={password} setValue={setPassword}></Input>

                <div className="a-wrapper">
                    <a href="auth/Login#" className="forgot-password">Esqueci minha senha</a>
                </div>
                {
                    <Button text="LOGIN" fullSized={true} onClick={onSubmit} disabled={hasAnyErrors()}/>
                }
                <div className="a-wrapper">
                    <a href="auth/Login#" className="dont-have-acc-a">Não tem uma conta?</a>
                    <Link to="/register" className="register-a">Registrar</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;