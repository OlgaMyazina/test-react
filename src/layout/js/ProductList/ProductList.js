import React from "react";
import {Link} from "react-router-dom";

/*
* brand: "Christian Louboutin"
categoryId: 13
id: 33
images: ["https://api-neto.herokuapp.com/bosa-noga/tufli_labuten_1.jpg"]
price: 56000
title: "Знаменитые лабутэны"
*/

const styleComponent = {
  height: '100%',
  width: '100%',
};

const ProductList = (props) => {

  const handlerFavoriteClick = (product, event) => {
    event.preventDefault();
    //получаем значения из хранилица
    const returnObj = JSON.parse(localStorage.getItem("products"));
    if (!returnObj) {
      const productsList = {
        products: []
      };
      productsList.products.push(product);
      localStorage.setItem("products", JSON.stringify(productsList));
      return;
    }
    const existElement = returnObj.products.findIndex(element => {
      return element.id === product.id;
    });
    if (existElement === -1) {
      returnObj.products.push(product);
      localStorage.setItem("products", JSON.stringify(returnObj));
    } else {
      localStorage.removeItem("products");
      console.log(`returnObj`, returnObj);
      returnObj.products.splice(existElement, 1);
      localStorage.setItem("products", JSON.stringify(returnObj));
    }
  };


  const {products, ...rest} = props;
  console.log('productList', products, rest);
  if (!products) return (<></>);
  return (
    <>

      {products.map((product, index) => {
        return (
          <Link to={`product/${product.id}`} className="item-list__item-card item" key={product.id}>
            <div className="item-pic">
              <img className={`item-pic-${index + 1}`}
                   src={product.images[0]}
                   alt={product.title}
                   style={styleComponent}/>
              <div className="product-catalogue__product_favorite"
                   onClick={(event) => handlerFavoriteClick(product, event)}>
                <p/>
              </div>
              <div className="arrow arrow_left"/>
              <div className="arrow arrow_right"/>
            </div>
            <div className="item-desc">
              <h4 className="item-name">{product.title}</h4>
              <p className="item-producer">Производитель: <span className="producer">{product.brand}</span></p>
              <p className="item-price">{product.price}</p>
              <div className="sizes">
                <p className="sizes__title">Размеры в наличии:</p>
                <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
              </div>
            </div>
          </Link>
        )
      })}

    </>
  )
};

export default ProductList;