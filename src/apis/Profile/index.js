//API
import axios from 'axios';

export const getMyProfileData = async function (accessToken) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/user`,
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      },
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response.data;
  }
}

export const getUserProfileData = async function (profileId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/user/${profileId}`,
      method: 'GET',
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response.data;
  }
}

export const editUserData = async function (accessToken, email, password, userName, walletAdress, nftId, description) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/user`,
      method: 'PUT',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      },
      data: {
        uid: email,
        password: password,
        nickname: userName,
        wallet_address: walletAdress,
        nft_id: nftId,
        description: description,
      },
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response.data;
  }
}