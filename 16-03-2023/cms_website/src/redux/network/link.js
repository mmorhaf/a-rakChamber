import { fetchData } from "./api";

export const getAllLinks = async (language) =>
  await fetchData(
    `/api/link`,
    {},
    {
      language: language ? language : null,
    }
  );
