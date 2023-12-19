import React, { useState, useEffect } from 'react';
import SalesContext from '../contexts/SalesContext';

export const SalesProvider = ({ children }) => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/sales`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                setSales(data);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <SalesContext.Provider value={{ sales }}>
            {children}
        </SalesContext.Provider>
    );
};