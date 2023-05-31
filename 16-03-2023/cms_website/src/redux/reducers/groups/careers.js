import actions from "../../actions";
import { combineReducers } from "redux";

const {
  GET_ALL_CAREERS,
  ALL_CAREERS_RETURNED,
  GET_CAREER_BY_ID,
  CAREER_BY_ID_RETURNED,
  POST_CAREER_APPLICATION,
  POST_CAREER_APPLICATION_RETURNED,
  GET_CAREER_BY_ALIAS,
  GET_CAREER_BY_ALIAS_RETURNED,
  SUBMIT_CAREER,
  SUBMIT_CAREER_DONE,
} = actions;

export const getAllCareers = (state = false, action) => {
  switch (action.type) {
    case GET_ALL_CAREERS:
      return true;
    case ALL_CAREERS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allCareersReturned = (state = false, action) => {
  switch (action.type) {
    case ALL_CAREERS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getCareerById = (state = false, action) => {
  switch (action.type) {
    case GET_CAREER_BY_ID:
      return true;
    case CAREER_BY_ID_RETURNED:
      return false;
    default:
      return state;
  }
};
export const careerByIdReturned = (state = false, action) => {
  switch (action.type) {
    case CAREER_BY_ID_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const postCarrerApp = (state = false, action) => {
  switch (action.type) {
    case POST_CAREER_APPLICATION:
      return true;
    case POST_CAREER_APPLICATION_RETURNED:
      return false;
    default:
      return state;
  }
};
export const carrerAppReturned = (state = false, action) => {
  switch (action.type) {
    case POST_CAREER_APPLICATION_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getCareerByAlias = (state = false, action) => {
  switch (action.type) {
    case GET_CAREER_BY_ALIAS:
      return true;
    case GET_CAREER_BY_ALIAS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const careerByAliasReturned = (state = false, action) => {
  switch (action.type) {
    case GET_CAREER_BY_ALIAS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

//SubmitCareer
export const submitCareer = (state = false, action) => {
  switch (action.type) {
    case SUBMIT_CAREER:
      return true;
    case SUBMIT_CAREER_DONE:
      return false;
    default:
      return state;
  }
};

export const submitCareerDone = (state = null, action) => {
  switch (action.type) {
    case SUBMIT_CAREER_DONE:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getAllCareers,
  allCareersReturned,
  getCareerById,
  submitCareer,
  submitCareerDone,
  careerByIdReturned,
  postCarrerApp,
  carrerAppReturned,
  getCareerByAlias,
  careerByAliasReturned,
});
