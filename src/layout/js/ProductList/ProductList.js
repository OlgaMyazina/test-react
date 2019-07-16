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
  const {products, ...rest} = props;
  if (!products) return (<></>);
  return (
    <>
      <section className="product-catalogue__item-list">

        {products.data.map((product, index) => {
          return (
            <Link to={`product/${product.id}`} className="item-list__item-card item" key={product.id}>
              <div className="item-pic">
                <img className={`item-pic-${index + 1}`} src={product.images[0]} alt={product.title}
                     style={styleComponent}/>
                <div className="product-catalogue__product_favorite">
                  <p></p>
                </div>
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
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


      </section>
    </>
  )
};

export default ProductList;