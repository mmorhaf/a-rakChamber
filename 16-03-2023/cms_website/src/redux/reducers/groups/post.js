import actions from "../../actions";
import { combineReducers } from "redux";

const {
  GET_ALL_POSTS,
  ALL_POSTS_RETURNED,
  GET_POST_BY_ID,
  POST_BY_ID_RETURNED,
  GET_POST_BY_ALIAS,
  BY_ALIAS_RETURNED,
  GET_TODAY_EVENTS,
  TODAY_EVENTS_RETURNED,
  GET_POST_VIEWERS,
  POST_VIEWERS_RETURNED,
  GET_TOP_PUBLICATIONS,
  TOP_PUBLICATIONS_RETURNED,
  // GET_ALL_PARTNERS,
  // ALL_PARTNERS_RETURNED,
  GET_POST_BY_CATEGORY,
  ALL_POSTS_BY_CATEGORY_RETURNED,
} = actions;

export const getAllPosts = (state = false, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return true;
    case ALL_POSTS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allPostsReturned = (state = false, action) => {
  switch (action.type) {
    case ALL_POSTS_RETURNED:
      if (action.data?.success) {
        if (action.data?.posts?.length) {
          const sort = action.data.posts[0].type;
          return {
            ...state,
            [sort]: action.data,
          };
        } else return state;
      } else {
        return false;
      }

    default:
      return state;
  }
};

export const getPostByCategory = (state = false, action) => {
  switch (action.type) {
    case GET_POST_BY_CATEGORY:
      return true;
    case ALL_POSTS_BY_CATEGORY_RETURNED:
      return false;
    default:
      return state;
  }
};
export const allPostByCategoryReturned = (state = false, action) => {
  switch (action.type) {
    case ALL_POSTS_BY_CATEGORY_RETURNED:
      if (action.data?.success) {
        return {
          ...state,
          ["data"]: action.data,
        };
      } else {
        return false;
      }

    default:
      return state;
  }
};
export const getTopPubli = (state = false, action) => {
  switch (action.type) {
    case GET_TOP_PUBLICATIONS:
      return true;
    case TOP_PUBLICATIONS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const topPubliReturned = (state = false, action) => {
  switch (action.type) {
    case TOP_PUBLICATIONS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getPostById = (state = false, action) => {
  switch (action.type) {
    case GET_POST_BY_ID:
      return true;
    case POST_BY_ID_RETURNED:
      return false;
    default:
      return state;
  }
};
export const postByIdReturned = (state = false, action) => {
  switch (action.type) {
    case POST_BY_ID_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getPostByAlias = (state = false, action) => {
  switch (action.type) {
    case GET_POST_BY_ALIAS:
      return true;
    case BY_ALIAS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const postByAliasReturned = (state = false, action) => {
  switch (action.type) {
    case BY_ALIAS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const getEventsOnThisDay = (state = false, action) => {
  switch (action.type) {
    case GET_TODAY_EVENTS:
      return true;
    case TODAY_EVENTS_RETURNED:
      return false;
    default:
      return state;
  }
};
export const eventsOnThisDayReturned = (state = false, action) => {
  switch (action.type) {
    case TODAY_EVENTS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

export const increaseViewrsCount = (state = false, action) => {
  switch (action.type) {
    case GET_POST_VIEWERS:
      return true;
    case POST_VIEWERS_RETURNED:
      return false;
    default:
      return state;
  }
};

export const viewerCountReturned = (state = false, action) => {
  switch (action.type) {
    case POST_VIEWERS_RETURNED:
      return action.data;
    default:
      return state;
  }
};

// export const getAllPartners = (state = false, action) => {
//   switch (action.type) {
//     case GET_ALL_PARTNERS:
//       return true;
//     case ALL_PARTNERS_RETURNED:
//       return false;
//     default:
//       return state;
//   }
// };
// export const allPartnersReturned = (state = false, action) => {
//   switch (action.type) {
//     case ALL_PARTNERS_RETURNED:
//       if (action.data.success) {
//         if (action.data.posts.length) {
//           const sort = action.data.posts[0].type;
//           return {
//             ...state,
//             [sort]: action.data,
//           };
//         } else return state;
//       } else {
//         return state;
//       }

//     default:
//       return state;
//   }
// };
export default combineReducers({
  getAllPosts,
  allPostsReturned,
  getPostById,
  postByIdReturned,
  getPostByAlias,
  postByAliasReturned,
  getEventsOnThisDay,
  eventsOnThisDayReturned,
  increaseViewrsCount,
  viewerCountReturned,
  getTopPubli,
  topPubliReturned,
  getPostByCategory,
  allPostByCategoryReturned,
  // getAllPartners,
  // allPartnersReturned,
});
