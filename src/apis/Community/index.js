//API
import axios from 'axios';

export const getCommunityList = async function (accessToken) {
  try {
    let options = {
      url: `${process.env.REACT_APP_API_HOST}/community/user`,
      method: 'POST',
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