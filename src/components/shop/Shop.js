import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'  
import Product from '../product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]); 

    useEffect(() => {
       const savedCart = getDatabaseCart(); 
       const productKeys = Object.keys(savedCart);
       const previousCart = productKeys.map(existingKey => {
          const product = fakeData.find(pd => pd.key === existingKey) 
          product.quantity = savedCart[existingKey];
          return product;
       })

     setCart(previousCart);

    }, [])

    const handleAddProduct = (product) => {
        const productToBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== productToBeAddedKey)
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // const count = sameProduct.length; 
        // const newCart = [...cart, product];
        // setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length; 
        setCart(newCart);
        addToDatabaseCart(product.key, count)  
    }

    return (
        <div className='twin-container' >
            <div className='product-container'>
                {
                    products.map(product => <Product 
                        key={product.key}
                        showAddToCart={true}
                        product = {product}
                        handleAddProduct = {handleAddProduct}
                         ></Product>)
                }
            </div>

            <div className='cart-container'>
                <Cart cart={cart} ></Cart>
            </div>
        </div>
    );
};

export default Shop;