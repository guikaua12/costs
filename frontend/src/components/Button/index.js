import React from 'react';
import './index.css';

function Button({children, ...rest}) {
    return (
        <button className="button" {...rest}>{children}</button>
    );
}

Button.defaultProps = {
    width: '300px',
    height: '50px',
    disabled: false
};

export default Button;