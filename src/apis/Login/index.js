//API
import axios from 'axios';

export const loginByEmail = async function (email, password) {
    try {
        let options = {
            url: `${process.env.REACT_APP_API_HOST}/sign-in`,
            method: 'POST',
            data: {
                uid: email,
                password: password,
            }
        }
        const response = await axios(options);
        return response;
        
    } catch (error) {
        throw error.response.data;
    }
}

export const loginByWallet = async function (nickname, walletAdress, nftId) {
    try {
        let options = {
            url: `${process.env.REACT_APP_API_HOST}/wallet-sign-in`,
            method: 'POST',
            data: {
                nickname: nickname,
                wallet_adress: walletAdress,
                nft_id: nftId
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response.data;
    }
}