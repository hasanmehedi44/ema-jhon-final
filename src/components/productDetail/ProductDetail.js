import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h2> Your Product Detail here!</h2>
            <Product showAddToCart={false} product={product} ></Product>
        </div>
    );
};

export default ProductDetail;