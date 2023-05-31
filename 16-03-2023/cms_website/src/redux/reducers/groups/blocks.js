import actions from "../../actions";
import { combineReducers } from "redux";

const { GET_BLOCK_DATA, BLOCK_DATA_RETURNED } = actions;

export const blockData = (state = false, action) => {
  switch (action.type) {
    case GET_BLOCK_DATA:
      return true;
    case BLOCK_DATA_RETURNED:
      return false;
    default:
      return state;
  }
};
export const returnedBlockData = (state = [], action) => {
  switch (action.type) {
    case BLOCK_DATA_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  blockData,
  returnedBlockData,
});
