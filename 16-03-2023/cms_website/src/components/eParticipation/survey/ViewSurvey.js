import React from "react";
import { Formik } from "formik";
import ViewEnglishQuestion from "./ViewEnglishQuestion";

export default function SurveyQuestions({ id }) {
  return (
    <Formik enableReinitialize>
      {(formik) => (
        <div>
          <ViewEnglishQuestion formik={formik} id={id} />
        </div>
      )}
    </Formik>
  );
}
