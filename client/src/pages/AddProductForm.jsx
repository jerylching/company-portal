import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

function AddProductForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemcode: '',
        brand: '',
        description: '',
        category: '',
        subcategory: '',
        size: '',
        cost: '',
        price: '',
        quantity: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const setNewItemHandler = (event) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const addProductHandler = async (event) => {
        event.preventDefault();

        if (
            !formData.itemcode ||
            !formData.brand ||
            !formData.description ||
            !formData.category ||
            !formData.subcategory ||
            !formData.size ||
            !formData.cost ||
            !formData.price ||
            !formData.quantity
        ) {
            setErrorMessage('All fields are required');
        } else {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/inventory`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    alert('The product has been successfully added to the inventory list.')
                    navigate('/inventory');
                } else {
                    alert(response.error)
                }
            } catch (error) {
                console.error('Error adding product:', error);
            }

            setFormData({
                itemcode: '',
                brand: '',
                description: '',
                category: '',
                subcategory: '',
                size: '',
                cost: '',
                price: '',
                quantity: '',
            });

            setErrorMessage('');
            navigate('/inventory')
        }
    };

    return (
        <>
            <Header />
            <div className="add-product-second-header">
                <div>
                    <h3>Add Product Form</h3>
                </div>
                <div className="different-pages-links">
                    <Link to="/home" className="home-link">Home</Link>
                    <Link to="/inventory" className="inventory-link">Inventory Data Page</Link>
                    <Link to="/sales" className="sales-link">Sales Transactions Page</Link>
                </div>
            </div>
            <form className="add-product-form-container" onSubmit={addProductHandler}>
                <div className="add-product-form">
                    <div className="add-product-form-first-column">
                        <label>item code</label>
                        <input type="text" name="itemcode" onChange={setNewItemHandler} />
                        <label>brand</label>
                        <input type="text" name="brand" onChange={setNewItemHandler} />
                        <label>description</label>
                        <input type="text" name="description" onChange={setNewItemHandler} />
                        <label>category</label>
                        <input type="text" name="category" onChange={setNewItemHandler} />
                        <label>subcategory</label>
                        <input type="text" name="subcategory" onChange={setNewItemHandler} />
                    </div>
                    <div className="add-product-form-second-column">
                        <label>size</label>
                        <input type="text" name="size" onChange={setNewItemHandler} />
                        <label>cost</label>
                        <input type="text" name="cost" onChange={setNewItemHandler} />
                        <label>price</label>
                        <input type="text" name="price" onChange={setNewItemHandler} />
                        <label>quantity</label>
                        <input type="text" name="quantity" onChange={setNewItemHandler} />
                    </div>
                </div>
                <div>
                    <p className="add-product-form-error-message">{errorMessage}</p>
                </div>
                <div>
                    <button type="submit" className="btn-add-product-form">Add Product</button>
                </div>
            </form>
        </>
    );
};

export default AddProductForm;