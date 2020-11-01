import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Shop from './components/shop/Shop';


//For React Router...
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import Review from './components/review/Review';
import Inventory from './components/inventory/Inventory';
import NotFound from './components/notFound/NotFound';
import ProductDetail from './components/productDetail/ProductDetail';
import Login from './components/login/Login';
import Shipment from './components/shipment/Shipment';
import PrivateRoute from './components/privateRoute/PrivateRoute';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.



// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;
// Authentication from fire auth practice;


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
  
      <h5> {loggedInUser.email} </h5>
      <Router>
        <Header></Header>
        
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/review">
            <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
