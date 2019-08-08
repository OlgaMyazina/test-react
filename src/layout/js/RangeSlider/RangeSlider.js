import React, {useState} from "react";
import PropTypes from 'prop-types';

const RangeSlider = ({minPx, maxPx, minValuePx, maxValuePx, handlerMinValue, handlerMaxValue}) => {
  const [mouseDownCircle1, setMouseDownCircle1] = useState(""),
    [mouseCircle1Position, setMouseCircle1Position] = useState(""),
    [minValuePxWhenMouseDown, setMinValuePxWhenMouseDown] = useState(""),
    [mouseDownCircle2, setMouseDownCircle2] = useState(""),
    [mouseCircle2Position, setMouseCircle2Position] = useState(""),
    [maxValuePxWhenMouseDown, setMaxValuePxWhenMouseDown] = useState("");

  const handlerMouseDown = (event) => {
    if (event.target.className === "circle-1") {
      setMouseDownCircle1(true);
      setMouseCircle1Position(event.screenX);
      setMinValuePxWhenMouseDown(minValuePx);
    }
    if (event.target.className === "circle-2") {
      setMouseDownCircle2(true);
      setMouseCircle2Position(event.screenX);
      setMaxValuePxWhenMouseDown(maxValuePx);
    }
  };

  const handlerMouseMove = (event) => {
    if (mouseDownCircle1) {
      const diff = event.screenX - mouseCircle1Position;
      const newMinValuePx = minValuePxWhenMouseDown + diff;
      if (newMinValuePx <= minPx) {
        handlerMinValue(minPx);
        return;
      }
      if (newMinValuePx >= maxValuePx) {
        handlerMinValue(maxValuePx);
        return;
      }
      handlerMinValue(newMinValuePx);
    }

    if (mouseDownCircle2) {
      const diff = event.screenX - mouseCircle2Position;
      const newMaxValuePx = maxValuePxWhenMouseDown + diff;
      if (newMaxValuePx >= maxPx) {
        handlerMaxValue(maxPx);
        return;
      }
      if (newMaxValuePx <= minValuePx) {
        handlerMaxValue(minValuePx);
        return;
      }
      handlerMaxValue(newMaxValuePx);
    }


  };

  const handlerMouseUp = () => {
    if (mouseDownCircle1) {
      setMouseDownCircle1(false);
    }

    if (mouseDownCircle2) {
      setMouseDownCircle2(false);
    }
  };

  return (

    <div className="circle-container"
         onMouseDown={handlerMouseDown}
         onMouseMove={handlerMouseMove}
         onMouseUp={handlerMouseUp}>
      <div className="circle-1"
           style={{left: minValuePx}}/>
      <div className="line-white"/>
      <div className="line-colored"
           style={{
             left: minValuePx,
             width: maxValuePx - minValuePx
           }}/>
      <div className="circle-2"
           style={{left: maxValuePx}}/>
    </div>

  )
};

export default RangeSlider;

RangeSlider.propTypes = {
  minPx: PropTypes.number,
  maxPx: PropTypes.number,
  minValuePx: PropTypes.number,
  maxValuePx: PropTypes.number,
  handlerMinValue: PropTypes.func,
  handlerMaxValue: PropTypes.func,
};
