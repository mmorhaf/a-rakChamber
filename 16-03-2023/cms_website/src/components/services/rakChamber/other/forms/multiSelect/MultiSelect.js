import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Field } from "formik";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Typography from "@material-ui/core/Typography";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags(props) {
  const [parents, setParents] = useState([]);
  const [facilitiesArray, setFacilitiesArray] = useState([]);
  const reducers = useSelector((state) => state);

  let formik = props.formik;
  return props.options ? (
    <Field
      component={Autocomplete}
      disabled={props.disabled}
      multiple
      options={props.options}
      freeSolo
      name={props.name}
      value={facilitiesArray}
      className={props.className}
      onChange={(event, value) => {
        setFacilitiesArray(value);
      }}
      filterSelectedOptions={true}
      getOptionLabel={(option) =>
        option.title && option.title?.en ? option.title?.en : option.title?.ar
      }
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ color: "#1f627f" }}
            checked={selected}
          />
          {option.title.en ? option.title.en : option.title.ar}
        </React.Fragment>
      )}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  ) : (
    <Typography
      style={{
        height: 45,
        color: "#979797",
        fontSize: 14,
        padding: 15,
        backgroundColor: "#f3f3f3",
      }}
    >
      There is no Facilities for this Venue
    </Typography>
  );
}
