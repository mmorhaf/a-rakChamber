import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import {
  getAllSurveys,
  getSurveyQuestion,
  saveSurveyAnswers,
  getSurveyByAlias,
  getSurveyQByAlias,
  submitSurveyAnswer,
  getSurveyAnswers,
  getArchivedPolls,
} from "../../network/survey";
import actions from "../../actions";

const {
  GET_ALL_SURVEYS,
  allSurveysReturned,
  GET_SURVEY_QUESTIONS,
  getSurveyQuestionsComplete,
  SAVE_ANSWERS,
  saveAnswersComplete,
  GET_SURVEY_BY_ALIAS,
  surveyByAliasReturned,
  GET_SURVEY_Q_BY_ALIAS,
  surveyQByAliasReturned,
  SUBMIT_SURVEY,
  submitSurveyReturned,
  GET_ANSWERS_BY_ID,
  answersByIdReturned,
  GET_ARCHIVED_POLLS,
  archivedPollsReturned,
} = actions;

function* performGetAllSurveys(action) {
  try {
    const { sort: type, language } = action;

    const result = yield call(getAllSurveys, type, language);

    if (result) yield put(allSurveysReturned({ data: result.res }));
    else yield put(allSurveysReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetAllSurveys() {
  yield takeEvery(GET_ALL_SURVEYS, performGetAllSurveys);
}

//get questions
function* performGetQuestions({ data }) {
  try {
    const result = yield call(getSurveyQuestion, data);
    if (result.networkSuccess)
      yield put(getSurveyQuestionsComplete({ data: result.res }));
    else yield put(getSurveyQuestionsComplete({ data: result.res }));
  } catch (e) {
    yield put(getSurveyQuestionsComplete({ data: { success: false } }));
    return;
  }
}

export function* watchGetQuestions() {
  yield takeLatest(GET_SURVEY_QUESTIONS, performGetQuestions);
}

// save answers
function* performSaveAnswers({ data }) {
  try {
    const result = yield call(saveSurveyAnswers, data);
    if (result.networkSuccess) yield put(saveAnswersComplete({ data: result }));
    else yield put(saveAnswersComplete({ data: result }));
  } catch (e) {
    yield put(saveAnswersComplete({ data: { success: false } }));
    return;
  }
}

export function* watchSaveAnswers() {
  yield takeLatest(SAVE_ANSWERS, performSaveAnswers);
}

function* performGetSurveyByAlias(action) {
  try {
    const { alias, language } = action;

    const result = yield call(getSurveyByAlias, alias, language);
    if (result) yield put(surveyByAliasReturned({ data: result.res }));
    else yield put(surveyByAliasReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetSurveyByAlias() {
  yield takeEvery(GET_SURVEY_BY_ALIAS, performGetSurveyByAlias);
}

function* performGetSurveyG(action) {
  try {
    const { alias, language } = action;

    const result = yield call(getSurveyQByAlias, alias, language);
    if (result)
      yield put(surveyQByAliasReturned({ data: result.res.questions }));
    else yield put(surveyQByAliasReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetSurveyG() {
  yield takeEvery(GET_SURVEY_Q_BY_ALIAS, performGetSurveyG);
}

function* performSubmitSurveyAnswer(action) {
  try {
    const { data, language } = action;
    const result = yield call(submitSurveyAnswer, data, language);

    if (result) yield put(submitSurveyReturned({ data: result.data }));
    else yield put(submitSurveyReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchSubmitSurveyAnswer() {
  yield takeEvery(SUBMIT_SURVEY, performSubmitSurveyAnswer);
}

function* performGetSurveyAnswwers(action) {
  try {
    const { id } = action;
    const result = yield call(getSurveyAnswers, id);
    if (result) yield put(answersByIdReturned({ data: result.res }));
    else yield put(answersByIdReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetSurveyAnswwers() {
  yield takeEvery(GET_ANSWERS_BY_ID, performGetSurveyAnswwers);
}

function* performGetArchivedAnswwers(action) {
  try {
    const { language } = action;
    const result = yield call(getArchivedPolls, language);
    if (result) yield put(archivedPollsReturned({ data: result.res }));
    else yield put(archivedPollsReturned({ data: [] }));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetArchivedAnswwers() {
  yield takeEvery(GET_ARCHIVED_POLLS, performGetArchivedAnswwers);
}
