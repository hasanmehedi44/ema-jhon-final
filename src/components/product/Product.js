import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const product = props.product;
    const handleAddProduct = props.handleAddProduct;
    const {name, img, price, seller, stock, key} = props.product;
    return (
        <div className= 'single-product'>

            <div className='product-img'>  
                <img src={img} alt=""/>
            </div>

            <div className='product-details'>
               <h4> <Link to={"/product/"+key}> {name} </Link> </h4> 
               <p> by : {seller} </p>
               <h3> ${price} </h3>
               <p>Only {stock}  left in stock - Order soon </p>

               { props.showAddToCart && <button onClick={() => handleAddProduct (product)}  className='main-button' > <FontAwesomeIcon icon={faCartPlus} />  add to cart </button>}

            </div>  

        </div>
    );
};

export default Product;