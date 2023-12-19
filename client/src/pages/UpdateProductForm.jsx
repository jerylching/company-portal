import React, { useState, useEffect } from 'react';
import { useInventory } from '../contexts/InventoryContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

function UpdateProductForm() {
    const navigate = useNavigate();
    const { itemcode } = useParams();
    const { setInventory } = useInventory();
    const inventoryData = useInventory();
    const inventory = inventoryData.data || [];
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

    useEffect(() => {
        const productToUpdate = inventory.find(item => item.itemcode === itemcode);
        if (productToUpdate) {
            setFormData(productToUpdate);
        }
    }, [inventory, itemcode]);

    const updateProductHandler = async (event) => {
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
                const response = await fetch(`${import.meta.env.VITE_API_URL}/inventory/${itemcode}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                if (response.ok) {
                    alert(`The details for product ${itemcode} has been updated`)
                    navigate('/inventory');
                } else {
                    alert('Failed to update the product. Please try again')
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }

            // Reset form data
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

            // Clear error message
            setErrorMessage('');
  
    };

    const changeInInputHandler = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <Header />
            <div className="update-product-second-header">
                <div>
                    <h3>Update Product Form</h3>
                </div>
                <div className="different-pages-links">
                    <Link to="/inventory" className="inventory-link">Back to Inventory</Link>
                </div>
            </div>
            <form className="update-product-form-container" onSubmit={updateProductHandler}>
                <div className="update-product-form">
                    <div className="update-product-form-first-column">
                        <label>item code</label>
                        <input type="text" name="itemcode" onChange={changeInInputHandler} />
                        <label>brand</label>
                        <input type="text" name="brand" onChange={changeInInputHandler} />
                        <label>description</label>
                        <input type="text" name="description" onChange={changeInInputHandler} />
                        <label>category</label>
                        <input type="text" name="category" onChange={changeInInputHandler} />
                        <label>subcategory</label>
                        <input type="text" name="subcategory" onChange={changeInInputHandler} />
                    </div>
                    <div className="update-product-form-second-column">
                        <label>size</label>
                        <input type="text" name="size" onChange={changeInInputHandler} />
                        <label>cost</label>
                        <input type="text" name="cost" onChange={changeInInputHandler} />
                        <label>price</label>
                        <input type="text" name="price" onChange={changeInInputHandler} />
                        <label>quantity</label>
                        <input type="text" name="quantity" onChange={changeInInputHandler} />
                    </div>
                </div>
                <div>
                    <p className="update-product-form-error-message">{errorMessage}</p>
                </div>
                <div>
                    <button className="btn-update-product-form">Update Product</button>
                </div>
            </form>
        </>
    );
};

export default UpdateProductForm;