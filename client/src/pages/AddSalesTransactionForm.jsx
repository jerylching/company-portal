import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSales } from '../contexts/SalesContext';
import Header from '../components/Header';

function AddSalesTransactionsForm() {
    const navigateTo = useNavigate();
    const { sales: salesContext } = useSales();
    const [salesState, setSalesState] = useState([]);
    const [salesFormData, setSalesFormData] = useState({
        date: '',
        itemcode: '',
        brand: '',
        description: '',
        category: '',
        subcategory: '',
        size: '',
        price: '',
        quantity: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const setNewSalesHandler = (event) => {
        const { name, value } = event.target;
        setSalesFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const addNewSalesHandler = async (event) => {
        event.preventDefault();

        if (
            !salesFormData.date ||
            !salesFormData.itemcode ||
            !salesFormData.brand ||
            !salesFormData.description ||
            !salesFormData.category ||
            !salesFormData.subcategory ||
            !salesFormData.size ||
            !salesFormData.price ||
            !salesFormData.quantity
        ) {
            setErrorMessage('All fields are required');
        } else {
            const newSalesData = {
                ...salesFormData,
                quantity: parseInt(salesFormData.quantity),
            };

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/sales`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSalesData),
                });

                if (response.ok) {
                    alert('New sales transaction is successfully added');

                    setSalesState((prevSales) => [...prevSales, newSalesData]);

                    setSalesFormData({
                        date: '',
                        itemcode: '',
                        brand: '',
                        description: '',
                        category: '',
                        subcategory: '',
                        size: '',
                        price: '',
                        quantity: '',
                    });

                    setErrorMessage('');
                    navigateTo('/sales');
                } else {
                    alert(response.error);
                }
            } catch (error) {
                console.error('Error adding sales transaction:', error);
                alert(response.error);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="add-sales-second-header">
                <div>
                    <h3>Add Sales Transaction Form</h3>
                </div>
                <div className="different-pages-links">
                    <Link to="/home" className="home-link">
                        Home
                    </Link>
                    <Link to="/inventory" className="inventory-link">
                        Inventory Data Page
                    </Link>
                    <Link to="/sales" className="sales-link">
                        Sales Transactions Page
                    </Link>
                </div>
            </div>
            <form className="add-sales-form-container" onSubmit={addNewSalesHandler}>
                <div className="add-sales-form">
                    <div className="add-sales-form-first-column">
                        <label>date</label>
                        <input type="date" name="date" onChange={setNewSalesHandler} />
                        <label>item code</label>
                        <input type="text" name="itemcode" onChange={setNewSalesHandler} />
                        <label>brand</label>
                        <input type="text" name="brand" onChange={setNewSalesHandler} />
                        <label>description</label>
                        <input type="text" name="description" onChange={setNewSalesHandler} />
                    </div>
                    <div className="add-sales-form-second-column">
                        <label>category</label>
                        <input type="text" name="category" onChange={setNewSalesHandler} />
                        <label>subcategory</label>
                        <input type="text" name="subcategory" onChange={setNewSalesHandler} />
                        <label>size</label>
                        <input type="text" name="size" onChange={setNewSalesHandler} />
                        <label>price</label>
                        <input type="text" name="price" onChange={setNewSalesHandler} />
                        <label>quantity</label>
                        <input type="text" name="quantity" onChange={setNewSalesHandler} />
                    </div>
                </div>
                <div>
                    <p className="add-sales-form-error-message">{errorMessage}</p>
                </div>
                <div>
                    <button type="submit" className="btn-add-sales-form">
                        Add Sales Transaction
                    </button>
                </div>
            </form>
        </>
    );
}

export default AddSalesTransactionsForm;