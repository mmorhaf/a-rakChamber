import posts from "./groups/post";
import contactus from "./groups/contactus";
import users from "./groups/users";
import careers from "./groups/careers";
import contactLinks from "./groups/contactLinks";
import files from "./groups/file";
import theme from "./groups/theme";
import happinessCenter from "./groups/happinessCenter";
import services from "./groups/services";
import category from "./groups/category";
import APIServices from "./groups/APIServices";
import links from "./groups/link";
import surveys from "./groups/survey";
import comment from "./groups/comment";
import request from "./groups/request";
import rate from "./groups/rate";
import search from "./groups/search";
import crudActions from "./groups/crudActions";
import menu from "./groups/menu";
import lastUpdate from "./groups/lastUpdate";
import blocks from "./groups/blocks";
import sitemap from "./groups/sitemap";
import loading from "./groups/loading";
import uaePass from "./groups/uaePass";

export default {
  ...posts,
  ...happinessCenter,
  ...contactus,
  ...users,
  ...careers,
  ...files,
  ...theme,
  ...services,
  ...category,
  ...APIServices,
  ...links,
  ...surveys,
  ...comment,
  ...request,
  ...rate,
  ...search,
  ...crudActions,
  ...menu,
  ...lastUpdate,
  ...contactLinks,
  ...blocks,
  ...sitemap,
  ...loading,
  ...uaePass,
  // ...category,
  // ...smtpConfigs,
  // ...generalConfigs,
  // ...file,
  // ...fileSet,
  // ...survey,
  // ...menus,
  // ...theme,
};
