import { useNavigate } from "react-router-dom"
import React from 'react';
import './login.css'
import AnAdventureAwaits from '/AnAdventureAwaits.png';

export function Login() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState(null);

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/story');
    }

    async function logIn() {
        loginOrSignUp('/auth/signup');
    }

    async function signUp() {
        loginOrSignUp('/auth/login');
    }

    async function loginOrSignUp(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ userName: userName, password: password}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if(response?.status === 200) {
            localStorage.setItem('userName', userName)
        } else {
            const error = await response.json();
            setErrorMsg(`Error: ${body.msg}`);
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
                        Welcome {userName} to Storyweave, An Adventure Awaits!
                    </h3>
                    <div className="row justify-content-center">
                        <div className="pt-3">
                            <label htmlFor="username">Username</label>
                            <input type="text"  className="form-control" id="username" value={username} onChange={} placeholder="Type your Username"/>
                        </div>
                        <div className="py-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="********"/>
                        </div>
                        <button onClick={handleNavigation} className="btn btn-lg btn-primary btn-block">Log In</button>
                        <button onClick={handleNavigation} className="btn btn-lg btn-secondary btn-block">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}