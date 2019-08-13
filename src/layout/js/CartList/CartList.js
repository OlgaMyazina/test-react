import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


export default class CartList extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    if (!this.props.products) return;
    if (this.props.products.length === 0) return;
    this.props.products.map(product => {
      this.getProduct(product.id);
    });
  }


  deepEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((!this.props.products)||(this.props.products.length === 0)) {
      return;
    }

    this.props.products.map(product => {
      if (this.state && (!this.state[product.id])) {
        this.getProduct(product.id);
      }
    });

    if ((prevProps.products.length === this.props.products.length) && this.deepEqual(prevState, this.state)) {
      return;
    }

    if (prevProps.products.length !== this.props.products.length) {
      this.props.products.map(product => {
        this.getProduct(product.id);
      });
    }
  }

  removeInfoProduct(id) {
    const newState = Object.assign(this.state);
    delete newState[id];
    this.setState({...newState});
  }

  getMetod(url, columnName) {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    return fetch(url, params)
      .then(response => response.json())
      .then(result => this.setState({[columnName]: result.data}));
  }

  getProduct = (id) => {
    const url = `https://api-neto.herokuapp.com/bosa-noga/products/${id}`;
    this.getMetod(url, id);
  };

  render() {
    if (!this.props.products){
      return (
        <div className="basket-dropped__title">
          В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!
        </div>);
    }
    if (this.props.products.length === 0) {
      return (
        <div className="basket-dropped__title">
          В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!
        </div>);
    }
    return (
      <>
        <div className="basket-dropped__title">В вашей корзине:</div>
        <div className="basket-dropped__product-list product-list">
          {this.props.products.map(product => {
            if (!this.state) return (<React.Fragment key={`${product.id}-${product.size}`}></React.Fragment>);
            if (!this.state[product.id]) {
              return (<React.Fragment key={`${product.id}-${product.size}`}></React.Fragment>);
            }
            return (
              <div className="product-list__item" key={`${product.id}-${product.size}`}>
                <Link to={{pathname: `/product/${product.id}`}} className="product-list__pic">
                  <img src={this.state[product.id] ? this.state[product.id].images[0] : "#"}
                       alt="product"
                       style={{width: "36px", height: "29px"}}/>
                </Link>
                <Link to={{pathname: `/product/${product.id}`}}
                      className="product-list__product">
                  {this.state[product.id].title} {`(размер: ${product.size})`} {product.amount > 1 ? `, ${product.amount} шт` : ""}
                </Link>
                <div className="product-list__fill"/>
                <div className="product-list__price">{this.state[product.id].price}
                  <i className="fa fa-rub" aria-hidden="true"/>
                </div>
                <div className="product-list__delete"
                     onClick={() => {
                       this.removeInfoProduct(product.id);
                       this.props.onRemoveFromCart(product.id, product.size, 0);
                     }}>
                  <i className="fa fa-times" aria-hidden="true"/>
                </div>
              </div>
            )
          })}

        </div>
        <Link className="basket-dropped__order-button" to="/order">
          Оформить заказ
        </Link>
      </>
    )
  }
};

CartList.propTypes = {
  onRemoveFromCart: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object
};
