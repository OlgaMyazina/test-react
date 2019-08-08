import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


import CategoriesComponent from "../CategoriesComponent/CategoriesComponent";
import SubCategoryComponent from "../SubCategoryComponent/SubCategoryComponent";
import Search from "../Search/Search";
import CartList from "../CartList/CartList";
import RangeSlider from "../RangeSlider/RangeSlider";


import logo from '../../img/header-logo.png';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: "",
      isBasketActive: "",
      isProfileActive: "",
      isHiddenPanel: "",
      isSearchActive: "",

      isSubCategoryVisible: false,

      categoryId: "",
    };
    this.headerHiddenPanelProfileVisibility = this.headerHiddenPanelProfileVisibility.bind(this);
    this.headerHiddenPanelBasketVisibility = this.headerHiddenPanelBasketVisibility.bind(this);
    this.headerMainSearchVisibility = this.headerMainSearchVisibility.bind(this);

  }

  componentDidMount() {
    //Если корзина
    if (this.props.location.pathname.includes("cart")) {
      this.setState({isActive: "basket", isBasketActive: true, isHiddenPanel: true});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.isSubCategoryVisible && (this.props.location.search !== prevProps.location.search)) {
      this.setState({
        isSubCategoryVisible: false
      })
    }
    if (prevProps.location !== this.props.location) {
      //поменялся location, скрываем панель с профилем, корзиной
      this.setState({isActive: "", isBasketActive: false, isProfileActive: false, isHiddenPanel: false})
    }
    if ((prevState.isActive !== this.state.isActive) &&
      (prevState.isBasketActive !== this.state.isBasketActive) &&
      (prevState.isHiddenPanel !== this.state.isHiddenPanel)) {
      //Если корзина
      if (this.props.location.pathname.includes("cart")) {
        this.setState({isActive: "basket", isBasketActive: true, isHiddenPanel: true});
      }
    }

  }

  //todo: добавить сам класс
  isBasketActive = () => {
    return this.state.isBasketActive ? "header-main__pic_basket_menu_is-active" : "";
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
    return this.state.isSubCategoryVisible ? "dropped-menu_visible" : "";
  };

  isMenuItemActive = (value) => {
    return (value === this.props.isMainMenuActive) ? "main-menu__item_active" : "";
  };

  handlerCategory = (event) => {
    event.preventDefault();
    this.setState({
      isSubCategoryVisible: !this.state.isSubCategoryVisible,
      categoryId: event.target.getAttribute("data-category-id") ? event.target.getAttribute("data-category-id") : "",
    })
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
                  <Link to="/about">О магазине</Link>
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
                <Link to="/">
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
                  <div className="header-main__pic_border"/>
                  <div className="header-main__pic header-main__pic_profile"
                       onClick={this.headerHiddenPanelProfileVisibility}>
                    <div className={`header-main__pic_profile_menu ${this.isProfileActive()}`}/>
                  </div>
                  <div className="header-main__pic_border"/>
                  <div className="header-main__pic header-main__pic_basket"
                       onClick={this.headerHiddenPanelBasketVisibility}>
                    <div className="header-main__pic_basket_full">1</div>
                    <div className={`header-main__pic_basket_menu ${this.isBasketActive()}`}/>
                  </div>
                </div>
                <Search isSearchActive={this.isSearchActive()} {...this.props}/>
              </div>

            </div>
            <div className={`header-main__hidden-panel hidden-panel ${this.isPanelVisible()}`}>
              <div className="wrapper">
                <div className={`hidden-panel__profile ${this.isProfileVisible()}`}>
                  <a href="#">Личный кабинет</a>
                  <Link to="/favorite">
                    <i className="fa fa-heart-o" aria-hidden="true"/>Избранное</Link>
                  <a href="#">Выйти</a>
                </div>
                <div className={`hidden-panel__basket basket-dropped ${this.isBasketVisible()}`}>
                  <CartList location={this.props.location}
                            history={this.props.history}
                            onRemoveFromCart={this.props.onRemoveFromCart}
                            products ={this.props.products}
                  />
                </div>
              </div>
            </div>
          </div>

          <nav className="main-menu">

            <CategoriesComponent onClick={this.handlerCategory}
                                 isMenuItemActive={this.isMenuItemActive}
                                 location={this.props.location}/>
          </nav>

          <div className={`dropped-menu ${this.isDroppedMenuVisible()}`}>
            <SubCategoryComponent categoryName={this.props.isMainMenuActive}
                                  onClick={this.props.subMenuClick}
                                  categoryId={this.state.categoryId}/>

          </div>
        </header>

      </>
    )
  };
}

Header.propTypes = {
  onRemoveFromCart: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  staticContext: PropTypes.object,
  products: PropTypes.array,
};

