import React from 'react';
import { useInventory } from '../contexts/InventoryContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

function InventoryData() {
    const inventoryData  = useInventory();
    const inventory = inventoryData.data || [];
    const { itemcode } = useParams();
    const navigateTo = useNavigate();

    const deleteProductHandler = async (itemcode, event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/inventory/${itemcode}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                alert(`Product ${itemcode} has been deleted successfully`)
                dispatch({ type: 'DELETE_PRODUCT', payload: itemcode });
            } else {
                const errorText = await response.text(); // Read the error response as text
                alert(errorText);
                console.error('Delete request failed:', errorText);
            }
        } catch (error) {
            console.error('Error during delete request:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="inventory-second-header">
                <div>
                    <h3>Inventory Data Page</h3>
                </div>
                <div className="different-pages-links">
                    <Link className="home-link" to="/home">Home</Link>
                    <Link to="/sales" className="sales-link">Sales Transactions Page</Link>
                </div>
            </div>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Item Code</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Size</th>
                        <th>Cost</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.itemcode}>
                            <td className="item-code">{item.itemcode}</td>
                            <td className="brand">{item.brand}</td>
                            <td className="description">{item.description}</td>
                            <td className="category">{item.category}</td>
                            <td className="sub-category">{item.subcategory}</td>
                            <td className="size">{item.size}</td>
                            <td className="cost">{item.cost}</td>
                            <td className="price">{item.price}</td>
                            <td className="quantity">{item.quantity}</td>
                            <td className="action">
                                <button type="button" className="btn-update" onClick={() => navigateTo(`/update-product-form/${item.itemcode}`)}>update</button>
                                <button type="button" className="btn-delete" onClick={() => deleteProductHandler(item.itemcode, event)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="submit" className="btn-add-product" onClick={() => navigateTo('/add-product-form')}>Add New Product</button>
        </>
    );
};

export default InventoryData;