import React from "react";

import withFetcher from "../withFetcher/withFetcher";
import SubCategory from "../SubCategory/SubCategory";

const SubCategoryComponent = withFetcher({
  url: 'https://api-neto.herokuapp.com/bosa-noga/filters',
  collName: 'filters'
})(SubCategory);

export default SubCategoryComponent;
