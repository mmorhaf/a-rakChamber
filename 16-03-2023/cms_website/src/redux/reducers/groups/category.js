import actions from "../../actions";
import { combineReducers } from "redux";

const {
  GET_CATEGORIES,
  CATEGORIES_RETURNED,
  GET_CATEGORY_BY_ID,
  CATEGORY_BY_ID_RETURNED,
  GET_CATEGORY_BY_ALIAS,
  BY_ALIAS_RETURNED,
  GET_CATEGORY_TREE_BY_ALIAS,
  CATEGORY_TREE_RETURNED,
} = actions;

export const getCategories = (state = false, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return true;
    case CATEGORIES_RETURNED:
      return false;
    default:
      return state;
  }
};
export const categoriesReturned = (state = false, action) => {
  switch (action.type) {
    case CATEGORIES_RETURNED:
      if (action.data.success) {
        if (action.data.categories.length) {
          const sort = action.data.categories[0].type;

          return {
            ...state,
            [sort]: action.data,
          };
        } else {
          return action.data;
        }
      } else {
        return action.data;
      }

    default:
      return state;
  }
};

export const getCategoryById = (state = false, action) => {
  switch (action.type) {
    case GET_CATEGORY_BY_ID:
      return true;
    case CATEGORY_BY_ID_RETURNED:
      return false;
    default:
      return state;
  }
};
export const categoryByIdReturned = (state = false, action) => {
  switch (action.type) {
    case CATEGORY_BY_ID_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getCategoryByAlias = (state = false, action) => {
  switch (action.type) {
    case GET_CATEGORY_BY_ALIAS:
      return true;
    case BY_ALIAS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const categoryByAliasReturned = (state = false, action) => {
  switch (action.type) {
    case BY_ALIAS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getCategoryTree = (state = false, action) => {
  switch (action.type) {
    case GET_CATEGORY_TREE_BY_ALIAS:
      return true;
    case CATEGORY_TREE_RETURNED:
      return false;
    default:
      return state;
  }
};
export const categoryTreeReturned = (state = false, action) => {
  switch (action.type) {
    case CATEGORY_TREE_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getCategories,
  categoriesReturned,
  getCategoryById,
  categoryByIdReturned,
  getCategoryByAlias,
  categoryByAliasReturned,
  getCategoryTree,
  categoryTreeReturned,
});
