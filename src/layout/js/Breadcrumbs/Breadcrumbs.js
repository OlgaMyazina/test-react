import React from "react";
import {Link} from "react-router-dom";

const Breadcrumbs = ({match, ...rest}) => {
  console.log(`props BreadCrums`,match, rest);
  return (
    <div className="site-path">
      <ul className="site-path__items">
        <li className="site-path__item"><Link to="/">Главная</Link></li>
        <li className="site-path__item"><a href="#">{rest.item}</a></li>
      </ul>
    </div>
  )
};

export default Breadcrumbs;