import * as ACTION_TYPES from "../actions/actionTypes";
import { combineReducers } from "redux";
import { themeList } from "../../constants/theme";

const defaultTheme = localStorage.getItem("RakChamberTheme")
  ? JSON.parse(localStorage.getItem("RakChamberTheme"))
  : themeList[0];

const initialState = {
  isDark: Boolean(JSON.parse(localStorage.getItem("isDark"))),
  // isBlind: Boolean(JSON.parse(localStorage.getItem("isBlind"))),
  currentTheme: defaultTheme,
  themeList,
  isRTL: Boolean(JSON.parse(localStorage.getItem("isRTL"))),
};

const basicTheme = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.DARK_THEME:
      return {
        ...state,
        isDark: action.payload,
      };

    // case ACTION_TYPES.BLIND_THEME:
    //   return {
    //     ...state,
    //     isBlind: action.payload,
    //   };

    case ACTION_TYPES.SET_DIRECTION:
      return {
        ...state,
        isRTL: action.payload,

        currentTheme: {
          ...state.currentTheme,
          direction: action.payload === true ? "rtl" : "ltr",
        },
      };

    case ACTION_TYPES.CHANGE_THEME:
      return {
        ...state,
        currentTheme: action.payload,
      };

    case ACTION_TYPES.GET_THEME_LIST:
      return {
        ...state,
        themeList: action.payload.length ? action.payload : state.themeList,
      };

    case ACTION_TYPES.INCREASE_FONT:
      return {
        ...state,
        currentTheme: {
          ...state.currentTheme,
          elements: {
            ...state.currentTheme.elements,
            fontSize: {
              ...state.currentTheme.elements.fontSize,
              xl: state.currentTheme.elements.fontSize.xl + 1,
              lg: state.currentTheme.elements.fontSize.lg + 1,
              m: state.currentTheme.elements.fontSize.m + 1,
              s: state.currentTheme.elements.fontSize.s + 1,
              xs: state.currentTheme.elements.fontSize.xs + 1,
            },
          },
        },
      };

    case ACTION_TYPES.DECREASE_FONT:
      return {
        ...state,
        currentTheme: {
          ...state.currentTheme,
          elements: {
            ...state.currentTheme.elements,
            fontSize: {
              ...state.currentTheme.elements.fontSize,
              xl: state.currentTheme.elements.fontSize.xl - 1,
              lg: state.currentTheme.elements.fontSize.lg - 1,
              m: state.currentTheme.elements.fontSize.m - 1,
              s: state.currentTheme.elements.fontSize.s - 1,
              xs: state.currentTheme.elements.fontSize.xs - 1,
            },
          },
        },
      };

    case ACTION_TYPES.RESET_FONT:
      return {
        ...state,
        currentTheme: {
          ...state.currentTheme,
          elements: {
            ...state.currentTheme.elements,
            fontSize: {
              ...state.currentTheme.elements.fontSize,
              xl: state.currentTheme.elements.fontSizeG[0],
              lg: state.currentTheme.elements.fontSizeG[1],
              m: state.currentTheme.elements.fontSizeG[2],
              s: state.currentTheme.elements.fontSizeG[3],
              xs: state.currentTheme.elements.fontSizeG[4],
            },
          },
        },
      };
    default:
      return state;
  }
};

export default combineReducers({
  basicTheme,
});
