import React from "react";
import {Link} from "react-router-dom";

/*Пагинация позволяет листать страницы каталога.
Если на данный момент пользователь находится на первой странице каталога,
то стрелочка «Назад» не должна отображаться.
Аналогично, если пользователь находится на последней странице каталога, не должна отображаться стрелочка «Вперёд».

Cкрыть / показать стрелочки можно, добавляя и убирая класс hidden.
При перелистывании страницы, браузер должен показывать самый верх новой страницы.

* */

const Pagination = ({page, pages, onChange}) => {
  const pageArray = [];
  for (let i = 0; i < pages; i++) {
    pageArray.push(i);
  }
  ;

  //this.props.history.push(`/catalog/${page}`);

  return (
    <div className="page-nav-wrapper" onClick={onChange}>
      <div className={`angle-back ${page == 1 ? "hidden" : ""}`}>
        <a href="#" name="back"></a>
        {/*<Link to={{pathname: `/catalog/${urlPath}`, search: `?page=${page - 1}`}}/>*/}
      </div>
      <ul>
        {console.log(pageArray)}
        {pageArray.map((value, index) => {
          return (
            <li className={index + 1 == page ? "active" : ""} key={index}>
              <a href="#" name={index+1}>
              {/*<Link to={{pathname: `/catalog/${urlPath}`, search: `?page=${index + 1}`}}>{index + 1}</Link>*/}
              {index+1}
              </a>
            </li>
          )
        })}

      </ul>
      <div className={`angle-forward ${page == pages ? "hidden" : ""}`}>
        <a href="#" name="forward"></a>
        {/*<Link to={{pathname:`/catalog/${urlPath}`, search:`?page=${page + 1}`}}/>*/}
      </div>
    </div>

  )
};

export default Pagination;