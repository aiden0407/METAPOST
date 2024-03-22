//API
import axios from "axios";

export const emailAuthSend = async function (email) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/send-auth-email/${email}`,
      method: "GET",
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const emailAuthCheck = async function (email, confirmCode) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/email-auth`,
      method: "POST",
      data: {
        email: email,
        code: confirmCode,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const userNameCheck = async function (userName) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/has-nickname/${userName}`,
      method: "GET",
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const registerByEmail = async function (
  email,
  password,
  userName,
  walletAdress,
  nftId
) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/sign-up`,
      method: "POST",
      data: {
        uid: email,
        password: password,
        nickname: userName,
        wallet_address: walletAdress,
        nft_id: nftId,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const nftCheckByWallet = async function (walletAdress) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/get-nfts/${walletAdress}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "frontend-api-token": `0Iv6jCZBHf0ps0cmAOWyfeAehwniLFWe-9oybqHqEVxgaHP4JrGJV5ISirR0EhYQSS4i3o2jq-OQPFTrmv05XA`,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const registerByWallet = async function (walletAdress, userName, nftId) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/wallet-sign-up`,
      method: "POST",
      data: {
        nickname: userName,
        wallet_address: walletAdress,
        nft_id: nftId,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};
