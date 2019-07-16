import React from "react";

const Preloader = ({isHidden}) => {
  const containerClassName = `preloader_wrapper ${isHidden ? "hidden" : ""}`
  return (
    <div className={containerClassName}>
      <div className="preloader">
        <hr/>
        <hr/>
        <hr/>
        <hr/>
      </div>
    </div>
  )
};

export default Preloader;
