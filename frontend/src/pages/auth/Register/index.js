import React, {useState} from 'react';
import {getErrors, Input} from '../../../components/Input/Input';
import '../index.css';
import Button from '../../../components/Button/Button';
import {FaEnvelope, FaLock, FaUserAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function hasAnyErrors() {
        const usernameErrors = getErrors(username, true, 4, 'text');
        const emailErrors = getErrors(email, true, 4, 'email');
        const passwordErrors = getErrors(password, true, 4, 'password');
        const passwordConfirmErrors = getErrors(confirmPassword, true, 4, 'confirmPassword', password);
        return !!(usernameErrors.length) || !!(emailErrors.length) || !!(passwordErrors.length) || !!(passwordConfirmErrors.length);

    }

    function onSubmit() {
        if(hasAnyErrors()) return;
        console.log('request sent');
    }

    return (
        <div className="login-wrapper">
            <img src="https://dreamclient.xyz/img/logo.101e7fe3.svg" alt="Logo" width="400px"/>
            <form action="auth/Login#" method="post" className="login-form" onSubmit={(e) => e.preventDefault()}>

                <Input key='username' type='text' placeholder='Username' icon={<FaUserAlt size={25}></FaUserAlt>} value={username} setValue={setUsername}></Input>
                <Input key='email' type='email' placeholder='E-mail' icon={<FaEnvelope size={25}></FaEnvelope>} value={email} setValue={setEmail}></Input>
                <Input key='password' type='password' placeholder='Senha' icon={<FaLock size={25}></FaLock>} value={password} setValue={setPassword}></Input>
                <Input key='confirmPassword' type='confirmPassword' password={password} placeholder='Confirmar senha' icon={<FaLock size={25}></FaLock>} value={confirmPassword} setValue={setConfirmPassword}></Input>

                <div className="a-wrapper">
                    <a href="auth/Login#" className="forgot-password">Esqueci minha senha</a>
                </div>
                {
                    <Button text="LOGIN" fullSized={true} onClick={onSubmit}/>
                }
                <div className="a-wrapper">
                    <a href="auth/Login#" className="dont-have-acc-a">Não tem uma conta?</a>
                    <Link to="/login" className="register-a">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;