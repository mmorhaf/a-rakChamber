import moment from "moment";
import * as Yup from "yup";

export const customRegex = {
  fqdnRegex:
    /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.){2,}([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]){2,}$/,
  filesExtensionsRegex: /^(jpg|JPG|gif|GIF|doc|DOC|pdf|PDF|JPEG|jpeg|PNG|png)$/,
  englishLangRegex: /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/,
  arabicLangRegex: /[\u0600-\u06FF]/,
  urlRegex: /^(ftp|http|https):\/\/[^ "]+$/,
  noWhiteSpacesRegex: /^(\S+$)/,
};
export const validationSchema = (type) => {
  switch (type) {
    case "reservation":
      return Yup.object({
        eventTitle: Yup.string()
          .required("Required")
          .test("validLang", "Not in the right Language", (value) =>
            customRegex.englishLangRegex.test(value)
          ),
        name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid Email Format").required("Required"),
        phoneNumber: Yup.string()
          .test(
            "len",
            "Required",

            (val) => val && val.length > 8
          )
          .nullable(),
        startDate: Yup.array().when("endDate", (endDate, schema) => {
          if (endDate) {
            return schema.max(moment(endDate), "Should Be Before End Date");
          } else {
            return schema;
          }
        }),
      });
    default:
      break;
  }
};
