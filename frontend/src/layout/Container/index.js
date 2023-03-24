import React from 'react';
import './index.css';

function Container({children, containerProps: {className, ...rest}}) {
    return (
        <div className={'content-container '+className} {...rest}>
            {children}
        </div>
    );
}

Container.defaultProps = {
    className: '',
    width: '1000px'
}

export default Container;