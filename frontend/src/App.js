import React, { useState } from "react";
import "./App.css";
import Container from "./components/Container";
import Login from "./components/Authorization/Login";
import AuthContext from "./Context/AuthContext";
import { Outlet } from "react-router-dom";

function App() {
    const [user, setLoginUser] = useState({});
    const [id, setId] = useState({});
    const [auth, setAuth] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                username: user,
                uid: id,
                isLoggedIn: auth,
                setLoggedIn: (value) => {
                    setAuth(value);
                },
                setUserName: (value) => {
                    setLoginUser(value);
                },
                setUserId: (value) => {
                    setId(value);
                },
            }}
        >
            {auth && <Container />}
            {!auth && <Login />}
            <Outlet />
        </AuthContext.Provider>
    );
}

export default App;
