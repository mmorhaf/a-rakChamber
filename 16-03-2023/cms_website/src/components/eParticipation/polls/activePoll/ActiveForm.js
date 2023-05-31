import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../../redux/actions";
import { FormControlLabel, Radio, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { RadioGroup } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import useStyles from "../../../../styles/components/eParticipation/polls/activeForm";
import { Link } from "react-router-dom";
import Dialog from "../../../shared/dialog/Dialog";

const { submitSurvey, submitSurveyReturned } = actions;

function ActiveForm({
  item: { id, name, choices },
  setShowResults,
  showResults,
  homePage,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const reducers = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClick = () => {
    setShowResults(!showResults);
  };

  useEffect(() => {
    if (reducers?.surveys?.submitAnswerReturned?.success) setShowResults(true);
    else if (
      reducers?.surveys?.submitAnswerReturned &&
      !reducers?.surveys?.submitAnswerReturned?.success
    ) {
      setOpen(true);
      if (reducers?.surveys?.submitAnswerReturned?.code == 66)
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
        dispatch(submitSurveyReturned({ data: false }));
      }, 7000);
    } else {
      setOpen(false);
      setMessage(false);
    }
  }, [reducers?.surveys?.submitAnswerReturned]);

  const doSubmit = async (values) => {
    const data = {};
    data["surveyId"] = Number(id);
    data["answer"] = JSON.stringify(values);

    const language = isRTL ? "ar" : "en";
    dispatch(submitSurvey({ data, language }));
  };

  const validationSchema = Yup.object().shape({
    [name]: Yup.string().required("Required"),
  });

  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={{
          [name]: choices.length ? choices[0].value : "",
        }}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
      >
        {({ isSubmitting, submitForm }) => (
          <Form className={classes.activeFormRoot}>
            <Grid container>
              <Grid container item>
                <Field
                  component={RadioGroup}
                  name={name}
                  className="radioGroup"
                >
                  {choices.map((choice, i) => {
                    return (
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          value={choice.value}
                          control={<Radio disabled={isSubmitting} />}
                          label={
                            typeof choice.text === "string"
                              ? choice.text
                              : isRTL
                              ? choice?.text?.ar
                              : choice?.text?.default
                          }
                          disabled={isSubmitting}
                        />
                      </Grid>
                    );
                  })}
                </Field>
              </Grid>
            </Grid>
            {!homePage ? (
              <Grid item xs={12} className="btnContainer">
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  {t("PARTICIPATION.POLLS.BTNS.SUBMIT")}
                </Button>
                <Button variant="contained" onClick={handleClick}>
                  {t("PARTICIPATION.POLLS.BTNS.SHOW")}
                </Button>
              </Grid>
            ) : (
              <Grid item xs={12} className="btnContainer">
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  {t("HOME.PARTICIPATION.POLLS.VOTE")}
                </Button>
                <Link to="/participation/polls">
                  <Button variant="contained">
                    {t("HOME.PARTICIPATION.POLLS.ALL")}
                  </Button>
                </Link>
              </Grid>
            )}
          </Form>
        )}
      </Formik>
      <Dialog open={open} message={message} />
    </>
  );
}

export default memo(ActiveForm);
