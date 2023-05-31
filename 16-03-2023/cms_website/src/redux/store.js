import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/sagas/index";
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory({ basename: "" });

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);

export default store;
