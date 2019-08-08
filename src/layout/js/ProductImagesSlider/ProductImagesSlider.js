import React, {useState} from "react";

const ProductImagesSlider = ({images, onClick}) => {
  const [startIndex, setStartIndex] = useState(0);

  const isVisible = () => {
    if (!images) return "";
    if (images.length <= 1) {
      return "hidden";
    }
    return ""
  };

  const isVisibleArrow = () => {
    if (!images) return "";

    if (images.length <= 3) {
      return "hidden";
    }
    return "";
  };

  const handlerArrowUp = () => {
    if (startIndex === images.length - 4) {
      return;
    }
    setStartIndex(startIndex + 1);
  };

  const handlerArrowDown = () => {
    if (startIndex === 0) {
      return;
    }
    setStartIndex(startIndex - 1);
  }

  return (
    <>
      <section className={`main-screen__favourite-product-slider ${isVisible()}`}>
        <div className="favourite-product-slider">
          <div key="productSliderUp"
            className={`favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up ${isVisibleArrow()}`}
            onClick={handlerArrowUp}
          />
          {images && images.map((image, index, images) => {
            if (index < startIndex) return (<></>);
            if (index > startIndex + 3) return (<></>);
            return (
              <div key={image}
                   className={`favourite-product-slider__item favourite-product-slider__item-${startIndex - index + 1}`}>
                <a href="#" onClick={onClick}>
                  <img src={images[index]}
                       alt=""
                       style={{width: "100%", height: "100%"}}/>
                </a>
              </div>
            )
          })}
          <div key="productSliderDown"
            className={`favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down ${isVisibleArrow()}`}
            onClick={handlerArrowDown}/>
        </div>
      </section>
    </>
  )
};

export default ProductImagesSlider;