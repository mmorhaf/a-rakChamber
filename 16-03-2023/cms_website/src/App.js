import "./styles/App.css";
import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import ScrollToTop from "../src/components/shared/scrollToTop/ScrollToTop";
import { store, history } from "./redux/store";
import Index from "./routes/index";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop />
        <Index />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
