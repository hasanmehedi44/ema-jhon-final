import React from 'react';

const ReviewItem = (props) => {
    const handleRemoveProduct = props.handleRemoveProduct;
    const {name, quantity, key, price} = props.product;
    const reviewItemStayle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '10px',
        paddingBottom: '10px',
        marginLeft: '200px'
    }
    return (
        <div className='review-item' style={reviewItemStayle} >
            <h5> {name} </h5>
            <p>Quantity: {quantity}</p>
            <p> Single Product Price :  <strong> ${price} </strong></p>
            <p>Total Price of this Product : {price * quantity} </p>
            <button  onClick={() => handleRemoveProduct(key)} className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;