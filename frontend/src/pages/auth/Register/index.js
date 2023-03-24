import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import Input from '../../../components/Input/';
import Button from '../../../components/Button';
import logo from '../../../static/costs_logo_hd.png';
import '../index.css';
import useAuth from '../../../auth/useAuth';

function Login() {
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // request
    const [response, setResponse] = useState();
    const [loading, setLoading] = useState(false);

    const inputErrors = getInputErrors();

    function getInputErrors() {
        const errors = [];
        if(!email) {
            errors.push('O e-mail não pode ser vazio.');
        }
        if(!password) {
            errors.push('A senha não pode ser vazia.');
        }
        if(!confirmPassword) {
            errors.push('A senha de confirmação não pode ser vazia.');
        }
        if(email && email.length < 10) {
            errors.push('O e-mail tem que ter pelo menos 10 caracteres.');
        }
        if(password && password.length < 4) {
            errors.push('A senha tem que ter pelo menos 4 caracteres.');
        }
        if(confirmPassword && confirmPassword.length < 4) {
            errors.push('A senha de confirmação tem que ter pelo menos 4 caracteres.');
        }
        if(confirmPassword && confirmPassword !== password) {
            errors.push('A senha de confirmação deve ser igual à senha.');
        }

        return errors;
    }

    async function onSubmit() {
        if(inputErrors.length) return;

        setLoading(true);
        const {response, json} = await auth.handleRegister(email, password, 1500);
        setLoading(false);

        if(response.status !== 500) {
            setResponse(json);
        }
    }

    return (
        <div className="login-wrapper">
            <img src={logo} alt="Logo" width="300px"/>
            <form action="auth/Login#" method="post" className="login-form" onSubmit={e => e.preventDefault()}>
                {
                    inputErrors.length > 0 && <div className='alert error'>
                        {
                            inputErrors.map(error => <div>{error+' '}</div>)
                        }
                    </div>
                }
                {
                    !inputErrors.length && response && <div className={'alert '+(response.erro ? 'error' : 'success')}>
                        {
                            response && response.msg
                        }
                    </div>
                }

                <Input type='text' placeholder='E-mail' onChange={e => setEmail(e.target.value)}></Input>
                <Input type='password' placeholder='Senha' onChange={e => setPassword(e.target.value)}></Input>
                <Input type='password' placeholder='Confirmar Senha' onChange={e => setConfirmPassword(e.target.value)}></Input>

                <Button onClick={onSubmit} disabled={loading}>Registrar</Button>

                <div className="a-wrapper">
                    <span className="dont-have-acc-a">Já tem uma conta?</span>
                    <Link to="/login" className="register-a">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;