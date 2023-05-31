import * as ACTION_TYPES from "../actions/actionTypes";

export function changeTheme(currentTheme) {
  localStorage.setItem("RakChamberTheme", JSON.stringify(currentTheme));

  return {
    type: ACTION_TYPES.CHANGE_THEME,
    payload: currentTheme,
  };
}

export function setDarkMode({ isDark }) {
  localStorage.setItem("isDark", JSON.stringify(isDark));

  return {
    type: ACTION_TYPES.DARK_THEME,
    payload: isDark,
  };
}

export function setDirection({ isRTL }) {
  localStorage.setItem("isRTL", JSON.stringify(isRTL));
  window.chatbotlang = JSON.stringify(isRTL) ? "ar" : "en";
  return {
    type: ACTION_TYPES.SET_DIRECTION,
    payload: isRTL,
  };
}

/*export function getThemeList() {
  let res = await get_themes();

  return ({
    type: ACTION_TYPES.GET_THEME_LIST,
    payload: res,
  });
}*/

////// FontSize //////
export function increaseFont() {
  return {
    type: ACTION_TYPES.INCREASE_FONT,
  };
}
export function decreaseFont() {
  return {
    type: ACTION_TYPES.DECREASE_FONT,
  };
}

export function resetFont() {
  return {
    type: ACTION_TYPES.RESET_FONT,
  };
}
