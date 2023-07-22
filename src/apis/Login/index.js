//API
import axios from 'axios';

export const loginByEmail = async function (email, password) {
    try {
        let options = {
            url: `${process.env.REACT_APP_API_HOST}/?email=${email}&password=${password}`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;
        
    } catch (error) {
        throw error.response;
    }
}

export const loginByWallet = async function (walletAdress) {
    try {
        let options = {
            url: `${process.env.REACT_APP_API_HOST}/?wallet_adress=${walletAdress}`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}