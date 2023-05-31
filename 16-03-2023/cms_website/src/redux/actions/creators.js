/* 
Creates one single action,
Examples:

Input:
    createAction('GET_XXX', 'status', 'payload')
Output:
    {
        GET_DATA: 'GET_XXX',
        getData: (status, payload) => ({ type: 'GET_XXX', status, payload }),
    }
*/
import camelCase from "lodash/camelCase";

export const createAction = (type, ...props) => {
  const actionCreatorName = camelCase(type);

  const actionCreator = (data = {}) => {
    const action = { type };
    props.forEach((property) => {
      if (data.hasOwnProperty(property)) {
        action[property] = data[property];
      } else {
        action[property] = null;
      }
    });
    return action;
  };

  return { [type]: type, [actionCreatorName]: actionCreator };
};

export const createFetchListActionsGroup = (name) => ({
  ...createAction(`${name}_RESET_ACTION`),
  ...createAction(`${name}_LOAD_ACTION`, "payload"),
  ...createAction(`${name}_LOAD_MORE_RETRY_ACTION`, "payload"),
  ...createAction(`${name}_LOAD_MORE_ACTION`, "payload"),

  ...createAction(`${name}_LOAD_REQUEST`),
  ...createAction(`${name}_LOAD_SUCCESS`, "status", "payload"),
  ...createAction(`${name}_LOAD_ERROR`, "error", "response"),

  ...createAction(`${name}_LOAD_MORE_REQUEST`),
  ...createAction(`${name}_LOAD_MORE_SUCCESS`, "status", "payload"),
  ...createAction(`${name}_LOAD_MORE_ERROR`, "error", "response"),
});

export const createFetchDataActionsGroup = (name) => ({
  ...createAction(`${name}_RESET_ACTION`),
  ...createAction(`${name}_LOAD_ACTION`, "payload", "background"),

  ...createAction(`${name}_LOAD_REQUEST`, "background"),
  ...createAction(`${name}_LOAD_SUCCESS`, "status", "payload"),
  ...createAction(`${name}_LOAD_ERROR`, "error", "response"),
});

export const createPostRequestActionsGroup = (name) => ({
  ...createAction(`${name}_POST`, "id", "payload"),
  ...createAction(`${name}_SUCCESS`, "id", "payload"),
  ...createAction(`${name}_ERROR`, "id", "error", "response"),
});
