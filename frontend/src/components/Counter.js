import React, {useState} from 'react';
import './Counter.css';

function Counter() {
    const [count, setCount] = useState(0);

    function increase() {
        setCount(count + 1);
    }

    function decrease() {
        setCount(count - 1);
    }

    return (
        <div className="counterWrapper">
            <div>
                <span>{count}</span>
            </div>
            <div>
                <button className="btn" onClick={increase}>+</button>
                <button className="btn" onClick={decrease}>-</button>
            </div>
        </div>
    );
}

export default Counter;