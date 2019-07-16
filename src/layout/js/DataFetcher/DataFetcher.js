import React from "react";

import withFetcher from "../withFetcher/withFetcher";
import App from "../App";

const DataFetcher = withFetcher({
  url: '/api/articles',
  collName: 'articles'
})(App);

const CommentsComponent = withFetcher({
  url: ({articleId}) =>
    `/api/articles/${articleId}/comments`,
  collName: 'comments'
})(Comments);