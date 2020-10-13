import React from 'react';
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
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


function App() {
  return (
    <div>
      <Header></Header>

      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
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
    </div>
  );
}

export default App;
