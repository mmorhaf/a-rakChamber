import { postData } from "./api";
let token = sessionStorage.getItem("supplierAuthUserSession")
  ? sessionStorage.getItem("supplierAuthUserSession")
  : null;

export const logIn = async (data) => await postData("/api/users/login", data);

export const forgotPassword = async (data) =>
  await postData("/api/users/password/forget", data);

export const resetPassword = async (data) =>
  await postData("/api/users/password/reset", data);

export const signUp = async (data) => await postData("/api/users/signUp", data);

export const userConfirm = async (data) =>
  await postData("/api/users/email/confirm", data);

export const updateUserById = async (userId, data) =>
  await postData(`/api/users/${userId}/update`, data, { token });

export const activateAccount = async (data) =>
  await postData("/api/users/code/resend/supplier", data);
