//API
import axios from 'axios';

export const emailAuthSend = async function (email) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/?email=${email}`,
      method: 'GET',
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response;
  }
}

export const emailAuthCheck = async function (email, confirmCode) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/?email=${email}&confirm_code=${confirmCode}`,
      method: 'GET',
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response;
  }
}

export const userNameCheck = async function (userName) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/?user_name=${userName}`,
      method: 'GET',
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response;
  }
}

export const registerByEmail = async function (email, password, walletAdress, userName, nftId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/?email=${email}&password=${password}&wallet_adress=${walletAdress}&user_name=${userName}&nft_id=${nftId}`,
      method: 'GET',
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response;
  }
}

export const registerByWallet = async function (walletAdress, userName, nftId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/?wallet_adress=${walletAdress}&user_name=${userName}&nft_id=${nftId}`,
      method: 'GET',
    }
    const response = await axios(options);
    return response;

  } catch (error) {
    throw error.response;
  }
}