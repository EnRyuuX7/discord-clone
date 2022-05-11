import React, { useState, useContext } from "react";
import "./App.css";
import "./components/Chat/Chat.scss";
import Container from "./components/Container";
import Login from "./components/Authorization/Login";
import SignUp from "./components/Authorization/SignUp";
import AuthContext from "./Context/AuthContext";

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
        </AuthContext.Provider>
    );
}

export default App;
