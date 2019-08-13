import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const SliderNewProduct = (props) => {
  if (!props.product) {
    return (<></>)
  }
  return (
    <div className={`new-deals__product new-deals__product_${props.position}`}
         style={{
           backgroundImage: `url(${props.product.images[0]})`,
           backgroundSize: "contain"
         }}>
      <Link to={`product/${props.product.id}`}></Link>
    </div>
  )
};

SliderNewProduct.propType = {
  product: PropTypes.object,
  position: PropTypes.string,
};

export default SliderNewProduct;
