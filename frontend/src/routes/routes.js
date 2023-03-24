import React, {useState} from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import Empresa from '../pages/Empresa';
import Contato from '../pages/Contato';
import NewProject from '../pages/NewProject';
import useAuth from '../auth/useAuth';
import Projetos from '../pages/Projetos';
import ViewProject from '../pages/ViewProject';

function PrivateRoute({condition, redirectRoute}) {
    const auth = useAuth();
    if(auth.loading) return null;
    return (
        condition ? <Outlet></Outlet> : <Navigate to={redirectRoute}></Navigate>
    )
}

PrivateRoute.defaultProps = {
    redirectRoute: '/login'
};

function Router() {
    const auth = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PrivateRoute condition={auth.isLogged}></PrivateRoute>}>
                    <Route exact path="/" element={<Home></Home>}></Route>
                </Route>
                <Route exact path="/projects" element={<PrivateRoute condition={auth.isLogged}></PrivateRoute>}>
                    <Route exact path="/projects" element={<Projetos></Projetos>}></Route>
                </Route>
                <Route exact path="/empresa" element={<PrivateRoute condition={auth.isLogged}></PrivateRoute>}>
                    <Route exact path="/empresa" element={<Empresa></Empresa>}></Route>
                </Route>
                <Route exact path="/contato" element={<PrivateRoute condition={auth.isLogged}></PrivateRoute>}>
                    <Route exact path="/contato" element={<Contato></Contato>}></Route>
                </Route>
                <Route exact path="/newproject" element={<PrivateRoute condition={auth.isLogged}></PrivateRoute>}>
                    <Route exact path="/newproject" element={<NewProject></NewProject>}></Route>
                </Route>
                <Route exact path="/project/:id" element={<PrivateRoute condition={auth.isLogged}></PrivateRoute>}>
                    <Route exact path="/project/:id" element={<ViewProject></ViewProject>}></Route>
                </Route>


                {/*login*/}
                <Route exact path="/login"
                       element={<PrivateRoute condition={!auth.isLogged} redirectRoute="/"></PrivateRoute>}>
                    <Route exact path="/login" element={<Login></Login>}/>
                </Route>
                {/*register*/}
                <Route exact path="/register"
                       element={<PrivateRoute condition={!auth.isLogged} redirectRoute="/"></PrivateRoute>}>
                    <Route exact path="/register" element={<Register></Register>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;