import { postData, fetchData } from "./api";

export const getAllPosts = async (
  type,
  isFeatured,
  language,
  categoryId,
  limit,
  offset,
  order
) =>
  await fetchData(
    "/api/post",
    {
      type,
      isFeatured,
      limit: limit ? limit : 100,
      offset: offset ? offset : 0,
      categoryId: categoryId ? categoryId : null,
      order: order ? order : "ASC",
    },
    { language }
  );

export const getAllPostsByCategory = async (data, language) =>
  await fetchData(
    "/api/post",
    {
      ...data,
    },
    { language }
  );

export const getPostById = async (id, language) =>
  await fetchData(`/api/post/${id}`, null, { language });

export const getPostByAlias = async (alias, language) =>
  await fetchData(`/api/post/${alias}`, null, { language });

export const getPostComments = async (id) =>
  await fetchData(`/api/post/${id}/comments`);

export const getThisdayEvents = async (language) =>
  await fetchData("/api/post/eventsOnThisDay", null, { language });

export const increasePostViewers = async (id) =>
  await postData(`/api/post/${id}/view/increase`, null, null);

export const fetchTopPublications = async (language) =>
  await fetchData(`/api/post/top/publication`, null, { language });

// export const getAllPartners = async (language) =>
//   await fetchData("/api/post/partner/categories", { language });
