import React from "react";

export default class CategoryNewProducts extends React.Component {
  constructor(props) {
    super(props);
  }


  isActive = (id) => {
    return  parseInt(this.props.categoryActive) === parseInt(id) ? "new-deals__menu-item_active" : "";
  };

  render() {
    return (
      <div className="new-deals__menu">
        <ul className="new-deals__menu-items">
          {this.props.category.data && this.props.category.data.map(categoryElement => {
            return (
              <li className={`new-deals__menu-item ${this.isActive(categoryElement.id)}`} key={categoryElement.id}>
                <a href="#" onClick={this.props.onClick}
                   data-category-id={categoryElement.id}>{categoryElement.title}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
;
