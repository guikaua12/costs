import React, {useState} from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import Logo from '../../static/costs_logo.png';
import LinkButton from '../../components/LinkButton';
import useAuth from '../../auth/useAuth';

function Navbar({currentPage}) {
    const auth = useAuth();

    const buttons = {
        'home': {
            name: 'home',
            displayName: 'Home',
            route: '/'
        },
        'projetos': {
            name: 'projetos',
            displayName: 'Projetos',
            route: '/projects'
        },
        'empresa': {
            name: 'empresa',
            displayName: 'Empresa',
            route: '/empresa'
        },
        'contato': {
            name: 'contato',
            displayName: 'Contato',
            route: '/contato'
        }
    };
    const [activeButton, setActiveButton] = useState(buttons[currentPage]);

    function getClassName(btn) {
        return activeButton && activeButton.name === btn.name ? 'active-navbar-button' : '';
    }


    return (
        <nav className="navbar">
            <img src={Logo} alt="Logo"/>
            <div className='navbar-wrapper'>
                <ul>
                    {Object.values(buttons).map(btn => {
                        return (
                            <li key={btn.name}>
                                <Link onClick={() => setActiveButton(btn)} className={getClassName(btn)}
                                      to={btn.route}>{btn.displayName}</Link>
                            </li>
                        );
                    })}
                </ul>
                <div className='user-info'>
                    <LinkButton className='logout-button' onClick={auth.handleLogout}>Logout</LinkButton>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;