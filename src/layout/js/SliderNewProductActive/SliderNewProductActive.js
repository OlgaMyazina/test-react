import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import imgFavorite from '../../img/new-deals__product_favorite.png';
import imgFavoriteChoosen from '../../img/new-deals__product_favorite_chosen.png';

const SliderNewProductActive = (props) => {
  const [isChoosen, setChoosen] = useState(props.isFavorite(props.product.id));

  if (!props.product) {
    return (<></>)
  }

  const style = {
    backgroundImage: `url(${imgFavoriteChoosen})`,
    backgroundRepeat: "no-repeat",
    position: "absolute",
    right: "14px",
    top: "14px",
    height: "29px",
    width: "29px",
  };

  const blankStyle = {
    position: "absolute",
    right: "14px",
    top: "14px",
    height: "29px",
    width: "29px",
    backgroundImage: `url(${imgFavorite})`,
    backgroundRepeat: "no-repeat",
  };

  const handlerFavoriteStyle = () => {

    if (!props.product) {
      return blankStyle;
    }

    return props.isFavorite(props.product.id) ? style : blankStyle;
  };

  const handleFavoriteClick = (event) => {
    props.onFavoriteClick(props.product, event);
    setChoosen(!isChoosen);
  };


  return (
    <>
      <div className="new-deals__product new-deals__product_active"
           style={{
             backgroundImage: `url(${props.product.images[0]})`,
             backgroundSize: "contain"
           }}>
        <Link to={`product/${props.product.id}`}/>
        <div className="new-deals__product_favorite"
             style={handlerFavoriteStyle()}
             onClick={handleFavoriteClick}
        />
      </div>

    </>
  )
};

export const SliderNewProductActiveInfo = (props) => {
  if (!props.product) {
    return (<></>)
  }
  return (
    <>
      <div className="new-deals__product-info">
        <Link to={`products/${props.product.id}`} className="h3">{props.product.title}</Link>
        <p>Производитель:
          <span>{props.product.brand}</span>
        </p>
        <h3 className="h3">{props.product.price} ₽</h3>
      </div>
    </>
  )
};

SliderNewProductActive.propTypes = {
  product: PropTypes.object,
  isFavorite: PropTypes.func,
  onFavoriteClick: PropTypes.func,
};

SliderNewProductActiveInfo.propTypes = {
  product: PropTypes.object
};

export default SliderNewProductActive;
