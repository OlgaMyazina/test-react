import React from "react";

import withFetcher from "../withFetcher/withFetcher";
import Sidebar from "../Sidebar/Sidebar";

const SidebarComponent = withFetcher({
  url: 'https://api-neto.herokuapp.com/bosa-noga/filters',
  collName: 'data'
})(Sidebar);

export default SidebarComponent;
