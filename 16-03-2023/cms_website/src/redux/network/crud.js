import { fetchData, postData } from "./api";
const localToken = localStorage.getItem("authUser");
const sessionToken = sessionStorage.getItem("supplierAuthUserSession");
const token = localToken ? localToken : sessionToken ? sessionToken : null;

export const getAll = async (
  sort,
  subSort,
  categoryId,
  supplierToken,
  field,
  language,
  limit,
  offset
) =>
  await fetchData(
    `/api/${sort}`,
    {
      type: subSort ? subSort : null,
      categoryId: categoryId ? categoryId : null,
      field: field ? field : "",
      limit: limit ? limit : 100,
      offset: offset ? offset : 0,
    },
    {
      token: supplierToken ? sessionToken : token,
      language: language ? language : "all",
    }
  );

export const getAllAb = async (
  sort,
  subSort,
  entity,
  limit,
  offset,
  language
) =>
  await fetchData(
    `/api/${sort}`,
    {
      type: subSort ? subSort : null,
      subType: entity ? entity : null,
      limit: limit ? limit : 100,
      offset: offset ? offset : 0,
    },
    {
      token,
      language: language ? language : null,
    }
  );

export const getById = async (sort, id) =>
  await fetchData(`/api/${sort}/${id}`, null, { token });
  
  export const getData = async (data, sort) =>
  await fetchData(`/api/${sort}`, data, null);

export const getReservations = async (sort, id) =>
  await fetchData(`/api/${sort}`, { id: id });

export const getAllPartners = async (language) =>
  await fetchData("/api/post/partner/categories", { language });

export const createNew = async (sort, data) => {
  return await postData(
    `/api/${sort}`,
    data,
    { token },
    {
      timeOffset: new Date().getTimezoneOffset(),
    }
  );
};
export const getNotifications = async (sort, limit, offset) =>
  await fetchData(
    `/api/${sort}`,
    {
      limit: limit ? limit : 100,
      offset: offset ? offset : 0,
    },
    {
      token: sessionToken,
    }
  );
export const getSupplierRequestNotes = async (id) =>
  await fetchData(`/api/service/request/${id}/note`, null, {
    token: sessionToken,
  });

export const addSupplierRequestNote = async (data) =>
  await postData(`/api/service/request/${data.id}/note`, data.body, {
    token: sessionToken,
  });
