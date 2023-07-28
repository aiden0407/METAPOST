//API
import axios from 'axios';

export const getUserData = async function (accessToken) {
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

export const editUserData = async function (accessToken, email, password, userName, walletAdress, nftId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/user`,
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      },
      data: {
        uid: email,
        password: password,
        nickname: userName,
        wallet_adress: walletAdress,
        nft_id: nftId
      },
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response.data;
  }
}