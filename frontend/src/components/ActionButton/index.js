import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

function ActionButton({children, icon, ...rest}) {
    return (
        <button className="action-button" {...rest}> {icon} {children}</button>
    );
}

export default ActionButton;