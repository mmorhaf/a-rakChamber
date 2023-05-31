import TextField from "@material-ui/core/TextField";
import { Field } from "formik";

export default function DateTimePicker(props) {
  return (
    <Field
      component={TextField}
      type="datetime-local"
      {...props}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
        min: props?.min,
      }}
    />
  );
}
