import { createContext, useContext } from 'react';

const SalesContext = createContext();

export const useSales = () => {
    return useContext(SalesContext);
};

export default SalesContext;