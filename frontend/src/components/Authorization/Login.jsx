import React, { useState } from "react";
import "./LoginSignUp.modules.scss";
import axios from 'axios';
import AuthContext from "../../Context/AuthContext";
import { Link } from "react-router-dom";

function Login() {

    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value

        })

    }

    function validateForm() {
        return user.username.length > 0 && user.password.length > 0;
    }

    return <AuthContext.Consumer>
        {(ctx) => {
            const login = (event) => {
                event.preventDefault()
                axios.post("http://localhost:3001/api/auth/signin", user)
                    .then(res => {
                        alert(res.data.message)
                        ctx.setUserName(res.data.username)
                        ctx.setUserId(res.data.id)
                        ctx.setLoggedIn(res.data.loggedIn)
                    })
            }
            return (
                <div className="login__wrapper">
                    <div className="form__header">
                        <div className="form__title"><h1>Login</h1></div>
                        <div className="form__login">Don't have an account? <Link to="/signup">Sign up</Link></div>
                    </div>
                    <form className="login__form" autoComplete="off">
                        <div className="login__formGroup">
                            <label>Username</label>
                            <input autoFocus className="form__input" type="text" name="username" value={user.name} onChange={handleChange} placeholder="Username" />
                        </div>
                        <div className="login__formGroup">
                            <label>Password</label>
                            <input className="form__input" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Your password" />
                        </div>
                        <button className="login__button btn" type="submit" disabled={!validateForm()} onClick={login}>
                            Login
                        </button>
                    </form>
                </div >
            )
        }}
    </AuthContext.Consumer >
}

export default Login;
