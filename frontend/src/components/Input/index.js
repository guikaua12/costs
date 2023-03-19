import React, from 'react';
import './index.css';
import {FaExclamationTriangle} from 'react-icons/fa';

const REQUIRED_CODE = 0;
const MIN_LENGHT_CODE = 1;
const PASSWORD_NOT_MATCH = 2;
const INVALID_EMAIL = 3;

const EMAIL_PATTERN = new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+');

function getRealType(type) {
     switch (type) {
        case 'confirmPassword': {
            return 'password';
        }
         default: {
             return type;
         }
    }
}
export function getErrors(value, required, minLenght, type, originalPassword) {
    const errors = [];
    // required
    if (required && !value && !errors[REQUIRED_CODE]) {
        errors[REQUIRED_CODE] = {
            code: REQUIRED_CODE,
            msg: 'O conteúdo não pode ser vazio! '
        };
    } else if (required && value && errors[REQUIRED_CODE]) {
        errors.splice(REQUIRED_CODE);
    }

    // min lenght
    if (value && value.length < minLenght && !errors[MIN_LENGHT_CODE]) {
        errors[MIN_LENGHT_CODE] = {
            code: MIN_LENGHT_CODE,
            msg: 'O tamanho do conteúdo deve ser maior ou igual a ' + minLenght+' '
        };
    } else if (value && value.length >= minLenght && errors[MIN_LENGHT_CODE]) {
        errors.splice(MIN_LENGHT_CODE);
    }

    // confirm password
    if (value && type === 'confirmPassword' && value !== originalPassword && !errors[PASSWORD_NOT_MATCH]) {
        errors[PASSWORD_NOT_MATCH] = {
            code: PASSWORD_NOT_MATCH,
            msg: 'As senhas não coincidem.'
        };
    } else if (value && type === 'confirmPassword' && value === originalPassword && errors[PASSWORD_NOT_MATCH]) {
        errors.splice(PASSWORD_NOT_MATCH);
    }

    // email
    if (value && type === 'email' && !EMAIL_PATTERN.test(value) && !errors[INVALID_EMAIL]) {
        errors[INVALID_EMAIL] = {
            code: INVALID_EMAIL,
            msg: 'O email é inválido.'
        };
    } else if (value && type === 'email' && EMAIL_PATTERN.test(value) && errors[INVALID_EMAIL]) {
        errors.splice(INVALID_EMAIL);
    }

    return errors;
}

export function Input({width, height, fontSize, icon, required, minLenght, value, setValue, type, password, ...rest}) {
    const errors = getErrors(value, required, minLenght, type, password);


    return (
        <label className="input-label">
            <div className={errors.length > 0 ? 'input-wrapper error' : 'input-wrapper'} style={{width, height}}>
                {icon}
                <input type={getRealType(type)} style={{fontSize}} onChange={e => {
                    if(e.target.value.length > 0) {
                        setValue(e.target.value);
                    }
                }} {...rest}/>
                {
                    <FaExclamationTriangle className='error-icon' size={25}></FaExclamationTriangle>
                }
                {
                    <div className="error-box">
                        {
                            errors.map(err => <span key={err.code}>{err.msg}</span>)
                        }
                    </div>
                }
            </div>
        </label>
    );
}

Input.defaultProps = {
    width: '480px',
    height: '60px',
    fontSize: '1.1rem',
    type: 'text',
    placeholder: 'Input',
    icon: <svg className="svg-inline--fa fa-envelope fa-w-16 input__wrapper__icon" aria-hidden="true"
               focusable="false" data-prefix="fas" data-icon="envelope" role="img"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-v-07536052="" width="25px">
        <path className="" fill="currentColor"
              d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
    </svg>,
    required: true,
    minLenght: 4,
    password: ''
};