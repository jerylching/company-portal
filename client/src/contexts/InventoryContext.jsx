import { createContext, useContext } from 'react';

const InventoryContext = createContext();

export const useInventory = () => {
    return useContext(InventoryContext);
};

export default InventoryContext;