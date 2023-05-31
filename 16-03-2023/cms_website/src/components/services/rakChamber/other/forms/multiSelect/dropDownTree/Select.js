import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Field } from "formik";
import { Select } from "formik-material-ui";
import { useSelector } from "react-redux";

export default function CustomSelect(props) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  return (
    <FormControl>
      <InputLabel>{props.label}</InputLabel>
      <Field
        component={Select}
        name={props.name}
        variant={props.variant}
        value={props.value}
        className={props.className}
        multiple={props.multiple}
        onChange={props.onChange}
        input={props.input}
        native={props.native}
        inputProps={props.inputProps}
        renderValue={props.renderValue}
        disabled={props.disabled}
        MenuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: isRTL ? "right" : "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {props.menuItems &&
          props.menuItems.map((selectedValue, index) => {
            return (
              <MenuItem value={props.selectingValues[index]} key={index}>
                {selectedValue}
              </MenuItem>
            );
          })}
      </Field>
    </FormControl>
  );
}
