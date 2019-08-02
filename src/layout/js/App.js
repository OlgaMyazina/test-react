import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import HeaderComponent from "./HeaderComponent/HeaderComponent";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Catalog from "./Catalog/Catalog";
import Product from "./Product/Product";
import ProductList from "./ProductList/ProductList";
import Order from "./Order/Order";
import Favorite from "./Favorite/Favorite";
import About from "./About/About";
//import ProductComponent from "./ProductComponent/ProductComponent";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <HeaderComponent/>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Home}/>
        {/*<Route path='/cart' component={Cart}/>*/}
        <Route path={process.env.PUBLIC_URL + '/product/:id?'} render={(props) => (
          <Product {...props}/>
        )}/>
        <Route path={process.env.PUBLIC_URL + '/catalog/:id?'} render={(props) => (
          <Catalog {...props} />
        )}/>
        <Route path={process.env.PUBLIC_URL + '/productlist'} component={ProductList}/>
        <Route path={process.env.PUBLIC_URL + '/order'} component={Order}/>
        <Route path={process.env.PUBLIC_URL + '/favorite'} component={Favorite}/>
        <Route path={process.env.PUBLIC_URL + '/about'} component={About}/>

      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}
export default App;


