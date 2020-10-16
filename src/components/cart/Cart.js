import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, prd) => total = total + prd.price * prd.quantity, 0);

    let shipping = 0;
       if ( totalPrice > 35) {
           shipping = 0;
       }
       else if (totalPrice > 15) {
            shipping = 4.99;
       }
     
    const tax = (totalPrice / 10);   
    
    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return precision;
    }

    
    return (
        <div>
            <h4 className="bg-primary" >order summary.</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Shipping Cost: {shipping}</p>
            <small>Tax + VAT : {formatNumber(tax)}</small> 
            <p>Total Price : {totalPrice + tax + shipping}</p>
            <Link to="/review">
                <button className="main-button">Review Order</button>
            </Link>
        </div>
    );
};

export default Cart;