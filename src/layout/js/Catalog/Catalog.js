import React from "react";

import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Sidebar from "../Sidebar/Sidebar";
import SidebarComponents from "../SidebarComponent/SidebarComponent";
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
          //categoryId: this.props.categoryId === "" ? null : this.props.categoryId,
        }
      ,
    };
    if (this.props.products) {
      console.log(this.props.products);
      this.state = {...this.state, products: this.props.products}
    }

    this.handleSort = this.handleSort.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }


  componentDidMount() {

    if (this.props.match.params.id === 'featured') {
      console.log('featured');
      console.log(this.props);
    }

    if (this.state.filters.length === 0) {
      this.getProduct(this.props.location.search);
      return;
    }


    let path = "", url = "";
    if (this.props.match.params.id === 'featured') {
      url = 'featured';
    }
    for (let filter in this.state.filters) {
      path += `&${filter}=${this.state.filters[filter]}`;
    }

    if (this.props.location.search.split('?').length <= 1) {
      this.getProduct(url, `${this.props.location.search}?${path}`);
      return;
    }

    this.getProduct(url, `${this.props.location.search}${path}`);
  };

  componentDidUpdate(prevProps, prevState) {

    if ((this.state.filters === prevState.filters) &&
      (this.props.isMainMenuActive === prevProps.isMainMenuActive) &&
      (this.props.location === prevProps.location)) {
      return;
    }
    let path = "";
    for (let filter in this.state.filters) {
      path += `&${filter}=${this.state.filters[filter]}`;
    }

    let url = "";
    if (this.props.match.params.id === 'featured') {
      url = 'featured';
    }
    if (this.props.location.search.split('?').length <= 1) {
      this.getProduct(url, `${this.props.location.search}?${path}`);
      return;
    }
    this.getProduct(url, `${this.props.location.search}${path}`);
  }

  handlerSidebarFilter = (paramArray) => {
    if (paramArray.length === 0) {
      return;
    }
    const paramObj = {};
    const value = paramArray.map(element => {
      return paramObj[element.param] = element.value;
    });

    this.setState({
      filters: {...this.state.filters},
    })

  };

  //todo: взможно, перенести в продукт лист
  handlerFavoriteClick = (event) => {
    event.preventDefault();
    console.log("click favorite", event.target.className);
    localStorage.setItem('myCat', 'Tom');
  };

  getProduct = (url, urlPath) => {
    console.log(`get products`)
    console.log(url, urlPath);
    let newUrl = 'https://api-neto.herokuapp.com/bosa-noga/';
    newUrl += url ? url : 'products';

    if (urlPath) {
      newUrl += urlPath;
    }

    console.log(newUrl);
    console.log(urlPath);

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    return fetch(newUrl, params)
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
    this.getProduct('', `sortBy=${this.state.filters.sortBy}`);
  };

  handlePage = (event) => {
    event.preventDefault();

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

  getHeader = () => {
    if (this.props.location.search.includes("search")) {
      return "Результаты поиска";
    }
    return this.props.isMainMenuActive;
  };

  render() {
    console.log(`props Catalog`, this.props, this.props.match);

    return (
      <>
        {/*<!-- Каталог товаров -->*/}
        {/*<!-- Breadcrumbs -->*/}
        <Breadcrumbs item={this.props.isMainMenuActive}{...this.props}/>
        {/*<!-- Тело каталога с сайдбаром -->*/}
        <main className="product-catalogue">
          {/*<!-- Сайдбар -->*/}
          <SidebarComponents {...this.state} {...this.props}/>
          {/*<!-- Основной контент каталога -->*/}
          <section className="product-catalogue-content">
            {/*<!-- Голова каталога с названием раздела и сортировкой -->*/}
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{this.getHeader()}</h2>
                <span className="amount">{`${this.state.products ? this.state.products.goods : ""} товаров`}</span>
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
            <section className="product-catalogue__item-list">

            <ProductList products={this.state.products ? this.state.products.data : []}/>
            </section>


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