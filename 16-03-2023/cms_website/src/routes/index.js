import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Spinner from "./Spinner";
import Routes from "./Routes";
import { setDirection } from "../redux/actionCreators/theme";
import { buildCanonicalUrl } from "../components/shared/utils";
import { PRODUCTION } from "../constants/config.json";

function Index() {
  const [processed, setProcessed] = useState(false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const isRTL = useSelector((state) => state.theme_reducer.basicTheme.isRTL);

  const currentLanguage = isRTL ? "ar" : "en";
  const { pathname: currentUrl, search: urlParams } = useLocation();

  useEffect(() => {
    (async () => {
      if (window.location.href.includes("/gateway.php#/app/coo/preview/")) {
        let coo_code = window.location.href.split("/").pop();
        return window.location.replace(
          `${PRODUCTION}/services-form/business-services/coo-preview/verify/${coo_code}/null/null/null/null`
        );
      }
      if (window.location.href.includes("/gateway.php#/app/vr")) {
        let verify_id = window.location.href.split("/").pop();
        return window.location.replace(
          `${PRODUCTION}/services-form/business-services/ratification-verify?verify_id=${verify_id}`
        );
      }
      window.chatbotlang = isRTL ? "ar" : "en";
      setProcessed(false);
      let { canonicalUrl, canonicalLanguage } = await buildCanonicalUrl(
        currentUrl,
        currentLanguage
      );
      if (currentLanguage !== canonicalLanguage) {
        dispatch(setDirection({ isRTL: !isRTL }));
        i18n.changeLanguage(isRTL ? "en" : "ar");
        window.chatbotlang = isRTL ? "en" : "ar";
      }

      if (canonicalUrl === currentUrl) {
        setProcessed(true);
        return;
      }
      window.location.replace(canonicalUrl + urlParams);
    })();
  }, [currentUrl]);

  if (!processed) {
    return <Spinner />;
  }

  return (
    <Switch>
      <Route path="/:language/" component={Routes} />
    </Switch>
  );
}

export default Index;
