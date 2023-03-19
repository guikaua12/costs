import React from 'react';
import './Button.css';

function Button({text, width, height, fullSized, disabled, onClick}) {
    return (
        <button disabled={disabled} className="button" style={{
            width: fullSized ? '100%' : width,
            height
        }} onClick={onClick}>{text}</button>
    );
}

Button.defaultProps = {
    width: '300px',
    height: '50px',
    disabled: false
};

export default Button;