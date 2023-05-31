import actions from "../../actions";
import { combineReducers } from "redux";
const {
  GET_THEME_LIST_ACTION,
  THEME_LIST_RETURNED,
  CHANGE_THEME,
  SET_DARK_THEME,
  SET_DIRECTION,
  INCREASE_FONT,
  DECREASE_FONT,
  RESET_FONT,
} = actions;

export const getThemeList = (state = false, action) => {
  switch (action.type) {
    case GET_THEME_LIST_ACTION:
      return true;
    case THEME_LIST_RETURNED:
      return false;
    default:
      return state;
  }
};

export const themeListReturned = (state = [], action) => {
  switch (action.type) {
    case THEME_LIST_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const changeTheme = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.data;
    default:
      return state;
  }
};

export const setDarkTheme = (state = false, action) => {
  switch (action.type) {
    case SET_DARK_THEME:
      return action.data;
    default:
      return state;
  }
};

export const setDirection = (state = false, action) => {
  switch (action.type) {
    case SET_DIRECTION:
      return action.data;
    default:
      return state;
  }
};

export const increaseFont = (state = false, action) => {
  switch (action.type) {
    case INCREASE_FONT:
      return action.data;
    default:
      return state;
  }
};

export const decreaseFont = (state = false, action) => {
  switch (action.type) {
    case DECREASE_FONT:
      return action.data;
    default:
      return state;
  }
};

export const resetFont = (state = false, action) => {
  switch (action.type) {
    case RESET_FONT:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getThemeList,
  themeListReturned,
});
