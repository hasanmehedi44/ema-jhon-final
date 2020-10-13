import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity} = props.product;
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
            <button className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;