import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { approveItem, rejectItem } from '../store/slice/OrderListSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';

import './styles.css';

Modal.setAppElement('#root');

function CartItem({ product }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuantity, setEditedQuantity] = useState(product.quantity);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [statusMsg, setStatusMsg] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);
    const [isUrgentModalOpen, setIsUrgentModalOpen] = useState(false);
    const [updatedQuantity, setUpdatedQuantity] = useState('');
    const [updatedPrice, setUpdatedPrice] = useState('');

    const handleApprove = () => {
        setStatusMsg('Approved');
        dispatch(approveItem(product));
    };

    const handleReject = () => {
        const productName = product.name;

        setIsUrgentModalOpen(true);
    };

    const handleUrgencyResponse = (urgent) => {
        const productName = product.name;

        if (urgent) {
            setStatusMsg('MissingUrgent');
        } else {
            setStatusMsg('Missing');
        }

        dispatch(rejectItem(product));

        setIsUrgentModalOpen(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedQuantityValue = parseFloat(editedQuantity);
        const updatedPriceValue = parseFloat(editedPrice);

        let statusMessage = '';

        if (!isNaN(updatedQuantityValue) && updatedQuantityValue !== Number(product.quantity)) {
            statusMessage += 'Quantity Updated';
            setUpdatedQuantity(updatedQuantityValue);
        }

        if (!isNaN(updatedPriceValue) && updatedPriceValue !== Number(product.price)) {
            if (statusMessage) {
                statusMessage += ' and ';
            }
            statusMessage += 'Price Updated';
            setUpdatedPrice(updatedPriceValue);
        }

        if (statusMessage) {
            setStatusMsg(statusMessage);
        }

        setIsEditing(false);
    };

    const handleQuantityChange = (e) => {
        setEditedQuantity(parseFloat(e.target.value));
    };

    const totalAmount = editedQuantity * editedPrice;

    return (
        <tr className='underline-table'>
            <td className='order-list-heading-product-width'>{product.name}</td>
            <td className='order-list-heading-brand'>{product.brand}</td>
            <td className='order-list-heading-brand'>
                {isEditing ? (
                    <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                    />
                ) : (
                    updatedPrice !== '' ? updatedPrice : product.price
                )}
            </td>
            <td className='order-list-heading-brand'>
                {isEditing ? (
                    <input
                        type="number"
                        value={editedQuantity}
                        onChange={handleQuantityChange}
                    />
                ) : (
                    updatedQuantity !== '' ? updatedQuantity : product.quantity
                )}
            </td>
            <td className='order-list-heading-brand'>{totalAmount}</td>
            <td className='order-list-heading-status'>
                {statusMsg ? (
                    <span>{statusMsg}</span>
                ) : (
                    <>
                        <button onClick={handleApprove}><FontAwesomeIcon icon={faCheck} className='order-list-heading-status-tick' /></button>
                        <button onClick={handleReject}><FontAwesomeIcon icon={faTimes} className='order-list-heading-status-cancel' /></button>
                        <button onClick={handleEdit}><FontAwesomeIcon icon={faEdit} className='order-list-heading-status-edit' /></button>
                    </>
                )}
            </td>
            <Modal isOpen={isEditing} onRequestClose={() => setIsEditing(false)}>
                <h2>Edit Item</h2>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={editedQuantity}
                        onChange={(e) => setEditedQuantity(parseFloat(e.target.value))}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                    />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </Modal>
            <Modal
                className='Add_Cart_Item_Dialog_Box'
                isOpen={isUrgentModalOpen} onRequestClose={() => setIsUrgentModalOpen(false)}>
                <h2>Is the product urgent?</h2>
                <button onClick={() => handleUrgencyResponse(true)}>Yes</button>
                <button onClick={() => handleUrgencyResponse(false)}>No</button>
            </Modal>
        </tr>
    );
}

export default CartItem;
