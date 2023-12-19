import React, { useState } from 'react';
import UserContext from '../contexts/UserContext';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        accessToken: localStorage.getItem('accessToken'),
        fullName: localStorage.getItem('fullName'),
        role: localStorage.getItem('role')
    });

    const unsetUser = () => {
        localStorage.clear();
        setUser({
            accessToken: null,
            fullName: null,
            role: null
        });
    };

    return (
        <UserContext.Provider value={{ user, setUser, unsetUser }}>
            {children}
        </UserContext.Provider>
    );
};