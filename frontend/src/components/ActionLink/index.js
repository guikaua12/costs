import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

function ActionLink({children, icon, ...rest}) {
    return (
        <Link className="action-link" {...rest}> {icon} {children}</Link>
    );
}

export default ActionLink;