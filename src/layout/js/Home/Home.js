import React from "react";

import Slider from "../Slider/Slider";
import NewProducts from "../NewProducts/NewProducts";
import SalesAndNews from "../SalesAndNews/SalesAndNews";
import About from "../About/About";

const Home = (props) => {
  return (
    <>
      <Slider/>

      <NewProducts {...props}/>

      <SalesAndNews/>

      <About/>
    </>
  )
};

export default Home;
