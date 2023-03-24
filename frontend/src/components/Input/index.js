import React from 'react';
import './index.css';

function Input({id, label, onChange, ...rest}) {
    return (
        <>
            {
                label && <label className='input-label' htmlFor={id}>{label}</label>
            }
            <input id={id} type="text" onChange={onChange} className='input' {...rest}/>
        </>
    );
}

Input.defaultProps = {
};

export default Input;