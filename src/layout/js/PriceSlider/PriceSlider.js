import React from "react";
import PropTypes from 'prop-types';
import RangeSlider from "../RangeSlider/RangeSlider";

export default class PriceSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthSlider: 216,
    };

  }

  getCoef = () => {
    return (this.props.maxRub - this.props.minRub) / this.state.widthSlider;
  };


  rubToPixel = (rubValue) => {
    return rubValue / this.getCoef();
  };

  pixelToRub = (pixelValue) => {
    return pixelValue * this.getCoef();
  };

  handlerMinValueSlider = (valueMinPx) => {
    const minValueRub = this.pixelToRub(valueMinPx);
    this.props.handlerMinPrice(minValueRub);
  };

  handlerMaxValueSlider = (valueMaxPx) => {
    const maxValueRub = this.pixelToRub(valueMaxPx);
    this.props.handlerMaxPrice(maxValueRub);
  };

  render() {
    return (
      <div className="price-slider">
        <RangeSlider minPx={this.rubToPixel(this.props.minRub)}
                     maxPx={this.rubToPixel(this.props.maxRub)}
                     minValuePx={this.rubToPixel(this.props.minValueRub)}
                     maxValuePx={this.rubToPixel(this.props.maxValueRub)}
                     handlerMinValue={this.handlerMinValueSlider}
                     handlerMaxValue={this.handlerMaxValueSlider}/>
        <div className="counter">
          <input type="text"
                 className="input-1"
                 value={parseInt(this.props.minValueRub)}
                 onChange={(event) => {
                   this.props.handlerMinPrice(event.target.value)
                 }}/>
          <div className="input-separator"/>
          <input type="text"
                 className="input-2"
                 value={parseInt(this.props.maxValueRub)}
                 onChange={(event) => {
                   this.props.handlerMaxPrice(event.target.value)
                 }}/>
        </div>
      </div>
    )
  }
};

PriceSlider.propTypes = {
  minRub: PropTypes.number,
  maxRub: PropTypes.number,
  minValueRub: PropTypes.number,
  maxValueRub: PropTypes.number,
  handlerMinPrice: PropTypes.func,
  handlerMaxPrice: PropTypes.func,
};
