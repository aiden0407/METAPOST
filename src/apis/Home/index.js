//API
import axios from "axios";

export const getMainPost = async function (type, offset) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/post`,
      method: "POST",
      data: {
        tap_type: type,
        type: "normal",
        offset: offset,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getMainPostLength = async function (type) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/post-count?type=normal&tap_type=${type}`,
      method: "GET",
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getPostDetail = async function (postId, offset) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/post/detail`,
      method: "POST",
      data: {
        post_id: postId,
        offset: offset,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const uploadImage = async function (accessToken, model, file) {
  const formData = new FormData();
  formData.append("model", model);
  formData.append("file", file);

  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/s3-upload`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    console.log(options);
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const writePost = async function (
  accessToken,
  communityId,
  type,
  title,
  description
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/post/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        community_id: communityId,
        type: type,
        title: title,
        description: description,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const editPost = async function (
  accessToken,
  postId,
  type,
  title,
  description
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/post/update`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        post_id: postId,
        type: type,
        title: title,
        description: description,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const likedPost = async function (accessToken, postId, liked) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/post/reaction`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        post_id: postId,
        liked: liked,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const postComment = async function (
  accessToken,
  postId,
  commentId,
  text,
  mediaUrl
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/comment/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        post_id: postId,
        comment_id: commentId,
        text: text,
        media_url: mediaUrl,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const likedComment = async function (accessToken, commentId, liked) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/comment/like`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        comment_id: commentId,
        liked: liked,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const reportContents = async function (
  accessToken,
  title,
  description,
  refernceId,
  refernceType
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/report`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        title: title,
        description: description,
        refernce_id: refernceId,
        refernce_type: refernceType,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const searchContents = async function (text, type) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/search`,
      method: "POST",
      data: {
        search_text: text,
        tap_type: type,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};
