import { postData, fetchBinaryData } from "./api";
import axios from "axios";

// const token = localStorage.getItem("authUser");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIxMDI1MjM1LCJleHAiOjE2MjExMTE2MzUsImF1ZCI6ImNvbS5pbmZvc3RyYXRlZ2ljLnJhazIiLCJpc3MiOiJjb20uaW5mb3N0cmF0ZWdpYy5yYWsyIn0.ouMDuhCp7QJ8uSJMcCgrEYGsIrJkfITFyCnqMc87c00";

export const uploadFile = async (data) => {
  const key = data.get("fileKey") || "";
  try {
    return await axios.post(`/api/file/upload?key=${key}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    return false;
  }
};

export const createFile = async (data) =>
  await postData(`/api/file`, data, null);

export const deleteFile = async (id) =>
  await postData(`/api/file/${id}/delete`, null, { token });

export const downloadFile = async (uuid) =>
  await fetchBinaryData(`/api/file/download/${uuid}`, null, { token });

export const readCounter = async (id) =>
  await postData(`/api/file/${id}/count/read`);

export const downloadCounter = async (id) =>
  await postData(`/api/file/${id}/count/download`);
