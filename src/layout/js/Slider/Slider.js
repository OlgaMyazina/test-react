import React from "react";

import slider from "../../img/slider.jpg";
import slider180 from "../../img/slider180deg.jpeg";

const Slider = () => {
  return (
    <section className="slider">
      <div className="wrapper">
        <div className="slider__pictures">
          <a className="slider__image" href="#">
            <img src={slider} alt="slide picture"/>
          </a>
          <a className="slider__image" href="#">
            <img src={slider180} alt="slide picture"/>
          </a>
          <a className="slider__image" href="#">
            <img src={slider} alt="slide picture"/>
          </a>
          <a className="slider__image" href="#">
            <img src={slider180} alt="slide picture"/>
          </a>
          <div className="arrow slider__arrow slider__arrow_left"></div>
          <div className="arrow slider__arrow slider__arrow_right"></div>
          <div className="slider__circles">
            <button className="slider__circle" value="0"></button>
            <button className="slider__circle" value="1"></button>
            <button className="slider__circle" value="2"></button>
            <button className="slider__circle" value="3"></button>
          </div>
          <h2 className="h2">К весне готовы!</h2>
        </div>
      </div>
    </section>
  )
};

//Слайдер
//todo: переписать на реакт кусок:
/*
window.requestAnimationFrame = (function () { // для поддержки requestAnimationFrame всеми браузерами
  return window.requestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

function slider(f, img, button, V, Vo, arrows) {
  var iii = 0,
    start = null,
    clear = 0;

  function step(time) {
    if (start === null) start = time;
    var progress = time - start;
    if (progress > V) {
      start = null;
      for (var i = 0; i < img.length; i++) {
        img[i].style.zIndex = "0";
        button[i].style.opacity = "0.5";
      }
      img[iii].style.zIndex = "1";
      iii = ((iii != (img.length - 1)) ? (iii + 1) : 0);
      img[iii].style.zIndex = "2";
      img[iii].style.opacity = "0";
      button[iii].style.opacity = "1";
    } else if (img[iii].style.opacity != "") {
      img[iii].style.opacity = ((progress / Vo < 1) ? (progress / Vo) : 1);
    }
    if (clear != "0" && progress > Vo) {
    } else {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
  f.onmouseenter = function () {
    if (clear == "0") clear = "1";
  };
  // при наведении на слайдер
  f.onmouseleave = function () {
    if (clear == "1") {
      clear = "0";
      requestAnimationFrame(step);
    }
  };
  // курсор убран со слайдера
  for (var j = 0; j < button.length; j++) { // при нажатии кнопок
    button[j].onclick = function () {
      for (var i = 0; i < img.length; i++) {
        img[i].style.zIndex = "0";
        button[i].style.opacity = "0.5";
      }
      iii = +this.value;
      img[this.value].style.zIndex = "2";
      button[this.value].style.opacity = "1";
    };
    arrows[0].onclick = function () {
      img[iii].style.zIndex = "0";
      button[iii].style.opacity = "0.5";
      iii--;
      iii = ((iii < 0) ? img.length - 1 : iii);
      img[iii].style.zIndex = "2";
      button[iii].style.opacity = "1";
    };
    arrows[1].onclick = function () {
      img[iii].style.zIndex = "0";
      button[iii].style.opacity = "0.5";
      iii++;
      iii = ((iii === img.length) ? 0 : iii);
      img[iii].style.zIndex = "2";
      button[iii].style.opacity = "1";
    }
  }
}

var f = document.querySelector('.slider__pictures'),
  a = f.getElementsByClassName('slider__image'),
  button = f.getElementsByClassName('slider__circles')[0].getElementsByClassName('slider__circle'),
  arrows = f.getElementsByClassName('slider__arrow');
slider(f, a, button, '4000', '1000', arrows);
*/

export default Slider;
