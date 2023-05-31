export const initialValues = (type) => {
  switch (type) {
    case "reservation":
      return {
        eventTitle: "",
        startDate: null,
        endDate: null,
        facilites: [],
        name: "",
        email: "",
        phoneNumber: "",
        phoneNumber2: "",
        roomId: null,
        needSupport: [],
      };
    default:
      break;
  }
};
export default initialValues;
