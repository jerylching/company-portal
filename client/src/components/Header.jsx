import React, { useContext } from 'react';
import companyLogo from '../assets/ABC-Company-Logo.png';
import logoutButton from '../assets/Logout.png';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const Header = () => {
    const { unsetUser } = useContext(UserContext);
    const navigateTo = useNavigate();

    const logoutHandler = () => {
        unsetUser()
        navigateTo('/')
    }

    return (
        <header className="header">
            <div className="logo-container">
                <img src={companyLogo} alt="abcLogo"/>
                <h2>company portal</h2>
            </div>
            <div className="logout">
                <button type="button" className="btn-logout" onClick={logoutHandler}>
                    <span>logout</span>
                    <img src={logoutButton} alt="logout"/>
                </button>
            </div>
        </header>
    );
};
  
export default Header;