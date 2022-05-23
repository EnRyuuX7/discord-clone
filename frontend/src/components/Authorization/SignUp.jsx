import React, { useState } from 'react'
import axios from "axios";
import "./LoginSignUp.modules.scss";
import { Link } from "react-router-dom";

function SignUp() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    })
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,//spread operator 
            [name]: value
        })
    }
    //register function 
    const Register = () => {
        const { username, email, password } = user
        if (username && email && password) {
            axios.post("http://localhost:3001/api/auth/signup", user)
                .then(res => console.log(res))
        }
        else {
            alert("invalid input")
        };
    }

    function validateForm() {
        return user.username.length > 0 && user.password.length > 0;
    }

    return (
        <div className="signup__wrapper">
            <div className="form__header">
                <div className="form__title"><h1>Sign Up</h1></div>
                <div className="form__login">Already have an account?  <Link to="/">Login</Link> </div>
            </div>
            <form className="signup__form" autoComplete="off">
                <div className="signup__formGroup">
                    <label>Username</label>
                    <input autoFocus className="form__input" type="text" name="username" value={user.name} onChange={handleChange} placeholder="Username" />
                </div>
                <div className="signup__formGroup">
                    <label>Email</label>
                    <input className="form__input" type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className="signup__formGroup">
                    <label>Password</label>
                    <input className="form__input" type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                </div>
                <button className="signup__button btn" type="submit" disabled={!validateForm()} onClick={Register} >
                    Signup
                </button>
            </form>
        </div >
    )
}

export default SignUp