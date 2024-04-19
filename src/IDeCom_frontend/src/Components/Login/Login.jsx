import React, {useRef, useState} from "react";
import { IDeCom_backend } from 'declarations/IDeCom_backend';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState(localStorage.getItem("username") || '');
    const inputRef = useRef(null);
    const navigate = useNavigate();


    const handleLogin = (event) => {
        const username = inputRef.current.value;

        IDeCom_backend.login(username).then((user) => {
            setUsername(user.username);
            localStorage.setItem('username', user.username);
            navigate("/");
        });
        return false;
    }

    return (
        <>
            { username == '' && (
                <form action="#" className='App'>
                <br></br>
                <label htmlFor="username">Enter your username: &nbsp;</label>
                <input id="username" alt="username" type="text" ref={inputRef}/>
                <button type="button" onClick={handleLogin}>Click!</button>
                </form>
            )}
        </>
    )
};

export default Login;