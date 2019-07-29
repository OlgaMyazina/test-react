const urlToFilters = (url) => {
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


  const paramString = url.substring(1),
    paramArray = paramString.split("&"),
    filters = blankFilters;

  paramArray.map(element => {
    if (!element) return;
    const parseElement = element.split("=");
    const testElement = parseElement[0].slice(-2);
    if (testElement === "[]") {
      filters[parseElement[0].slice(0, -2)].push(parseInt(parseElement[1]));
    } else {
      filters[parseElement[0]] = decodeURIComponent(parseElement[1])
    }
  });

  return filters;
};

export default urlToFilters;