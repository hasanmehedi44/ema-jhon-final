import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../reviewItem/ReviewItem';
import Cart from '../cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const history = useHistory();

    const handelProceedCheckOut = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
    }

    const handleRemoveProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart.
        const savedCart = getDatabaseCart();
        // console.log(savedCart)
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        
        setCart(cartProducts)
        
    }, [])


    const thankYou = <img src={happyImage} ></img>

    return (

        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem  key={pd.key} product = {pd}  handleRemoveProduct ={handleRemoveProduct}></ReviewItem>)
                }
                {
                    orderPlaced && thankYou
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} >
                    <button onClick={() => handelProceedCheckOut()} className='main-button' >Proceed Check Out</button>
                </Cart>
            </div>

        </div>
    );
}; 

export default Review;