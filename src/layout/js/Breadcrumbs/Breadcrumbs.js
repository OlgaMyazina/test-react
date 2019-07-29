import React from "react";
import {Link} from "react-router-dom";

const Breadcrumbs = ({match, ...rest}) => {
  console.log(`props BreadCrums`, match, rest);

  const getLink = () => {
    const result = [];

    console.log(`breadcrumbs`, match, rest);

    if (rest.location.pathname.includes("favorite")){
      result.push({
          link: `${rest.location.pathname}${rest.location.search}`,
          value: "Избранное",
        }
      );
      return result;
    }

    if (rest.location.search.includes("search")) {
      result.push({
          link: `${rest.location.pathname}${rest.location.search}`,
          value: "Результаты поиска",
        }
      );
      return result;
    }



    if (rest.categoryId) {
      result.push({
          link: `${rest.location.pathname}?categoryId=${rest.categoryId}`,
          value: rest.item,
        }
      )
    }

    if (rest.location.search.includes("type")) {
      const element = getParam(rest.location.search, "type");
      result.push({
        link: `${rest.location.pathname}${rest.location.search}`,
        value: element ? element.value : "",
      });
    }
    return result;
  };

  const parseQueryString = (url) => {
    const paramString = url.substring(1),
      paramArray = paramString.split("&"),
      parseArray = [];
    paramArray.map(element => {
      const parseElement = element.split("=");
      parseArray.push({
        param: parseElement[0],
        value: decodeURIComponent(parseElement[1])
      })
    });
    return parseArray;
  };

  const getParam = (url, param) => {
    const paramArray = parseQueryString(url);
    const paramElement = paramArray.find((element) => {
      return element.param === param;
    });
    return paramElement;
  };

  return (
    <div className="site-path">
      <ul className="site-path__items">
        <li className="site-path__item" key="Главная"><Link to="/">Главная</Link></li>
        {getLink().map(element => {
          return (
            <li className="site-path__item" key={element.value}>
              <Link to={element.link}>{element.value}</Link>
            </li>
          )
        })}

      </ul>
    </div>
  )
};

export default Breadcrumbs;