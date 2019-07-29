import urlToFilter from "./urlToFilters";

const filtersToUrl = (filters) => {
  const blankFilters = {
    search: "",
    categoryId: undefined,
    type: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    size: [],
    heelSize: [],
    color: "",
    season: "",
    reason: "",
    sort: "",
    page: undefined,

  };

  let result = "";
  for (let key of Object.keys(filters)) {
    if (Array.isArray(filters[key])){
      filters[key].map(element=>{
        result+=`&${key}[]=${element}`;
      })
    } else {
      if (filters[key]){
        result += `&${key}=${filters[key]}`;
      }
    }
  }
  return result;
};

export default filtersToUrl;