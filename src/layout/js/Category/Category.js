import React from "react";
import {Link} from "react-router-dom";

import urlToFilters from "../filters/urlToFilters";

export default class Category extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (!this.props.category.data) {
      return (<div> Loading category... </div>)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }


  isCategoryActive = (itemName, itemId) => {
    const filter = urlToFilters(this.props.location.search);

    if (this.props.location.pathname === '/catalog') {
      if (!filter.categoryId) {
        return itemName === "Бренды" ? "main-menu__item_active" : "";
      }
      console.log('category isActive', filter.categoryId);
      return parseInt(filter.categoryId) === parseInt(itemId) ? "main-menu__item_active" : "";
    }

    if (this.props.location.pathname === '/catalog/featured') {
      return itemName === "Новинки" ? "main-menu__item_active" : "";
    }

    if (this.props.location.pathname === '/') {
      return itemName === "Акции" ? "main-menu__item_active" : "";
    }
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <ul className="main-menu__items">
            <li className={`main-menu__item main-menu__item_sales ${this.isCategoryActive("Акции")}`}>
              <Link to={process.env.PUBLIC_URL + "/"} data-category-id="">Акции</Link>
            </li>
            {console.log(`render category`, this.props)}
            {(this.props.category.data) && (this.props.category.data.map(dataItem => {
              console.log(`category id `, dataItem.id);
              return (
                <li
                  className={`main-menu__item main-menu__item_women ${this.isCategoryActive(dataItem.title, dataItem.id)}`}
                  key={dataItem.id}>
                  <a href="" data-category-id={dataItem.id} onClick={this.props.onClick}>{dataItem.title}</a>
                </li>
              )
            }))
            }

            <li className={`main-menu__item main-menu__item_brands ${this.isCategoryActive("Бренды")}`}>
              <Link to={process.env.PUBLIC_URL + "/catalog"} data-category-id="">Бренды</Link>
            </li>

            <li className={`main-menu__item main-menu__item_new ${this.isCategoryActive("Новинки")}`}>
              <Link to={process.env.PUBLIC_URL + "/catalog/featured"} data-category-id="">Новинки</Link>
            </li>
          </ul>
        </div>
      </>
    )
  }
};
