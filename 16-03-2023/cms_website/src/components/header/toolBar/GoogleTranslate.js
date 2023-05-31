import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default React.memo(function GoogleTranslate() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: isRTL ? "ar" : "en",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: true,
      },
      "google_translate_element"
    );
  };
  useEffect(async () => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );

    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return <span id="google_translate_element"></span>;
});
