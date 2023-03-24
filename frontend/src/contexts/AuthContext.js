import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('renderizou context');
        async function checkToken() {
            const token = JSON.parse(localStorage.getItem('costs_token'));
            if(!token) return false;
            const headers = {
                'Content-Type': 'application/json',
                authorization: 'Bearer '+token
            }

            const response = await fetch('/auth/validatetoken', {
                method: 'GET',
                headers
            });

            if(response.status === 200) {
                setIsLogged(true);
                return true;
            }
            localStorage.removeItem('costs_token');
            return false;
        }

        checkToken().then(() => setLoading(false));
    }, []);


    async function handleRegister(email, password, delay) {
        const headers = {
            'Content-Type': 'application/json',
        }
        const body = {
            email,
            password
        }

        const response = await fetch('/users/register', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });

        if(response.status !== 500) {
            const json = await response.json();

            if(response.status === 200) {
                localStorage.setItem('costs_token', JSON.stringify(json.token));
                setTimeout(() => setIsLogged(true), delay);
            }
            return {response, json};
        }
        return {response};
    }

    async function handleLogin(email, password, delay = 0) {
        const headers = {
            'Content-Type': 'application/json',
        }
        const body = {
            email,
            password
        }

        const response = await fetch('/users/login', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });

        if(response.status !== 500) {
            const json = await response.json();

            if(response.status === 200) {
                localStorage.setItem('costs_token', JSON.stringify(json.token));
                setTimeout(() => setIsLogged(true), delay);
            }
            return {response, json};
        }
        return {response};
    }

    function handleLogout() {
        localStorage.removeItem('costs_token');
        setIsLogged(false);
    }

    function getToken() {
        return JSON.parse(localStorage.getItem('costs_token'));
    }

    return (
        <AuthContext.Provider value={{isLogged, handleLogin, handleLogout, handleRegister, loading, getToken}}>{children}</AuthContext.Provider>
    );
}