import React from "react";
import {Link, Switch, Route, StyledLink} from "react-router-dom";

import Catalog from "../Catalog/Catalog";

const SubCategory = (props) => {

  const {filters, categoryName, categoryId, onClick, ...rest} = props;

  if (!filters.data) {
    return (<div> Loading filters... </div>)
  }

  //ограничение по брендам
  let countRow = 7;

  const isVisibleBrand = (item) => {
    if (countRow === 0) return countRow;
    const stringItem = item.split(' ');
    countRow -= stringItem.length;
    if (countRow < 0) countRow = 0;
    return countRow;
  };

  const getCategory = () => {
    console.log(`subCategory`, categoryId);
    return categoryId ? `categoryId=${categoryId}&` : "";
  };

  return (
    <>
      <div className="wrapper" onClick={onClick}>
        <div className="dropped-menu__lists dropped-menu__lists_women">
          <h3 className="dropped-menu__list-title">Повод:</h3>
          <ul className="dropped-menu__list">
            {
              filters.data.reason.map(reasonItem => {
                return (
                  <li className="dropped-menu__item" key={reasonItem}>
                    <Link
                      to={{pathname: '/catalog', search: `?${getCategory()}reason=${reasonItem}`}}>{reasonItem}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
          <h3 className="dropped-menu__list-title">Категории:</h3>
          <ul className="dropped-menu__list">
            {
              filters.data.type.map(typeItem => {
                return (
                  <li className="dropped-menu__item" key={typeItem}>
                    <Link to={{pathname: '/catalog', search: `?${getCategory()}type=${typeItem}`}}>{typeItem}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="dropped-menu__lists">
          <h3 className="dropped-menu__list-title">Сезон:</h3>
          <ul className="dropped-menu__list">
            {
              filters.data.season.map(seasonItem => {
                return (
                  <li className="dropped-menu__item" key={seasonItem}>
                    <Link
                      to={{pathname: '/catalog', search: `?${getCategory()}season=${seasonItem}`}}>{seasonItem}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="dropped-menu__lists">
          <h3 className="dropped-menu__list-title">Бренды:</h3>
          <ul className="dropped-menu__list">
            {
              filters.data.brand.map(brandItem => {
                const rowCount = isVisibleBrand(brandItem);
                if (rowCount === 0)
                  return;
                return (
                  <li className="dropped-menu__item" key={brandItem}>
                    <Link
                      to={{pathname: '/catalog', search: `?${getCategory()}brand=${brandItem}`}}>
                      {brandItem}
                    </Link>
                  </li>
                )
              })
            }
            <li className="dropped-menu__item" key="all">
              <Link
                to='/catalog'>
                Все
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
};

export default SubCategory;
