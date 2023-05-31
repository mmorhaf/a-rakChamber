import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Dialog from "../../shared/dialog/Dialog";
import * as Survey from "survey-react";
import * as widgets from "surveyjs-widgets";
import "survey-react/survey.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "pretty-checkbox/dist/pretty-checkbox.css";
import actions from "../../../redux/actions";

window["$"] = window["jQuery"] = $;

Survey.StylesManager.applyTheme("default");

widgets.prettycheckbox(Survey);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

const {
  getSurveyQuestions,
  getSurveyQuestionsComplete,
  saveAnswers,
  loadingAction,
  saveAnswersComplete,
} = actions;
function onValueChanged(result) {
  console.log("value changed!");
}

export default function ViewEnglish({ id }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  //const params = useParams();

  const dispatch = useDispatch();
  const [renderSurvey, setRenderSurvey] = useState(true);
  let { gettingQuestionsComplete } = useSelector((state) => state.surveys);
  let reducers = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => dispatch(getSurveyQuestionsComplete({ data: false }));
  }, []);

  useEffect(() => {
    dispatch(saveAnswersComplete({ data: false }));
  }, []);

  useEffect(() => {
    if (
      reducers?.surveys?.savingAnswersComplete &&
      !reducers?.surveys?.savingAnswersComplete?.data?.success
    ) {
      setOpen(true);
      if (reducers?.surveys?.savingAnswersComplete?.data?.code == 66)
        setMessage(
          isRTL
            ? "لا يمكنك التصويت لهذا الاستبيان, لقد قمت بذلك مسبقا."
            : "Sorry, You have Voted Before."
        );
      else
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
            : "Something went wrong , please try again"
        );
      setTimeout(() => {
        dispatch(saveAnswersComplete({ data: false }));
      }, 7000);
    } else {
      setOpen(false);
      setMessage(false);
    }
  }, [reducers]);

  useEffect(() => {
    if (gettingQuestionsComplete) dispatch(loadingAction({ loading: false }));
  }, [gettingQuestionsComplete]);

  useEffect(() => {
    let data = {
      id: id,
    };
    dispatch(getSurveyQuestions({ data }));
  }, [id]);

  const onComplete = (result) => {
    let data = {
      surveyId: parseInt(id),
      answer: JSON.stringify(result.data),
    };

    dispatch(saveAnswers({ data }));
    if (Object.values(result.data).length) setRenderSurvey(false);
  };

  let model = new Survey.Model(gettingQuestionsComplete);

  model.locale = isRTL ? "ar" : "en";

  return (
    <Container maxWidth="xl">
      {renderSurvey ? (
        <Survey.Survey
          model={model}
          onComplete={onComplete}
          onValueChanged={onValueChanged}
        />
      ) : (
        <Typography variant="body2">
          {isRTL
            ? "شكرا لك لاستخدامك نظام الإستبيان خاصتنا"
            : "Thank You For Using Our Survey System"}
        </Typography>
      )}
      <Box></Box>
      <Dialog open={open} message={message} />
    </Container>
  );
}
