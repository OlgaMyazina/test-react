import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

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

const Product = (props) => {
  console.log(props);
  const {title, images, sku, brand, color, material, reason, season, heelSize, price, sizes, ...rest} = props;
  return (
    <>
      {/*<!-- Карточка товара -->*/}
      {/*<!-- Breadcrumbs -->*/}
      <Breadcrumbs/>
      {/*<!-- Тело карточки товара -->*/}
      <main className="product-card">
        <section className="product-card-content">
          <h2 className="section-name">{title}</h2>
          <section className="product-card-content__main-screen">
            {/*<!-- Слайдер выбранного товара -->*/}
            <section className="main-screen__favourite-product-slider">
              <div className="favourite-product-slider">
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
                <div class="favourite-product-slider__item favourite-product-slider__item-1">
                  <a href="#"></a>
                </div>
                <div className="favourite-product-slider__item favourite-product-slider__item-2">
                  <a href="#"></a>
                </div>
                <div className="favourite-product-slider__item favourite-product-slider__item-3">
                  <a href="#"></a>
                </div>
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
              </div>
            </section>
            {/*<!-- Изображение выбранного товара -->*/}
            <div className="main-screen__favourite-product-pic">
              <a href="#"><img src={images[0]} alt=""/></a>
              <a href="#" class="main-screen__favourite-product-pic__zoom"></a>
            </div>
            {/*<!-- Блок информации о товаре -->*/}
            <div className="main-screen__product-info">
              <div className="product-info-title"><h2>{title}</h2>
                <div className="in-stock">В наличии</div>
              </div>
              <div className="product-features">
                <table className="features-table">
                  <tr>
                    <td className="left-col">Артикул:</td>
                    <td className="right-col">{sku}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Производитель:</td>
                    <td className="right-col"><a href="#"><span class="producer">{brand}</span></a></td>
                  </tr>
                  <tr>
                    <td className="left-col">Цвет:</td>
                    <td className="right-col">{color}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Материалы:</td>
                    <td className="right-col">{material}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Сезон:</td>
                    <td className="right-col">{season}</td>
                  </tr>
                  <tr>
                    <td className="left-col">Повод:</td>
                    <td className="right-col">{reason}</td>
                  </tr>
                </table>
              </div>
              <p className="size">Размер</p>
              <ul className="sizes">
                {sizes.map(sizeItem => {
                  return (
                    <li><a href="#">{sizeItem.size}</a></li>
                  )
                })}
                <li className="active"><a href="#">37</a></li>
              </ul>
              <div className="size-wrapper">
                <a href="#"><span class="size-rule"></span><p class="size-table">Таблица размеров</p></a>
              </div>
              <a href="#" className="in-favourites-wrapper">
                <div className="favourite" href="#"></div>
                <p className="in-favourites">В избранное</p>
              </a>
              <div className="basket-item__quantity">
                <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                1
                <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
              </div>
              <div className="price">{price} ₽</div>
              <button className="in-basket in-basket-click">В корзину</button>
            </div>

          </section>
        </section>
      </main>
      {/*<!-- Слайдеры внизу карточки  -->*/}
      {/*<!-- Слайдер "Вы смотрели" -->*/}
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
          <div className="overlooked-slider__item overlooked-slider__item-1">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-2">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-3">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-4">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__item overlooked-slider__item-5">
            <a href="product-card-desktop.html"></a>
          </div>
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
        </div>
      </section>
      {/*<!-- Слайдер "Похожие товары" -->*/}
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>
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
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div>
        </div>
      </section>
    </>
  )

};

export default Product;

