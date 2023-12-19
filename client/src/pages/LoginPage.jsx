import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../App.css';
import companyLogo from '../assets/ABC-Company-Logo.png';

function Login() {
    const navigateTo = useNavigate();
    const [email, inputEmail] = useState('');
    const [password, inputPassword] = useState('');
    const [emailError, inputEmailError] = useState('');
    const [passwordError, inputPasswordError] = useState('');
    const { user, setUser } = useContext(UserContext)
    
    const inputEmailHandler = (event) => {
        inputEmail(event.target.value);
        inputEmailError('');
    };
  
    const inputPasswordHandler = (event) => {
        inputPassword(event.target.value);
        inputPasswordError('');
    };

    const loginHandler = async (event) => {
        event.preventDefault();
    
        try {
            const data = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email, 
                    password: password 
                })
            });
    
            const response = await data.json();
    
            if (data.ok) {
                // Authentication successful. Handle the accessToken
                if (typeof response.accessToken !== 'undefined') {
                    // Store the accessToken in localStorage
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('fullName', response.fullName);
                    localStorage.setItem('role', response.role);
    
                    // Set user state with the accessToken
                    setUser({
                        fullName: response.fullName,
                        accessToken: response.accessToken,
                        role: response.role
                    });

                    // Navigate to the home page or wherever you need
                    navigateTo('/home');
                    }  
            } else {
                // Handle authentication failure
                if (response.error === 'auth_failed') {
                    // Invalid email or password
                    if (email === '') {
                        inputEmailError('Email cannot be blank.');
                    } else if (password === '') {
                        inputPasswordError('Password cannot be blank.');
                    } else {
                        inputEmailError('Invalid email or password.');
                        inputPasswordError('Invalid email or password.');
                    }
                } else if (response.error === 'token_missing') {
                    // Token missing from the response (server-side issue)
                    console.error('Token missing from the response.');
                } else {
                    // Other errors
                    console.error('Authentication failed:', response.message);
                }
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return (
        <div className="login-form">
            <header>
                <img src={companyLogo} className="company-logo" alt="abcLogo"/>
                <h2>Company Portal</h2>
            </header>
            <form className="login-details">
                <input className="email-input-box" type="email" value={email} placeholder="Email" onChange={inputEmailHandler} />
                <p className="email-error-message">{emailError}</p>
                <input className="password-input-box" type="password" value={password} placeholder="Password" onChange={inputPasswordHandler} />
                <p className="password-error-message">{passwordError}</p>
                <button type="button" className="btn-login" onClick={loginHandler}>Login</button>
            </form>     
        </div>      
    );
};

export default Login;