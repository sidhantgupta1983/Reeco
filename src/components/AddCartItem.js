import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles.css'

Modal.setAppElement('#root');

const AddItemDialog = ({ isOpen, onRequestClose, onAddItem }) => {
    const [newItem, setNewItem] = useState({
        name: '',
        brand: '',
        quantity: '',
        price: '',
    });

    const handleAddItem = () => {
        const total = parseFloat(newItem.quantity) * parseFloat(newItem.price);
        const status = 'Pending';

        const newItemToAdd = {
            ...newItem,
            total,
            status,
        };

        onAddItem(newItemToAdd);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className='Add_Cart_Item_Dialog_Box'>
            <h2 className='Add_Item_title'>Add Item</h2>
            <h3>Product Name :
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                /></h3>
            <br />
            <h3>Brand :
                <input
                    type="text"
                    placeholder="Brand"
                    value={newItem.brand}
                    onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                /></h3>
            <br />
            <h3>Quantity :
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                /></h3>
            <br />
            <h3>Price :
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                /></h3>
            <br />
            <span >
                <button className='Add_Item_btn' onClick={handleAddItem}>Add Item</button>
                <button className='Cancel_Item_btn' onClick={onRequestClose}>Cancel</button>
            </span>
        </Modal>
    );
}

export default AddItemDialog;
