import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import './styles.css'

export const OrderPageSummary = () => {
  return (
    <div className='OrderPage_Summary'>
        <div className='OrderPage_Summary_Order-details'>
            Orders
            <span className='OrderPage_Summary_Angle-right'a><FaAngleRight/></span>
            <span className='OrderPage_Summary-order-no'>Order 32457ABC</span>
        </div>
        <div className='OrderPage_Summary_Order-approve'>
            <span className='OrderPage_Summary_Order-approve-no'>
                Order 32457ABC
            </span>
            <span className='OrderPage_Summary_Order-approve-button'>
                <button className='OrderPage_Summary_Back-button'>Back</button>
                <button className='OrderPage_Summary_Approve-order'>Approve Order</button>
            </span>
        </div>

    </div>
  )
}
