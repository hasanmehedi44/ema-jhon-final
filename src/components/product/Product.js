import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    console.log(props)
    const {name, img, price, seller, stock} = props.products;
    return (
        <div className= 'single-product'>

            <div className='product-img'>  
                <img src={img} alt=""/>
            </div>

            <div className='product-details'>
               <h4> {name} </h4> 
               <p> by : {seller} </p>
               <h3> ${price} </h3>
               <p>Only {stock}  left in stock - Order soon </p>
               <button className='main-button' > <FontAwesomeIcon icon={faCartPlus} />  add to cart</button>
            </div>  

        </div>
    );
};

export default Product;