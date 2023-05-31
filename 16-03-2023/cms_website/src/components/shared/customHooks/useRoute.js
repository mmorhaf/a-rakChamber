import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { ltrPaths, rtlPaths } from "../subPageGenerator/paths";

function useRoute({ match, subPage, category }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const componentRef = useRef();
  const anchorRef = React.useRef(null);
  const { alias, apply } = match.params;
  const paths = isRTL ? rtlPaths : ltrPaths;

  const { main, mainPath, routes } = paths[subPage];

  const currentRoute = routes.find((route) => route?.category === category);

  const {
    path: secondaryPagePath,
    secondary: secondaryPage,
    subRoute: { detailsPage, subSubRoute: { name } = {} } = {},
  } = currentRoute;

  return {
    main,
    mainPath,
    secondaryPage,
    secondaryPagePath,
    detailsPage,
    alias,
    apply,
    name,
    componentRef,
    anchorRef,
  };
}

export default useRoute;
