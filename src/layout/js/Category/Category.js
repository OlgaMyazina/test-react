import React from "react";

const Category = (props) => {
  if (!props.category.data) {
    return (<div> Loading category... </div>)
  }

  return (
    <>
      <div className="wrapper">
        <ul className="main-menu__items" onClick={props.onClick}>
          <li className={`main-menu__item main-menu__item_sales ${props.isMenuItemActive("Акции")}`}>
            <a href="#" data-category-id="">Акции</a>
          </li>
          {
            props.category.data.map(dataItem => {
              return (
                <li className={`main-menu__item main-menu__item_women ${props.isMenuItemActive(`${dataItem.title}`)}`}
                    key={dataItem.id}>
                  <a href="#" data-category-id={dataItem.id}>{dataItem.title}</a>
                </li>
              )
            })
          }

          <li className={`main-menu__item main-menu__item_brands ${props.isMenuItemActive("Бренды")}`}>
            <a href="#" data-category-id="">Бренды</a>
          </li>

          <li className={`main-menu__item main-menu__item_new ${props.isMenuItemActive("Новинки")}`}>
            <a href="#" data-category-id="">Новинки</a>
          </li>
        </ul>
      </div>
    </>
  )
};

export default Category;
