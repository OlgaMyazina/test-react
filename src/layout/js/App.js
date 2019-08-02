import React, { Component} from "react";
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

export const CategoriesContext = React.createContext({
  categories:[]
  }
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const url = "https://api-neto.herokuapp.com/bosa-noga/categories";
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    fetch(url, params)
      .then(response => response.json())
      .then(result => this.setState({categories: result}));
  }

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <CategoriesContext.Provider value={this.state}>
          <HeaderComponent/>

          <Switch>
            <Route exact path="/" component={Home}/>
            {/*<Route path='/cart' component={Cart}/>*/}
            <Route path="/product/:id?" render={(props) => (
              <Product {...props}/>
            )}/>
            <Route path="/catalog/:id?" render={(props) => (
              <Catalog {...props} />
            )}/>
            <Route path="/productlist" component={ProductList}/>
            <Route path="/order" component={Order}/>
            <Route path="/favorite" component={Favorite}/>
            <Route path="/about" component={About}/>

          </Switch>
          <Footer/>
        </CategoriesContext.Provider>
      </BrowserRouter>
    )
  }
}


