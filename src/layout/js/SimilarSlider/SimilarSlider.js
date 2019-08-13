import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

/*Блок «Похожие товары», где выводятся товары,
чей Тип и Цвет совпадают с Типом и Цветом текущего товара.
 Если похожих товаров нет, то блок не отображается.
 Если товаров 3 или меньше, то стрелочки «Назад» и «Вперёд» не отображаются.
* */

export default class SimilarSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      products: [],
    }
  }

  getProducts = () => {
    const params = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
    const urlType = `https://api-neto.herokuapp.com/bosa-noga/products?type=${this.props.productType}`;
    return fetch(urlType, params)
      .then(response => response.json())
      .then(result => {
        const products = this.state.products.concat(result.data);
        //products.push(result.data);
        return this.setState({products: products})
      });

    const urlColor = `https://api-neto.herokuapp.com/bosa-noga/products?type=${this.props.productColor}`;
    return fetch(urlColor, params)
      .then(response => response.json())
      .then(result => {
        const products = this.state.products.concat(result.data);
        products.push(result.data);
        return this.setState({products: products})
      });
  };

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((prevProps.productType !== this.props.productType) || (prevProps.productColor !== this.props.productColor)) {
      this.getProducts();
    }
  }

  isVisibleArrowLeft = () => {
    if (!this.state.products) {
      return true;
    }

    const count = this.state.products ? this.state.products.length : 0;

    let hidden = (count) <= 3;
    if (!hidden) {
      hidden = this.state.startIndex === 0
    }
    return hidden
  };

  isVisibleArrowRight = () => {
    if (!this.state.products) {
      return true;
    }
    const count = this.state.products ? this.state.products.length : 0;

    let hidden = (count) <= 3;
    if (!hidden) {
      hidden = (count - this.state.startIndex) <= 3;
    }
    return hidden
  };

  handlerArrowLeft = () => {
    if (this.state.startIndex >= 1) {
      this.setState({startIndex: this.state.startIndex - 1});
    }
  };

  handleArrowRight = () => {
    const count = this.state.products ? this.state.products.length : 0;

    if (this.state.startIndex <= count - 4) {
      this.setState({startIndex: this.state.startIndex + 1});
    }
  };


  render() {
    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>

        <div className="similar-products-slider">
          <div
            className={`similar-products-slider__arrow similar-products-slider__arrow_left arrow ${this.isVisibleArrowLeft() ? "hidden" : ""}`}
            onClick={this.handlerArrowLeft}/>

          {
            this.state.products.map((product, index) => {
              if ((index < this.state.startIndex) || (index > this.state.startIndex + 2)) {
                return (<React.Fragment key={product.id}/>)
              }
              return (
                <div className="similar-products-slider__item-list__item-card item" key={product.id}>
                  <div className="similar-products-slider__item">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        className={`similar-products-slider__item-pic-${index - this.state.startIndex + 1}`}
                        alt="Ботинки женские"
                        style={{width: "90%", height: "90%"}}
                      />
                    </Link>
                  </div>
                  <div className="similar-products-slider__item-desc">
                    <h4 className="similar-products-slider__item-name">{product.title}</h4>
                    <p className="similar-products-slider__item-producer">Производитель: <span
                      className="producer">{product.brand}</span></p>
                    <p className="similar-products-slider__item-price">{product.price}</p>
                  </div>
                </div>

              )
            })
          }

          <div
            className={`similar-products-slider__arrow similar-products-slider__arrow_right arrow${this.isVisibleArrowRight() ? "hidden" : ""}`}
            onClick={this.handleArrowRight}/>
        </div>
      </section>
    )
  }
}

SimilarSlider.propTypes = {
  productType: PropTypes.string,
  productColor: PropTypes.string,
};
