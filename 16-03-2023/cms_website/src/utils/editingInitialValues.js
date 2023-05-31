export const editingInitialValues = (type, data) => {
  switch (type) {
    case "reservation":
      return {
        title: data.title ? data.title : "",
        startDate: data.startDate ? data.startDate : null,
        endDate: data.endDate ? data.endDate : null,
        room: data.roomId ? data.roomId : null,
      };
    default:
      break;
  }
};
