import React from "react";

import withFetcher from "../withFetcher/withFetcher";
import Catalog from "../Catalog/Catalog";

const BrandFilterComponent = withFetcher({
  url: ({filter}) => `https://api-neto.herokuapp.com/bosa-noga/products/${filter}`,
  collName: 'products'
})(Catalog);


export default BrandFilterComponent;