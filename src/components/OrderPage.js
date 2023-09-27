import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faSearch, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavBar } from './NavBar';
import CartItem from './CartItems';
import AddItemDialog from './AddCartItem';
import { OrderPageSummary } from './OrderPageSummary';
import { addItem, approveItem, rejectItem } from '../store/slice/OrderListSlice';

import './styles.css'

const initialCart = [
    { id: 1, name: 'Chicken Breasts', brand: 'Hormel', quantity: 2, price: 10, status: 'Pending' },
    { id: 2, name: 'Chicken Breasts', brand: 'Hormel', quantity: 3, price: 15, status: 'Pending' },
];

const OrderPage = () => {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

    const openAddItemDialog = () => {
        setIsAddItemDialogOpen(true);
    };

    const closeAddItemDialog = () => {
        setIsAddItemDialogOpen(false);
    };

    const handleAddItem = (newItem) => {
        dispatch(addItem(newItem));
        closeAddItemDialog();
    };

    const [summary, setSummary] = useState([]);

    useEffect(() => {
        fetch('/MockData.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setSummary(jsonData.summary);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            < NavBar />
            < OrderPageSummary />
            <div className='OrderPage_Main-page'>
                <div className='OrderPage_Order-summary'>
                    <ul className='OrderPage_summary-list'>
                        {summary.map((item, index) => (
                            <li key={item.id} className={`item ${index === summary.length - 1 ? 'last-item' : ''}`}>
                                <span className='OrderPage_Summary-title'>{item.name}<br /></span>
                                <span className='OrderPage_Summary-description'><strong>{item.description}</strong></span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='OrderPage_Summary-order-list'>
                    <div className='OrderPage_Summary-Search-add-item'>
                        <div className="OrderPage_Summary-search-bar">
                            <input type="text" placeholder="Search" className="OrderPage_Summary-search-bar-input" />
                            <FontAwesomeIcon icon={faSearch} className="OrderPage_Summary-search-icon" />
                        </div>
                        <div className='OrderPage_Summary-add-btn-print-icon'>
                            <span>
                                <button className='OrderPage_Summary-add-btn' onClick={openAddItemDialog}>Add Item</button>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faPrint} className="OrderPage_Summary-print-icon" />
                            </span>
                        </div>
                    </div>
                    <table className='OrderPage_Summary-order-list-container'>
                        <thead>
                            <tr className='underline-table'>
                                <th className='order-list-heading-product-width'>Product name</th>
                                <th className='order-list-heading-brand'>Brand</th>
                                <th className='order-list-heading-brand'>Price</th>
                                <th className='order-list-heading-brand'>Quantity</th>
                                <th className='order-list-heading-brand'>Total</th>
                                <th className='order-list-heading-status'>Status</th>
                            </tr>
                        </thead>
                        <tbody >
                            {cart.map((product) => (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    onApprove={() => dispatch(approveItem(product))}
                                    onReject={() => dispatch(rejectItem(product))}
                                />
                            ))}
                        </tbody>
                    </table>
                    <AddItemDialog
                        isOpen={isAddItemDialogOpen}
                        onRequestClose={closeAddItemDialog}
                        onAddItem={handleAddItem}
                    />
                </div>
            </div>
        </>
    )
}

export default OrderPage;