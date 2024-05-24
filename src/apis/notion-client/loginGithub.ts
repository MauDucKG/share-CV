import axios from 'axios';
import { LINK_TO_SERVER } from 'src/constants';
import CustomError from "../../routes/Error"
import { tokenQuery } from "src/libs/react-query";
import { queryKey } from 'src/constants/queryKey';

export const getTokenGithub = async (data : any) => {
  try {
    const access_token = await axios.post(`${LINK_TO_SERVER}/login/getToken`, data);
    return access_token
  } catch (error) {
    console.error('Error Get Token:', error);
    localStorage.clear();
    window.location.reload();
    return null;
  }
}

export const loginGithub = async (data: any) => {
  let BLACK_USER = {
    "_id": {
      "$oid": ""
    },
    "login": "404",
    "name": "",
    "avatar": "",
    "role": "",
    "email": null,
    "phone": "",
    "bio": "",
    "company": null,
    "location": null,
    "isRestricted": true,
    "createdTime": "",
    "__v": 0
  }

  try {
    const access_token = await getTokenGithub(data);
    if (!access_token) {
      return null;
    }

    const response = await axios.get(`${LINK_TO_SERVER}/login/getUserData`, {
      headers: {
        Authorization: `Bearer ${access_token.data}`,
      },
    });

    await tokenQuery.prefetchQuery(queryKey.token(), () => access_token.data)

    if (typeof localStorage !== "undefined" && !response.data.isRestricted) {
      localStorage.setItem("access_token", access_token.data)
      localStorage.setItem("user_data", JSON.stringify(response.data))

      // Lưu thời gian đăng nhập
      localStorage.setItem("login_time", Date.now().toString());

      window.location.href = `/`
    } else {
      BLACK_USER.login = response.data.login
      localStorage.setItem("user_data", JSON.stringify(BLACK_USER))
      localStorage.setItem("login_time", Date.now().toString());
      window.location.href = `/banned`
    }

    return response
  } catch (error) {
    console.error('Error Get Data:', error);
    localStorage.clear();
    window.location.reload();
    return null;
  }
}

