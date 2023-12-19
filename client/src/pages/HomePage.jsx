import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
    const navigateTo = useNavigate();

    // Get user information from localStorage
    const fullName = localStorage.getItem('fullName');
    const role = localStorage.getItem('role');

    const createNewUserButtonHandler = (event) => {
        event.preventDefault();

        console.log('Navigating to create user page');
        console.log('Role:', role);

        if (role === 'admin') {
            navigateTo('/create-user-page')
        } else {
            alert('Only admins are allowed to create new users')
        }
    }

    return (
        <div>
            <Header />
            <div className="home-second-header">
                <h3>home page</h3>
            </div>
            <div className="home-welcome-message">
                <p>welcome, <span>{fullName}</span>!</p>
            </div>
            <div className="home-quick-links">
                <p>quick links</p>
                <div>
                    <button type="button" className="btn-create-user-page" onClick={createNewUserButtonHandler}>Go to Create New User Page</button>
                    <button type="button" className="btn-inventory-page" onClick={() => navigateTo('/inventory')}>Inventory Monitoring Page</button>
                    <button type="button" className="btn-sales-page" onClick={() => navigateTo('/sales')}>Sales Monitoring Page</button>
                </div>
            </div>
        </div>
    );
};

export default Home;