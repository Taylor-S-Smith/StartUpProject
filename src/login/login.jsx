import React from 'react';
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import './login.css'
import AnAdventureAwaits from '/AnAdventureAwaits.png';

export function Login({isAuthenticated, setIsAuthenticated}) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();

    async function logIn() {
        loginOrSignUp('api/auth/login');
    }

    async function signUp() {
        loginOrSignUp('api/auth/signup');
    }

    async function loginOrSignUp(endpoint) {

        if (!username || ! password) {
            setErrorMsg(`Please include both a username and password`);
        }

        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ username: username, password: password, dateJoined: Date.now()}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
            navigate('/story');
        } else if(response?.status === 401) {
            setErrorMsg(`Incorrect username or password`);
        } else {
            const error = await response.json();
            setErrorMsg(`${error.msg}`);
            console.error(error.msg);
        }
    }

    async function logOut() {

        const response = await fetch('api/auth/logout', {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if(response) {
            setIsAuthenticated(response.isAuthenticated);
            if(response.status === 204) {
            } else if(response.status === 400) {
                setErrorMsg(`Unable to log out`);
            } else {
                const error = await response.json();
                setErrorMsg(`${error.msg}`);
                console.error(error.msg);
            }
        }
        
    }

    return (
      <>
        <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-5 py-3">
                <img src={AnAdventureAwaits} className="img-fluid" alt="A hero begins his journey"/>
            </div>
        </div>
        
        <div className="text-center">
            <div className="row justify-content-center pb-4">
                <div className="col-md-6 col-11">
                    <h3>
                        Welcome {username} to Storyweave, An Adventure Awaits!
                    </h3>
                    <div className="row justify-content-center">
                        
                        {!isAuthenticated && (
                            <div>
                                <div className="pt-3">
                                    <label htmlFor="username">Username</label>
                                    <input type="text"  className="form-control" id="username" onChange={(e) => setUserName(e.target.value)} placeholder="Type your Username"/>
                                </div>
                                <div className="py-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                                </div>
                                <button onClick={() => logIn()} className="btn btn-lg btn-primary btn-block">Log In</button>
                                <button onClick={() => signUp()} className="btn btn-lg btn-secondary btn-block">Sign Up</button>
                            </div>
                        )}
                        {isAuthenticated && (
                            <button onClick={() => logOut()} className="btn btn-lg btn-secondary btn-block">Log Out</button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="errorMsg text-center">
            {errorMsg}
        </div>
      </>
    );
}