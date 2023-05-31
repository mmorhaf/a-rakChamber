import { fetchData, postData } from "./api";
let lang = localStorage.getItem("lang");

export const getCategories = async (type, subType, isFeatured, language) =>
  await fetchData(
    `/api/category`,
    {
      type: type ? type : null,
      subType: subType ? subType : null,
      isFeatured: isFeatured ? isFeatured : null,
    },
    {
      language,
    }
  );

export const getCategoryById = async (id, language) =>
  await fetchData(`/api/category/${id}`, null, { language });

export const getCategoryByAlias = async (alias, language) =>
  await fetchData(`/api/category/${alias}`, null, { language });

export const getCategoryTreeByAlias = async (alias) =>
  await fetchData(`/api/category/${alias}/tree`, null, null);
