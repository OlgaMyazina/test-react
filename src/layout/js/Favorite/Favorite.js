import React, {useState} from "react";

import Pagination from "../Pagination/Pagination";
import ProductList from "../ProductList/ProductList";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const Favorite = (props) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const [sortFavoriteProduct, setSortFavoriteProduct] = useState("popular");
  const isEmpty = () => {
    if (!products)
      return true;
    return products.products.length > 0 ? false : true;
  };

  const handleSort = (event) => {
    if (event.target.value === "price") {
      setSortFavoriteProduct("price");
    }
    if (event.target.value === "popular") {

      setSortFavoriteProduct("popular");
    }
  };

  const sortAsc = () => {
    return products.products.sort((elem1, elem2) => {
      if (elem1.price < elem2.price) {
        return -1;
      }
      if (elem1.price > elem2.price) {
        return 1;
      }
      if (elem1.price === elem2.price) {
        return 0
      }
    });
  };

  const sortDesc = () => {
    return products.products.sort((elem1, elem2) => {
      if (elem1.price > elem2.price) {
        return -1;
      }
      if (elem1.price < elem2.price) {
        return 1;
      }
      if (elem1.price === elem2.price) {
        return 0
      }
    });
  };


  return (
    <>
      <div className="wrapper wrapper_favorite">
        <div className="site-path">
          {/*todo: breadcrumbs*/}
          <Breadcrumbs {...props}/>
        </div>
        <main className="product-catalogue product-catalogue_favorite">
          <section className="product-catalogue__head product-catalogue__head_favorite">
            <div className="product-catalogue__section-title">
              <h2 className="section-name">{isEmpty() ? "В вашем избранном пока ничего нет" : "В вашем избранном"}</h2>
              <span
                className={`${isEmpty() ? "hidden" : ""} amount amount_favorite`}> {`${products ? products.products.length : 0} товаров`}</span>
            </div>
            <div className={`${isEmpty() ? "hidden" : ""} product-catalogue__sort-by`}>
              <p className="sort-by">Сортировать</p>
              <select id="sorting" name="" value={sortFavoriteProduct} onChange={handleSort}>
                <option value="price">по цене</option>
                <option value="popular">по популярности</option>
              </select>
            </div>
          </section>
          <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
            {!isEmpty() && <ProductList products={sortFavoriteProduct === "popular" ? sortDesc() : sortAsc()}/>}
          </section>
          <div
            className={`${products ? (products.products.length > 16 ? "" : "hidden") : "hidden"} product-catalogue__pagination`}>
            <Pagination/>
          </div>
        </main>
      </div>
    </>
  );
};

export default Favorite;