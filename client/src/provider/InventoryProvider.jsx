import React, { useState, useEffect } from 'react';
import InventoryContext from '../contexts/InventoryContext';

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/inventory`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                setInventory(data);
                
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };
        
        fetchData();
    }, []);
    
    return (
        <InventoryContext.Provider value={inventory}>
            {children}
        </InventoryContext.Provider>
    );
};