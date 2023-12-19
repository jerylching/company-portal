import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSales } from '../contexts/SalesContext';
import Header from '../components/Header';

function SalesTransactions() {
    const salesData = useSales();
    const sales = salesData.sales.data || [];
    const navigate = useNavigate();
    
    return (
        <>
            <Header />
            <div className="sales-second-header">
                <div>
                    <h3>Sales Transactions Page</h3>
                </div>
                <div className="different-pages-links">
                    <Link to="/home" className="home-link">Home</Link>
                    <Link to="/inventory" className="inventory-link">Inventory Data Page</Link>
                </div>
            </div>
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>Date (yyyy-mm-dd)</th>
                        <th>Item Code</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale._id}>
                            <td className="date">{sale.date}</td>
                            <td className="item-code">{sale.itemcode}</td>
                            <td className="brand">{sale.brand}</td>
                            <td className="description">{sale.description}</td>
                            <td className="category">{sale.category}</td>
                            <td className="sub-category">{sale.subcategory}</td>
                            <td className="size">{sale.size}</td>
                            <td className="price">{sale.price}</td>
                            <td className="quantity">{sale.quantity}</td>
                            <td className="total-amount">{(sale.quantity*sale.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="submit" className="btn-add-sales-transaction" onClick={() => navigate('/add-sales-transaction-form')}>Add Sales Transaction</button>
        </>
    );
};

export default SalesTransactions;