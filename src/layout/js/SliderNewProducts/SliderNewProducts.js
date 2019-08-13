import React from "react";
import PropTypes from "prop-types"
import SliderNewProductActive, {SliderNewProductActiveInfo} from "../SliderNewProductActive/SliderNewProductActive";
import SliderNewProduct from "../SliderNewProduct/SliderNewProduct";

export default class SliderNewProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
    }
  }

  getActive = () => {
    return this.props.products[this.getIndex(1)];
  };

  getFirts = () => {
    return this.props.products[this.state.startIndex];
  };

  getLast = () => {
    return this.props.products[this.getIndex(2)];
  };

  getIndex = (iterator) => {
    if ((this.state.startIndex + parseInt(iterator)) >= this.props.products.length) {
      return this.state.startIndex + iterator - this.props.products.length;
    }
    return this.state.startIndex + iterator;
  };

  handlerLeft = () => {
    if (this.state.startIndex - 1 < 0) {
      this.setState({startIndex: this.props.products.length - 1});
      return;
    }
    this.setState({startIndex: this.state.startIndex - 1})
  };

  handlerRight = () => {
    if (this.state.startIndex + 1 >= this.props.products.length) {
      this.setState({startIndex: 0});
      return;
    }
    this.setState({startIndex: this.state.startIndex + 1})
  };

  render() {
    if ((!this.props.products) || (this.props.products.length === 0)) {
      return (<></>)
    }
    return (
      <>
        <div className="new-deals__slider">
          <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={this.handlerLeft}/>

          <SliderNewProduct product={this.getFirts()} position="first"/>
          <SliderNewProductActive product={this.getActive()}
                                  onFavoriteClick={this.props.onFavoriteClick}
                                  isFavorite={this.props.isFavorite}/>
          <SliderNewProduct product={this.getLast()} position="last"/>

          <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={this.handlerRight}/>
        </div>

        <SliderNewProductActiveInfo product={this.getActive()}/>
      </>
    )
  }
}

SliderNewProducts.propTypes = {
  products: PropTypes.array,
  onFavoriteClick: PropTypes.func,
  isFavorite: PropTypes.func,
};
