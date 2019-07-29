import React from "react";
import {Link} from "react-router-dom";

import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import ProductSlider from "../ProductSlider/ProductSlider";

/*
* {
  "data": {
    "id": 25,
    "categoryId": 13,
    "title": "Туфли императрицы",
    "images": [
      "https://neto-api.herokuapp.com/bosa-noga/images5134523.jpg",
      "https://neto-api.herokuapp.com/bosa-noga/dolce-gabbana-red-tufli-3.jpg"
    ],
    "sku": "1000005",
    "brand": "Dolce & Gabbana",
    "color": "Бардо",
    "material": "Ткань",
    "reason": "Высокая мода",
    "season": "Лето",
    "heelSize": 8,
    "price": 15000,
    "sizes": [
      {
        "size": 15,
        "avalible": true
      },
      {
        "size": 18,
        "avalible": false
      }
    ]
  },
    "status": "ok"
}
*/

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      quantity: 1,
      cartName: "В корзину",
    }

  }


  getProduct = () => {
    console.log(this.props);
    const id = this.props.match.params.id;
    console.log('id', id);

    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    const url = `https://api-neto.herokuapp.com/bosa-noga/products/${id}`;
    console.log('url', url);
    return fetch(url, params)
      .then(response => response.json())
      .then(result => this.setState({product: result.data}));

  };

  componentDidMount() {
    this.getProduct();
  }

  /*
      componentDidUpdate(prevProps, prevState, snapshot) {
        /*console.log(this.props, prevProps);
        console.log(this.state, prevState);
        if ((prevProps == this.props) && (prevState == this.state)) {
          return;
        }
        this.getProduct();
        console.log(this.state);

        this.getBasketName=()=>{
          return this.state.currentSize ? "В корзину" : "Выберите размер!"
        }
      }
      */

  handlerSize = (event) => {
    event.preventDefault();
    this.setState({currentSize: event.target.innerText, cartName: "В корзину"})
  };

  handlerImagesClick = (event) => {
    event.preventDefault();
    const product = this.state.product;
    product.currentImage = event.target.src;
    this.setState({product})
  };

  handlerFavourite = (event) => {
    event.preventDefault();
    console.log(`handler favorite`, event.target);
    //получаем значения из хранилица
    const returnObj = JSON.parse(localStorage.getItem("products"));
    if (!returnObj) {
      const productsList = {
        products: []
      };
      productsList.products.push(this.state.product);
      localStorage.setItem("products", JSON.stringify(productsList));
      return;
    }
    const existElement = returnObj.products.findIndex(element => {
      return element.id === this.state.product.id;
    });
    if (existElement === -1) {
      returnObj.products.push(this.state.product);
      localStorage.setItem("products", JSON.stringify(returnObj));
    } else {
      localStorage.removeItem("products");
      returnObj.products.splice(existElement, 1);
      localStorage.setItem("products", JSON.stringify(returnObj));
    }
  };

  isBasketVisible = () => {
    return this.state.currentSize ? "" : "in-basket_disabled";
  };

  handlerMinus = () => {
    if (this.state.quantity === 1) return;
    this.setState({quantity: this.state.quantity - 1});
  };

  handlerPlus = () => {
    this.setState({quantity: this.state.quantity + 1});
  };

  handlerCart = (event) => {
    if (!this.state.currentSize) {
      this.setState({cartName: "Выберите размер!"})
    }
  };


  render() {
    return (
      <>
        {/*<!-- Карточка товара -->*/}
        {/*<!-- Breadcrumbs -->*/}
        <Breadcrumbs {...this.props}/>
        {/*<!-- Тело карточки товара -->*/}
        <main className="product-card">
          <section className="product-card-content">
            <h2 className="section-name">{this.state.product.title}</h2>
            <section className="product-card-content__main-screen">
              {/*<!-- Слайдер выбранного товара -->*/}
              <ProductSlider images={this.state.product.images} onClick={this.handlerImagesClick}/>
              {/*<!-- Изображение выбранного товара -->*/}
              <div className="main-screen__favourite-product-pic">
                <a href="#">
                  <img
                    src={this.state.product ? (this.state.product.currentImage ? this.state.product.currentImage : this.state.product.images[0]) : "#"}
                    alt=""
                    style={{width: "100%", height: "100%"}}/>
                </a>
                <a href="#" className="main-screen__favourite-product-pic__zoom"/>
              </div>
              {/*<!-- Блок информации о товаре -->*/}


              <div className="main-screen__product-info">
                <div className="product-info-title"><h2>{this.state.product.title}</h2>
                  <div className="in-stock">В наличии</div>
                </div>
                <div className="product-features">
                  <table className="features-table">
                    <thead className="hidden">
                    <tr>
                      <th>Наименование аттрибута</th>
                      <th>Значение аттрибута</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td className="left-col">Артикул:</td>
                      <td className="right-col">{this.state.product.sku}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Производитель:</td>
                      <td className="right-col">
                        <Link to={`/catalog?brand=${this.state.product.brand}`}>
                          <span className="producer">{this.state.product.brand}</span>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="left-col">Цвет:</td>
                      <td className="right-col">{this.state.product.color}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Материалы:</td>
                      <td className="right-col">{this.state.product.material}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Сезон:</td>
                      <td className="right-col">{this.state.product.season}</td>
                    </tr>
                    <tr>
                      <td className="left-col">Повод:</td>
                      <td className="right-col">{this.state.product.reason}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                  {this.state.product ? this.state.product.sizes.map(sizeItem => {
                    return (
                      <li key={sizeItem.size} onClick={this.handlerSize}
                          className={`${parseInt(this.state.currentSize) === parseInt(sizeItem.size) ? "active" : ""}`}>
                        <a href="#">{sizeItem.size}</a>
                      </li>
                    )
                  }) : (<></>)}
                </ul>
                <div className="size-wrapper">
                  <a href="#"><span className="size-rule"/><p className="size-table">Таблица размеров</p></a>
                </div>
                <a href="#" className="in-favourites-wrapper">
                  <div className="favourite" onClick={(event) => this.handlerFavourite(event)}/>
                  <p className="in-favourites">В избранное</p>
                </a>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                       onClick={this.handlerMinus}>-
                  </div>
                  {this.state.quantity}
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                       onClick={this.handlerPlus}>+
                  </div>
                </div>
                <div className="price">{this.state.product.price} ₽</div>
                <button className={`in-basket in-basket-click ${this.isBasketVisible()}`}
                        onClick={this.handlerCart}>
                  {this.state.cartName}
                </button>
              </div>

            </section>
          </section>
        </main>
        {/*<!-- Слайдеры внизу карточки  -->*/}
        {/*<!-- Слайдер "Вы смотрели" -->*/}
        {/**
         todo: 3.4.5 Кроме информации о выбранном товаре на экране также есть два блока с информацией о других товарах:

         Блок «Вы смотрели», где выводятся все товары (но не больше 10), страницы которых посетил пользователь во время текущей сессии. Если товаров 5 или меньше, то стрелочки «Назад» и «Вперёд» не отображаются. Если пользователь не смотрел никаких товаров, то блок не отображается.
         Блок «Похожие товары», где выводятся товары, чей Тип и Цвет совпадают с Типом и Цветом текущего товара. Если похожих товаров нет, то блок не отображается. Если товаров 3 или меньше, то стрелочки «Назад» и «Вперёд» не отображаются.
         */}
        <section className="product-card__overlooked-slider">
          <h3>Вы смотрели:</h3>
          <div className="overlooked-slider">
            <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"/>
            <div className="overlooked-slider__item overlooked-slider__item-1">
              <a href="product-card-desktop.html"/>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-2">
              <a href="product-card-desktop.html"/>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-3">
              <a href="product-card-desktop.html"/>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-4">
              <a href="product-card-desktop.html"/>
            </div>
            <div className="overlooked-slider__item overlooked-slider__item-5">
              <a href="product-card-desktop.html"/>
            </div>
            <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"/>
          </div>
        </section>
        {/*<!-- Слайдер "Похожие товары" -->*/}
        <section className="product-card__similar-products-slider">
          <h3>Похожие товары:</h3>
          <div className="similar-products-slider">
            <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"/>
            <div className="similar-products-slider__item-list__item-card item">
              <div className="similar-products-slider__item">
                <a href="product-card-desktop.html"><img
                  src="img/product-card-pics/product-card__similar-products-slider-item-1.png"
                  className="similar-products-slider__item-pic-1" alt="Ботинки женские"/>
                </a>
              </div>
              <div className="similar-products-slider__item-desc">
                <h4 className="similar-products-slider__item-name">Ботинки женские</h4>
                <p className="similar-products-slider__item-producer">Производитель: <span
                  className="producer">Norma J.Baker</span></p>
                <p className="similar-products-slider__item-price">23 150</p>
              </div>
            </div>
            <div className="similar-products-slider__item-list__item-card item">
              <div className="similar-products-slider__item">
                <a href="product-card-desktop.html"><img
                  src="img/product-card-pics/product-card__similar-products-slider-item-2.png"
                  className="similar-products-slider__item-pic-2" alt="Полуботинки женские"/></a>
              </div>
              <div className="similar-products-slider__item-desc">
                <h4 className="similar-products-slider__item-name">Полуботинки женские</h4>
                <p className="similar-products-slider__item-producer">Производитель: <span
                  className="producer">Shoes Market</span></p>
                <p className="similar-products-slider__item-price">4 670</p>
              </div>
            </div>
            <div className="similar-products-slider__item-list__item-card item">
              <div className="similar-products-slider__item">
                <a href="product-card-desktop.html"><img
                  src="img/product-card-pics/product-card__similar-products-slider-item-3.png"
                  className="similar-products-slider__item-pic-3" alt="Ботинки женские"/>
                </a></div>
              <div className="similar-products-slider__item-desc">
                <h4 className="similar-products-slider__item-name">Ботинки женские</h4>
                <p className="similar-products-slider__item-producer">Производитель: <span
                  className="producer">Menghi Shoes</span></p>
                <p className="similar-products-slider__item-price">6 370</p>
              </div>
            </div>
            <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"/>
          </div>
        </section>
      </>
    )
  }
};


