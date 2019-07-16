import React from "react";

import Slider from "../Slider/Slider";
import NewProducts from "../NewProducts/NewPropducts";
import SalesAndNews from "../SalesAndNews/SalesAndNews";
import About from "../About/About";

const Home = () => {
  return (
    <>
      <Slider/>

      <NewProducts/>

      <SalesAndNews/>

      <About/>
    </>
  )
};

export default Home;
