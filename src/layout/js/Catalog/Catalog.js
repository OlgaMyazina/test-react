import React from "react";

import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Sidebar from "../Sidebar/Sidebar";
import OverlookedSlider from "../OverlookedSlider/OverlookedSlider";
import Pagination from "../Pagination/Pagination";
import ProductList from "../ProductList/ProductList";

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters:
        {
          sortBy: 'popularity',
          page: 1,
        }
      ,
    };

    this.handleSort = this.handleSort.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }


  componentDidMount() {
    if (this.state.filters.length === 0)
      this.getProduct(this.props.location.search);
    let path = "";
    for (let filter in this.state.filters) {
      path += `&${filter}=${this.state.filters[filter]}`;
    }

    console.log(`path----------------------->`, path);
    this.getProduct(`${this.props.location.search}?${path}`);
  };

  componentDidUpdate(prevProps, prevState){
    console.log(prevState);

    if (this.state.filters !== prevState.filters) {
      let path = "";
      for (let filter in this.state.filters) {
        path += `&${filter}=${this.state.filters[filter]}`;
      }
      console.log(`path--update----------------------->`, path);
      this.getProduct(`${this.props.location.search}?${path}`);
    }
  }

  getProduct = (urlPath) => {
    let url = 'https://api-neto.herokuapp.com/bosa-noga/products';
    if (urlPath) {
      url += urlPath;
    }

    console.log(url);
    console.log(urlPath);

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(url, params)
      .then(response => response.json())
      .then(result => {
        this.setState({products: result})
      });
  };

  handleSort = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        sortBy: event.target.value
      }
    });
    this.getProduct(`sortBy=${this.state.filters.sortBy}`);
  };

  handlePage = (event) => {
    event.preventDefault();
    console.log('handlePage---else', event.currentTarget, event.target);

    if (event.target.getAttribute("name") == "forward") {
      this.setState({
        filters: {
          ...this.state.filters,
          page: this.state.products.page + 1
        }
      })
    } else {


      if (event.target.getAttribute("name") == "back") {
        this.setState({
          filters: {
            ...this.state.filters,
            page: this.state.products.page - 1
          }
        });
      } else {
        if (event.target.getAttribute("name")) {
          this.setState({
            filters: {
              ...this.state.filters,
              page: event.target.getAttribute("name"),
            }
          });
        }
      }
    }
  };

  render() {
    console.log(`props Catalog`, this.props, this.props.match);

    return (
      <>
        {/*<!-- Каталог товаров -->*/}
        {/*<!-- Breadcrumbs -->*/}
        <Breadcrumbs item={this.props.isMainMenuActive}/>
        {/*<!-- Тело каталога с сайдбаром -->*/}
        <main className="product-catalogue">
          {/*<!-- Сайдбар -->*/}
          <Sidebar/>
          {/*<!-- Основной контент каталога -->*/}
          <section className="product-catalogue-content">
            {/*<!-- Голова каталога с названием раздела и сортировкой -->*/}
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{this.props.isMainMenuActive}</h2>
                <span className="amount">{this.state.goods}</span>
              </div>
              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select name="" value={this.state.sort} id="sorting" onChange={this.handleSort}>
                  <option value="popularity">по популярности</option>
                  <option value="price">по цене</option>
                </select>
              </div>
            </section>
            {/*<!-- Список товаров каталога -->*/}
            {/*<!-- Товары -->*/}
            <ProductList products={this.state.products}/>


            {/*<!-- Пагинация под каталогом -->*/}
            <div className="product-catalogue__pagination">
              <Pagination page={this.state.products ? this.state.products.page : ""}
                          pages={this.state.products ? this.state.products.pages : ""}
                          onChange={this.handlePage}
              />
            </div>
          </section>
        </main>
        {/*<!-- Слайдер внизу каталога  -->*/}
        <OverlookedSlider/>
      </>
    )
  }
}