import React from 'react';
import './index.css';
import {Link} from 'react-router-dom';

function Button({children, to, ...rest}) {
    return (
        <Link className="link-button" to={to} {...rest}>{children}</Link>
    );
}

Button.defaultProps = {
    width: '300px',
    height: '50px',
    disabled: false
};

export default Button;