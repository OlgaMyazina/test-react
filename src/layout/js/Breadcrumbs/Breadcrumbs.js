import React from "react";
import {Link} from "react-router-dom";

import filtersToUrl from "../filters/filtersToUrl";
import urlToFilters from "../filters/urlToFilters";

const Breadcrumbs = ({match, location, ...rest}) => {
  console.log(`props BreadCrums`, match, rest);

  const getLink = () => {
    const result = [];

    console.log(`breadcrumbs`, match, rest);
    const filters = urlToFilters(location.search);
    console.log('breadcrums filters', filters);

    if (location.pathname.includes("favorite")) {
      result.push({
          link: `${location.pathname}${location.search}`,
          value: "Избранное",
        }
      );
      return result;
    }

    if (location.search.includes("search")) {
      result.push({
          link: `${location.pathname}${location.search}`,
          value: "Результаты поиска",
        }
      );
      return result;
    }


    if ((filters.categoryId)&&(rest.categories)) {
      result.push({
          link: `${location.pathname}?categoryId=${filters.categoryId}`,
          value: rest.categories.categories.data.find(element=>{return element.id ==filters.categoryId}).title,
        }
      )
    }

    if (filters.type) {
      const element = getParam(location.search, "type");
      result.push({
        link: `${location.pathname}${location.search}`,
        value: element ? element.value : "",
      });
    }
    console.log(`result breadcrums`,result);
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