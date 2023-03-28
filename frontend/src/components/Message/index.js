import React, {useEffect, useState} from 'react';
import './index.css';

function Message({type, msg, delay = 4000}) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        if(delay <= 0) return;

        const task = setTimeout(() => {
            setShow(false);
        }, delay);

        return () => clearTimeout(task);
    }, [msg]);


    return (
        show && <div className={`alert ${type}`}>
            {
                msg
            }
        </div>
    );
}

export default Message;