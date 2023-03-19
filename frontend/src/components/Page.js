import React from 'react';
import Navbar from './Navbar';

function Page(props) {
    const navButtons = {
        'home': {
            name: 'home',
            displayName: 'Home',
            route: '/'
        },
        'contador': {
            name: 'contador',
            displayName: 'Contador',
            route: '/counter'
        },
        'posts': {
            name: 'posts',
            displayName: 'Posts',
            route: '/posts'
        },
        'login': {
            name: 'login',
            displayName: 'Login',
            route: '/login'
        }
    };

    return (
        <div>
            <Navbar buttons={navButtons} defaultBtn="contador"></Navbar>
            <div className="counterWrapper2">
                {props.component}
            </div>
        </div>
    );
}

export default Page;