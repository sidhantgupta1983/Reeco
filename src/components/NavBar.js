import React from 'react';
import { FaShoppingCart, FaAngleDown } from 'react-icons/fa';
import './styles.css';
import { HeadingWithFont } from './styledComponent'

export const NavBar = () => {
    return (
        <>
            <div className='OrderPage_NavBar'>
                <div className='OrderPage_logo'>
                    <HeadingWithFont>Reeco</HeadingWithFont>
                    <ul className='OrderPage_navigate'>
                        <li>
                            <a href='#'
                                className='OrderPage_navigate-items'>Store</a>
                        </li>
                        <li>
                            <a href='#'
                                className='OrderPage_navigate-items'>Orders</a>
                        </li>
                        <li>
                            <a href='#'
                                className='OrderPage_navigate-items'>Analytics</a>
                        </li>
                    </ul>
                </div>
                <div className='OrderPage_cart-user'>
                    <ul className='OrderPage_cart'>
                        <li>
                            <a href='#'
                                className='OrderPage_cart-items'><FaShoppingCart /></a>
                        </li>
                        <li>
                            <a href='#' 
                                className='OrderPage_cart-items'>Hello Sidhant
                                    <span className='OrderPage_angle-down'> <FaAngleDown /></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
