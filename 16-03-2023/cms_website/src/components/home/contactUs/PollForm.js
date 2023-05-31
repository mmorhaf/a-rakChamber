import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../redux/actions";
import { FormControlLabel, Radio, Button } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import { RadioGroup } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import useStyles from "../../../styles/components/eParticipation/polls/activeForm";

const { submitSurvey } = actions;

function ActiveForm({ item: { id, name, choices } }) {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const dispatch = useDispatch();

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
    <Formik
      initialValues={{
        [name]: choices.length ? choices[0].value : "",
      }}
      validationSchema={validationSchema}
      onSubmit={doSubmit}
    >
      {({ isSubmitting, submitForm }) => (
        <Form
          className={classes.activeFormRoot}
          style={{ height: "calc(100% - 70px)" }}
        >
          <Grid container>
            <Grid container item>
              <Field component={RadioGroup} name={name} className="radioGroup">
                {choices.map((choice, i) => {
                  return (
                    <Grid item xs={12} lg={6}>
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
          <Grid
            item
            xs={12}
            className="btnContainer"
            style={{
              position: "absolute",
              top: "unset",
              bottom: 0,
              marginBottom: 6,
            }}
          >
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
        </Form>
      )}
    </Formik>
  );
}

export default memo(ActiveForm);
