import React from 'react';
import {Link} from "react-router-dom";

import CategoriesComponent from "../CategoriesComponent/CategoriesComponent";
import SubCategoryComponent from "../SubCategoryComponent/SubCategoryComponent";

import logo from '../../img/header-logo.png';
import productListPic1 from '../../img/product-list__pic_1.jpg';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: "",
      isBasketActive: "",
      isProfileActive: "",
      isHiddenPanel: "",
      isSearchActive: "",

      categoryId: "",
    };
    this.headerHiddenPanelProfileVisibility = this.headerHiddenPanelProfileVisibility.bind(this);
    this.headerHiddenPanelBasketVisibility = this.headerHiddenPanelBasketVisibility.bind(this);
    this.headerMainSearchVisibility = this.headerMainSearchVisibility.bind(this);

  }


  //todo: добавить сам класс
  isBasketActive = (value) => {
    return value ? "header-main__pic_basket_menu_is-active" : "";
  };

  isBasketVisible = () => {
    return this.state.isActive === "basket" ? "hidden-panel__basket_visible" : "";
  };

  isProfileVisible = () => {
    return this.state.isActive === "profile" ? "hidden-panel__profile_visible" : "";
  };

  //todo: добавить сам класс
  isProfileActive = () => {
    return this.state.isProfileActive ? "header-main__pic_profile_menu_is-active" : "";
  };

  isPanelVisible = () => {
    return this.state.isHiddenPanel ? "header-main__hidden-panel_visible" : "";
  };

  //Видимость блока профиля в шапке
  headerHiddenPanelProfileVisibility = () => {
    this.setState({isActive: "profile"});

    if (this.state.isBasketActive) {
      this.setState({isBasketActive: false});
    } else {
      this.setState({isHiddenPanel: !this.state.isHiddenPanel});
    }
    this.setState({isProfileActive: !this.state.isProfileActive});

  };

  //Видимость блока корзины в шапке
  headerHiddenPanelBasketVisibility = () => {
    this.setState({isActive: "basket"});

    if (this.state.isProfileActive) {
      this.setState({isProfileActive: false});
    } else {
      this.setState({isHiddenPanel: !this.state.isHiddenPanel});
    }
    this.setState({isBasketActive: !this.state.isBasketActive});
  };

  isSearchActive = () => {
    return this.state.isSearchActive ? "header-main__search_active" : "";
  };

  isSearchHidden = () => {
    return this.state.isSearchActive ? "header-main__pic_search_is-hidden" : "";
  };

  //Функция видимости меню поиска в шапке
  headerMainSearchVisibility() {
    this.setState({isSearchActive: !this.state.isSeachActive});
  };

  isDroppedMenuVisible = () => {
    return this.props.isDroppedVisible ? "dropped-menu_visible" : "";
  };

  isMenuItemActive = (value) => {
    return (value === this.props.isMainMenuActive) ? "main-menu__item_active" : "";
  };






  render() {
    return (
      <>
        <header className="header">

          <div className="top-menu">
            <div className="wrapper">
              <ul className="top-menu__items">
                <li className="top-menu__item">
                  <a href="#">Возврат</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">Доставка и оплата</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">О магазине</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">Контакты</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">Новости</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-main">
            <div className="header-main__wrapper wrapper">
              <div className="header-main__phone">
                <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                <p>Ежедневно: с 09-00 до 21-00</p>
              </div>
              <div className="header-main__logo">
                <Link to='/'>

                  <h1>
                    <img src={logo} alt="logotype"/>
                  </h1>
                </Link>
                <p>Обувь и аксессуары для всей семьи</p>
              </div>
              <div className="header-main__profile">
                <div className="header-main__pics">
                  <div className={`header-main__pic header-main__pic_search ${this.isSearchHidden()}`}
                       onClick={this.headerMainSearchVisibility}>

                  </div>
                  <div className="header-main__pic_border"></div>
                  <div className="header-main__pic header-main__pic_profile"
                       onClick={this.headerHiddenPanelProfileVisibility}>
                    <div className={`header-main__pic_profile_menu ${this.isProfileActive()}`}></div>
                  </div>
                  <div className="header-main__pic_border"></div>
                  <div className="header-main__pic header-main__pic_basket"
                       onClick={this.headerHiddenPanelBasketVisibility}>
                    <div className="header-main__pic_basket_full">1</div>
                    <div className={`header-main__pic_basket_menu ${this.isBasketActive()}`}></div>
                  </div>
                </div>
                <form className={`header-main__search ${this.isSearchActive()}`} action="#">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  <input placeholder="Поиск">

                  </input>
                </form>
              </div>

            </div>
            <div className={`header-main__hidden-panel hidden-panel ${this.isPanelVisible()}`}>
              <div className="wrapper">
                {/*todo: некорректна работа isProfileVisible*/}
                <div className={`hidden-panel__profile ${this.isProfileVisible}`}>
                  <a href="#">Личный кабинет</a>
                  <a href="favorite.html">
                    <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</a>
                  <a href="#">Выйти</a>
                </div>
                <div className={`hidden-panel__basket basket-dropped ${this.isBasketVisible()}`}>
                  <div className="basket-dropped__title">В вашей корзине:</div>
                  <div className="basket-dropped__product-list product-list">
                    <div className="product-list__item">
                      <a className="product-list__pic">
                        <img src={productListPic1} alt="product"/> </a>
                      <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                      <div className="product-list__fill"></div>
                      <div className="product-list__price">12 360
                        <i className="fa fa-rub" aria-hidden="true"></i>
                      </div>
                      <div className="product-list__delete">
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>

                    <div className="product-list__item">
                      <a className="product-list__pic">
                        <img src={productListPic1} alt="product"/> </a>
                      <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                      <div className="product-list__fill"></div>
                      <div className="product-list__price">12 360
                        <i className="fa fa-rub" aria-hidden="true"></i>
                      </div>
                      <div className="product-list__delete">
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="product-list__item">
                      <a className="product-list__pic">
                        <img src={productListPic1} alt="product"/> </a>
                      <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                      <div className="product-list__fill"></div>
                      <div className="product-list__price">12 360
                        <i className="fa fa-rub" aria-hidden="true"></i>
                      </div>
                      <div className="product-list__delete">
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="product-list__item">
                      <a className="product-list__pic">
                        <img src={productListPic1} alt="product"/> </a>
                      <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                      <div className="product-list__fill"></div>
                      <div className="product-list__price">12 360
                        <i className="fa fa-rub" aria-hidden="true"></i>
                      </div>
                      <div className="product-list__delete">
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </div>
                    </div>

                  </div>
                  <Link className="basket-dropped__order-button" to="/order">Оформить заказ</Link>
                </div>
              </div>
            </div>
          </div>

          <nav className="main-menu">
            <CategoriesComponent onClick={this.props.mainSubmenuVisibility} isMenuItemActive={this.isMenuItemActive}/>
          </nav>

          <div className={`dropped-menu ${this.isDroppedMenuVisible()}`}>

            {/*Повод*/}
            {/*Категории*/}
            {/*Сезон*/}

            {/*Brand*/}
            {console.log(this.state, this.props)}
            <SubCategoryComponent categoryName={this.props.isMainMenuActive} onClick={this.props.subMenuClick}/>

          </div>
        </header>

      </>
    )
  };
}


