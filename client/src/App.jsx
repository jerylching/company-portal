import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import InventoryData from './pages/InventoryDataPage';
import AddProductForm from './pages/AddProductForm';
import UpdateProductForm from './pages/UpdateProductForm';
import SalesTransactions from './pages/SalesTransactionsPage';
import AddSalesTransactionsForm from './pages/AddSalesTransactionForm';
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-user-page" element={<CreateUserPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/inventory" element={<InventoryData />} />
            <Route path="/add-product-form" element={<AddProductForm />} />
            <Route path="/update-product-form/:itemcode" element={<UpdateProductForm />} />
            <Route path="/sales" element={<SalesTransactions />} />
            <Route path="/add-sales-transaction-form" element={<AddSalesTransactionsForm />} />
        </Routes>
    );
}

export default App;