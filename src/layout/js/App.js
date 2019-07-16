import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Catalog from "./Catalog/Catalog";
import Product from "./Product/Product";
import ProductList from "./ProductList/ProductList";
import Order from "./Order/Order";
import Favorite from "./Favorite/Favorite";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMainMenuActive: "Акции",
      isDroppedVisible: "",
    };
    this.mainSubmenuVisibility = this.mainSubmenuVisibility.bind(this);
    this.subMenuClick = this.subMenuClick.bind(this);
  }

  //Выпадающее меню главного меню (пока с общим списком для всех пунктов)
  mainSubmenuVisibility = (event) => {
    console.log(event);
    if (event.target.textContent === this.state.isMainMenuActive) {
      this.setState({
        isDroppedVisible: false,
        isMainMenuActive: "",
        categoryId: "",
      });
    } else {

      this.setState({
        isDroppedVisible: true,
        isMainMenuActive: event.target.textContent,
        categoryId: event.target.getAttribute("data-category-id") ? event.target.getAttribute("data-category-id") : "",
      })
    }
  };

  subMenuClick = (event) => {
    event.preventDefault();
    this.setState({
      isDroppedVisible: !this.state.isDroppedVisible,
    });
  };

  render() {
    const propCatalog = this.state;
    return (
      <BrowserRouter>
        <Header mainSubmenuVisibility={this.mainSubmenuVisibility} subMenuClick={this.subMenuClick} {...this.state}/>

        <Switch>
          <Route exact path='/' component={Home}/>
          {/*<Route path='/cart' component={Cart}/>*/}
          <Route path='/product/:id?' component={Product}/>
          <Route path="/catalog/:id?" render={(props) => (
            <Catalog {...props} {...propCatalog} />
          )}/>
          <Route path="/productlist" component={ProductList}/>
          <Route path="/order" component={Order}/>
          <Route path="/favorite" component={Favorite}/>

        </Switch>
        <Footer/>
      </BrowserRouter>
    )
  }
}



