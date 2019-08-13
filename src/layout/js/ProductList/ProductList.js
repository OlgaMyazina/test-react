import React from "react";
import {Link} from "react-router-dom";

const styleComponent = {
  height: '100%',
  width: '100%',
};

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.products.map(product => this.getProduct(product.id))
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.products !== this.props.products) {
      this.props.products.map(product => this.getProduct(product.id))
    }
  }

  handlerFavoriteClick = (product, event) => {
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
      returnObj.products.splice(existElement, 1);
      localStorage.setItem("products", JSON.stringify(returnObj));
    }
  };

  getProduct = (id) => {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    const url = `https://api-neto.herokuapp.com/bosa-noga/products/${id}`;
    return fetch(url, params)
      .then(response => response.json())
      .then(result => {
        return this.setState({[id]: result.data.sizes.map(elem => elem.available ? elem.size : "").join(", ")})
      });
  };

  render() {


    if (!this.props.products) return (<></>);
    return (
      <>

        {this.props.products.map((product, index) => {
          return (
            <Link to={`/product/${product.id}`} className="item-list__item-card item" key={product.id}>
              <div className="item-pic">
                <img className={`item-pic-${index + 1}`}
                     src={product.images[0]}
                     alt={product.title}
                     style={styleComponent}/>
                <div className="product-catalogue__product_favorite"
                     onClick={(event) => this.handlerFavoriteClick(product, event)}>
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
                  <p className="sizes__avalible">
                    {this.state ? this.state[product.id] : "нет данных"}</p>
                </div>
              </div>
            </Link>
          )
        })}

      </>
    )
  }
}
;
