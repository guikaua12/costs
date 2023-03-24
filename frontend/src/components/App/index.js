import React from 'react';
import './index.css';
import Router from '../../routes/routes';
import {AuthProvider} from '../../contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router></Router>
        </AuthProvider>
    );
}

export default App;
