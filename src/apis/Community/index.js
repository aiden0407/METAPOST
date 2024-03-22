//API
import axios from "axios";

export const getMyCommunityList = async function (accessToken) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/user`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getCommunityRanking = async function (offset) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/ranking`,
      method: "POST",
      data: {
        offset: offset,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getCommunityInfo = async function (
  accessToken,
  communityId,
  type,
  offset
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/info`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        community_id: communityId,
        tap_type: type,
        offset: offset,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getCommunityDetail = async function (accessToken, communityId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/detail`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        community_id: communityId,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const postCommunityJoin = async function (accessToken, communityId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/join`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        community_id: communityId,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const postCommunityLeave = async function (accessToken, communityId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/leave`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        community_id: communityId,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const postCommunityVerification = async function (
  accessToken,
  communityId
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/verify`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        community_id: communityId,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const createCommunity = async function (
  accessToken,
  name,
  description,
  logo,
  banner
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        title: name,
        description: description,
        logo_url: logo,
        banner_url: banner,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const editCommunity = async function (
  accessToken,
  communityId,
  name,
  description,
  logo,
  banner
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/update`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        community_id: communityId,
        title: name,
        description: description,
        logo_url: logo,
        banner_url: banner,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};
