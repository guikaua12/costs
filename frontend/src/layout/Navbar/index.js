import React, {useState} from 'react';
import './index.css';
import {Link} from 'react-router-dom';

function Navbar({buttons, defaultBtn}) {
    const [activeButton, setActiveButton] = useState(buttons[defaultBtn]);

    function getClassName(btn) {
        return activeButton.name === btn.name ? 'active-navbar-button' : '';
    }

    const buttonsHtml = Object.values(buttons).map(btn => {
        return (
            <li key={btn.name}>
                <Link onClick={() => setActiveButton(btn)} className={getClassName(btn)}
                      to={btn.route}>{btn.displayName}</Link>
            </li>
        );
    });


    return (
        <nav className="navbar">
            <div></div>
            <ul>
                {buttonsHtml}
            </ul>

            <div style={{
                color: 'white'
            }} className="username">User
            </div>
        </nav>
    );
}

export default Navbar;