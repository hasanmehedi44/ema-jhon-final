import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header' >
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    loggedInUser.email ?
                    <a onClick={() => setLoggedInUser({})} style={{color:'red'}}>Sign Out</a>
                    : 
                    <Link to="/login" style={{color:'green'}}>Sign in</Link>
                }
            </nav>
        </div>
    );
};

export default Header;