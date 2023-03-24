import React from 'react';
import Navbar from '../Navbar';

function Header({currentPage}) {
    return (
        <header>
            <Navbar currentPage={currentPage}></Navbar>
        </header>
    );
}

export default Header;