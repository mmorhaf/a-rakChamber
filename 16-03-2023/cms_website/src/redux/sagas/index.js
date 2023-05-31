import { fork } from "redux-saga/effects";
import * as posts from "./groups/post";
import * as contactus from "./groups/contactus";
import * as users from "./groups/users";
import * as careers from "./groups/careers";
import * as happinessCenter from "./groups/happinessCenter";

import * as files from "./groups/file";
import * as services from "./groups/services";
import * as category from "./groups/category";
import * as links from "./groups/link";
import * as contactLinks from "./groups/contactLinks";
import * as surveys from "./groups/survey";
import * as comment from "./groups/comment";
import * as request from "./groups/request";
import * as APIServices from "./groups/APIServices";
import * as rate from "./groups/rate";
import * as search from "./groups/search";
import * as crudSagas from "./groups/crud";
import * as menu from "./groups/menu";
import * as lastUpdate from "./groups/lastUpdate";
import * as blocks from "./groups/blocks";
import * as sitemap from "./groups/sitemap";
import * as loading from "./groups/loading";
import * as uaePass from "./groups/uaePass";

const sagas = Object.values({
  ...posts,
  ...contactus,
  ...contactLinks,
  ...users,
  ...careers,
  ...happinessCenter,
  ...files,
  ...services,
  ...category,
  ...APIServices,
  ...links,
  ...surveys,
  ...comment,
  ...request,
  ...rate,
  ...search,
  ...crudSagas,
  ...menu,
  ...lastUpdate,
  ...blocks,
  ...sitemap,
  ...loading,
  ...uaePass,
});

export default function* rootSaga(getState) {
  for (let index = 0; index < sagas.length; index++) {
    yield fork(sagas[index]);
  }
}
