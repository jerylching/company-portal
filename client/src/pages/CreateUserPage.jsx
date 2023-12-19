import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import companyLogo from '../assets/ABC-Company-Logo.png';

function CreateUserPage() {
    const navigateTo = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [role, setRole] = useState('');
    const { user } = useContext(UserContext);

    const createUserSubmissionHandler = async (event) => {
        event.preventDefault();

        const data = await fetch(`${import.meta.env.VITE_API_URL}/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.accessToken}`  },
            body: JSON.stringify({
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                password: password,
                status: status,
                role: role
            })
        })

        try {
            const response = await data.json();

            if (data.ok) {
                // Check if the expected properties are present in the response
                if (response && response.status === 'create_user_success') {
                    alert('User successfully created.');
                    navigateTo('/home');
                } else if (response && response.error) {
                    alert(response.error);
                } else {
                    // Handle unexpected response structure
                    console.error('Unexpected response structure:', response);
                }
            } else {
                // Handle non-OK response
                console.error('Failed to create user. Status:', data.status);
            }
        } catch (error) {
            // Handle JSON parsing error
            console.error('Error parsing JSON:', error);
        }
    };

    return (
        <div className="create-user-form">
            <header>
                <img src={companyLogo} className="company-logo" alt="abcLogo"/>
                <h2>Company Portal</h2>
            </header>
            <form className="create-user-details">
            <input className="first-name-input-box" type="text" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required/>
                <input className="last-name-input-box" type="text" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required/>
                <input className="email-input-box" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                <input className="password-input-box" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                <input className="status-input-box" type="text" value={status} placeholder="Status" onChange={(e) => setStatus(e.target.value)} required/>
                <input className="role-input-box" type="text" value={role} placeholder="Role" onChange={(e) => setRole(e.target.value)} required/>
                <button type="button" className="btn-create-user" onClick={createUserSubmissionHandler}>Create User</button>
            </form>
        </div>
    );
};

export default CreateUserPage