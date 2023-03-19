import React from 'react';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import Page from '../components/Page';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/Home';
import {isLogged} from '../auth/auth';

function PrivateRoute({condition, redirectRoute}) {
    return condition() ? <Outlet></Outlet> : <Navigate to={redirectRoute}></Navigate>;
}

PrivateRoute.defaultProps = {
    condition: isLogged,
    redirectRoute: '/login'
};

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PrivateRoute></PrivateRoute>}>
                    <Route exact path="/" element={<Page component={<Home></Home>}></Page>}></Route>
                </Route>
                <Route exact path="/counter" element={<PrivateRoute></PrivateRoute>}>
                    <Route exact path="/counter" element={<Page component={<Counter></Counter>}></Page>}/>
                </Route>
                <Route exact path="/posts" element={<PrivateRoute></PrivateRoute>}>
                    <Route exact path="/posts" element={<Page component={<Posts></Posts>}></Page>}/>
                </Route>

                {/*login*/}
                <Route exact path="/login"
                       element={<PrivateRoute condition={() => !isLogged()} redirectRoute="/"></PrivateRoute>}>
                    <Route exact path="/login" element={<Login></Login>}/>
                </Route>
                {/*register*/}
                <Route exact path="/register"
                       element={<PrivateRoute condition={() => !isLogged()} redirectRoute="/"></PrivateRoute>}>
                    <Route exact path="/register" element={<Register></Register>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;