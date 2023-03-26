import React from 'react';
import './index.css';
import loadingImg from '../../static/loading.svg';

function Loading() {
    return (
        <div className='loading-wrapper'>
            <img src={loadingImg} alt="Loading" width='30px'/>
        </div>
    );
}

export default Loading;