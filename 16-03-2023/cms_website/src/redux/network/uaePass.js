import {
  BASE_URL,
  UAE_PASS_CLIENT_ID,
  UAE_PASS_CLIENT_SECRET,
  REDIRECT_URL,
} from "../../constants/constant";

import { postData, getRAKData, postRAKData } from "./api";

export const getAccessToken2 = async (data) =>
  await postData(`/api/uaepass/token`, data, null);

export const getAccessToken = async (code) => {
  var base64 = require("base-64");

  return fetch(
    `${BASE_URL}/idshub/token?grant_type=authorization_code&redirect_uri=${REDIRECT_URL}&code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Basic " +
          base64.encode(`${UAE_PASS_CLIENT_ID}:${UAE_PASS_CLIENT_SECRET}`),
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      return { networkSuccess: true, ...response };
    })
    .catch((e) => {
      return { networkSuccess: false };
    });
};

export const getUaepassProfile2 = async (data) =>
  await postData(`/api/uaepass/info`, data, null);

export const getUaepassProfile = async (token) => {
  return fetch(`${BASE_URL}/idshub/userinfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .catch((e) => {
      return { networkSuccess: false };
    });
};

export const uaePassLogin = async (data) =>
  await getRAKData(`eservice_uaepeass/login`, data);

export const uaePassPerson = async (data) =>
  await getRAKData(`eservice_uaepeass/uaepass_person`);

export const uaePassPersonData = async (data) =>
  await postRAKData("POST", `eservice_uaepeass/uaepass_person`, data, null);

export const uaePassLogout = async () => {
  return fetch(`${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .catch((e) => {
      return { networkSuccess: false };
    });
};
