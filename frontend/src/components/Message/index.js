import React, {useState} from 'react';
import './index.css';

function Message({type, msg}) {
    const [message, setMessage] = useState({
        type,
        msg
    });

    return (
        message && <div className={`alert ${message.type}`}>
            {
                message.msg
            }
        </div>
    );
}

export default Message;