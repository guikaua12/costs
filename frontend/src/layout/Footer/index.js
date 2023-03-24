import React, {useState} from 'react';
import './index.css';
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';

function Footer() {



    return (
        <footer className="footer">
            <ul>
                <li> <FaFacebook className='social-icon' size={20}></FaFacebook> </li>
                <li> <FaInstagram className='social-icon' size={20}></FaInstagram> </li>
                <li> <FaLinkedin className='social-icon' size={20}></FaLinkedin> </li>
            </ul>

        </footer>
    );
}

export default Footer;