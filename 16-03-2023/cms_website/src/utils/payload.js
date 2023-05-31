export const payload = (values, type) => {
  switch (type) {
    case "service/request/booking":
      return {
        title: values.eventTitle,
        orgName: values.orgName,
        startDate: values.startDate,
        endDate: values.endDate,
        roomId: values.roomId,
        facilites: values.facilites?.map((item) => item?.id),
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        phoneNumber2: values.phoneNumber2,
        needSupport: values?.needSupport?.length ? true : false,
      };
    case "replay/user":
      return {
        from: values?.from ? values?.from : "",
        to: values?.to ? values?.to : "",
        subject: values?.subject ? values?.subject : "",
        message: values?.message ? values?.message : "",
        fileIds: [values?.filesIds],
        requestId: values?.requestId ? values?.requestId : null,
      };
    case "qrcode/generate":
      return {
        text: values?.text,
      };
    default:
      break;
  }
  return { payload };
};
export default payload;
