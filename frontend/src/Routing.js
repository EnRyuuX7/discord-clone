import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./components/Authorization/SignUp";

function Routing() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="signup" element={<SignUp />} />
        </Routes>
    );
}

export default Routing;
