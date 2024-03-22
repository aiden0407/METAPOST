//API
import axios from "axios";

export const loginByEmail = async function (email, password) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/sign-in`,
      method: "POST",
      data: {
        uid: email,
        password: password,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const loginByWallet = async function (walletAdress) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/wallet-sign-in`,
      method: "POST",
      data: {
        wallet_address: walletAdress,
      },
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const findPassword = async function (email) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/reset-password/${email}`,
      method: "GET",
    };
    const response = await axios(options);
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
};
