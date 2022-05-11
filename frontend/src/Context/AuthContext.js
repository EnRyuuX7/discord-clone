import React from "react";

React.createContext({
    Field1: "value1",
    Field2: "value2",
    Field3: "value3",
    Field4: "value4",
});

const AuthContext = React.createContext({
    username: "",
    uid: "",
    isLoggedIn: false,
    setLoggedIn: () => {},
    setUserName: () => {},
    setUserId: () => {},
});

export default AuthContext;
