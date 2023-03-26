import React, {useEffect, useState} from 'react';
import './index.css';

function Message({type, msg, delay = 4000}) {
    const [message, setMessage] = useState({
        type,
        msg
    });

    useEffect(() => {
        if(delay < 0) return;
        setTimeout(() => {
            setMessage(undefined);
        }, delay);
    }, []);

    return (
        message && <div className={`alert ${message.type}`}>
            {
                message.msg
            }
        </div>
    );
}

export default Message;