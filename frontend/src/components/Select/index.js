import React from 'react';
import './index.css';

function Select({id, name, label, onChange, children, ...rest}) {
    return (
        <>
            {
                label && <label className='select-label' htmlFor={id}>{label}</label>
            }
            <select {...rest} id={id} name={name} className='select' onChange={onChange}>
                {children}
            </select>
        </>
    );
}

Select.defaultProps = {
};

export default Select;