import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import theme_reducer from "./theme";
import posts_reducers from "./groups/post";
import contactus from "./groups/contactus";
import contactLinks from "./groups/contactLinks";
import users from "./groups/users";
import careers from "./groups/careers";
import happinessCenter from "./groups/happinessCenter";
import files from "./groups/file";
import services from "./groups/services";
import category from "./groups/category";
import APIServices from "./groups/APIServices";
import links from "./groups/link";
import surveys from "./groups/survey";
import comment from "./groups/comment";
import request from "./groups/request";
import rate from "./groups/rate";
import search from "./groups/search";
import crudReducers from "./groups/crudReducer";
import menu from "./groups/menu";
import lastUpdate from "./groups/lastUpdate";
import blocks from "./groups/blocks";
import sitemap from "./groups/sitemap";
import loading from "./groups/loading";
import uaePass from "./groups/uaePass";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    theme_reducer,
    posts_reducers,
    contactus,
    contactLinks,
    users,
    careers,
    happinessCenter,
    files,
    services,
    category,
    APIServices,
    links,
    surveys,
    comment,
    request,
    rate,
    search,
    crudReducers,
    menu,
    lastUpdate,
    blocks,
    sitemap,
    loading,
    uaePass,
  });

export default rootReducer;
