import actions from "../../actions";
import { combineReducers } from "redux";

const {
  UPLOAD_FILE_ACTION,
  UPLOAD_FILE_RETURNED,
  FILE_CREATED,
  DELETE_FILE_ACTION,
  FILE_DELETED,
  DOWNLOAD_FILE,
  FILE_DOWNLOADED,
  READ_FILE_ACTION,
  READ_COMPLETED,
  DOWNLOAD_COUNT,
  DOWNLOAD_COUNT_COMPLETED,
} = actions;

export const uploadFile = (state = false, action) => {
  switch (action.type) {
    case UPLOAD_FILE_ACTION:
      return true;
    case FILE_CREATED:
      return false;
    default:
      return state;
  }
};

export const uploadFileReturned = (state = false, action) => {
  switch (action.type) {
    case UPLOAD_FILE_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const fileCreated = (state = false, action) => {
  switch (action.type) {
    case FILE_CREATED:
      return action.response;
    case FILE_DELETED:
      return false;
    default:
      return state;
  }
};

export const deleteFile = (state = false, action) => {
  switch (action.type) {
    case DELETE_FILE_ACTION:
      return true;
    case FILE_DELETED:
      return false;
    default:
      return state;
  }
};

export const fileDeleted = (state = false, action) => {
  switch (action.type) {
    case FILE_DELETED:
      return action.response;
    default:
      return state;
  }
};

export const downloadFile = (state = false, action) => {
  switch (action.type) {
    case DOWNLOAD_FILE:
      return true;
    case FILE_DOWNLOADED:
      return false;

    default:
      return state;
  }
};
export const downloadedFiles = (state = [], action) => {
  switch (action.type) {
    case FILE_DOWNLOADED:
      return action.response;

    default:
      return state;
  }
};

export const readCounter = (state = false, action) => {
  switch (action.type) {
    case READ_FILE_ACTION:
      return true;
    case READ_COMPLETED:
      return false;
    default:
      return state;
  }
};

export const readCompleted = (state = false, action) => {
  switch (action.type) {
    case READ_COMPLETED:
      return action.response;
    default:
      return state;
  }
};

export const downloadCounter = (state = false, action) => {
  switch (action.type) {
    case DOWNLOAD_COUNT:
      return true;
    case DOWNLOAD_COUNT_COMPLETED:
      return false;
    default:
      return state;
  }
};

export const downloadCountCompleted = (state = false, action) => {
  switch (action.type) {
    case DOWNLOAD_COUNT_COMPLETED:
      return action.response;
    default:
      return state;
  }
};

export default combineReducers({
  uploadFile,
  uploadFileReturned,
  fileCreated,
  deleteFile,
  fileDeleted,
  downloadFile,
  downloadedFiles,
  readCounter,
  readCompleted,
  downloadCounter,
  downloadCountCompleted,
});
