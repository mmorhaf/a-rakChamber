import actions from "../../actions";
import { combineReducers } from "redux";

const {
  GET_ALL_SURVEYS,
  ALL_SURVEYS_RETURNED,
  GET_SURVEY_QUESTIONS,
  GET_SURVEY_QUESTIONS_COMPLETE,
  SAVE_ANSWERS,
  SAVE_ANSWERS_COMPLETE,
  GET_SURVEY_BY_ALIAS,
  SURVEY_BY_ALIAS_RETURNED,
  GET_SURVEY_Q_BY_ALIAS,
  SURVEY_Q_BY_ALIAS_RETURNED,
  SUBMIT_SURVEY,
  SUBMIT_SURVEY_RETURNED,
  GET_ANSWERS_BY_ID,
  ANSWERS_BY_ID_RETURNED,
  GET_ARCHIVED_POLLS,
  ARCHIVED_POLLS_RETURNED,
} = actions;

export const getAllSurveys = (state = false, action) => {
  switch (action.type) {
    case GET_ALL_SURVEYS:
      return true;
    case ALL_SURVEYS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allSurveysReturned = (state = false, action) => {
  switch (action.type) {
    case ALL_SURVEYS_RETURNED:
      if (action.data) {
        if (action.data.success && action.data.surveys.length) {
          const sort = action.data.surveys[0].type;
          return {
            ...state,
            [sort]: action.data,
          };
        } else return state;
      } else return state;

    default:
      return state;
  }
};

export const gettingQuestions = (state = false, action) => {
  switch (action.type) {
    case GET_SURVEY_QUESTIONS:
      return true;
    default:
      return state;
  }
};

export const gettingQuestionsComplete = (state = null, action) => {
  switch (action.type) {
    case GET_SURVEY_QUESTIONS_COMPLETE:
      return action.data.questions || [];
    default:
      return state;
  }
};

export const savingAnswers = (state = false, action) => {
  switch (action.type) {
    case SAVE_ANSWERS:
      return true;
    case SAVE_ANSWERS_COMPLETE:
      return false;
    default:
      return state;
  }
};

export const savingAnswersComplete = (state = null, action) => {
  switch (action.type) {
    case SAVE_ANSWERS_COMPLETE:
      return action.data;
    default:
      return state;
  }
};

export const getSurveyByAlias = (state = false, action) => {
  switch (action.type) {
    case GET_SURVEY_BY_ALIAS:
      return true;
    case SURVEY_BY_ALIAS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const surveyByAliasComplete = (state = false, action) => {
  switch (action.type) {
    case SURVEY_BY_ALIAS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getAllSurvetQ = (state = false, action) => {
  switch (action.type) {
    case GET_SURVEY_Q_BY_ALIAS:
      return true;
    case SURVEY_Q_BY_ALIAS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allSurvetQReturned = (state = false, action) => {
  switch (action.type) {
    case SURVEY_Q_BY_ALIAS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const submitAnswer = (state = false, action) => {
  switch (action.type) {
    case SUBMIT_SURVEY:
      return true;
    case SUBMIT_SURVEY_RETURNED:
      return false;
    default:
      return state;
  }
};
export const submitAnswerReturned = (state = false, action) => {
  switch (action.type) {
    case SUBMIT_SURVEY_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getSurveyAnswers = (state = false, action) => {
  switch (action.type) {
    case GET_ANSWERS_BY_ID:
      return true;
    case ANSWERS_BY_ID_RETURNED:
      return false;
    default:
      return state;
  }
};
export const surveyAnswersReturned = (state = false, action) => {
  switch (action.type) {
    case ANSWERS_BY_ID_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getArchivedAnswers = (state = false, action) => {
  switch (action.type) {
    case GET_ARCHIVED_POLLS:
      return true;
    case ARCHIVED_POLLS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const ArchivedAnswersReturned = (state = false, action) => {
  switch (action.type) {
    case ARCHIVED_POLLS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  getAllSurveys,
  allSurveysReturned,
  gettingQuestions,
  gettingQuestionsComplete,
  savingAnswers,
  savingAnswersComplete,
  getSurveyByAlias,
  surveyByAliasComplete,
  getAllSurvetQ,
  allSurvetQReturned,
  submitAnswer,
  submitAnswerReturned,
  getSurveyAnswers,
  surveyAnswersReturned,
  getArchivedAnswers,
  ArchivedAnswersReturned,
});
