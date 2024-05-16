import axios from "axios";
import { LINK_TO_SERVER } from "src/constants";

export const updateUser = async (userId: { $oid: string; }, name: string, avatar: string, email: string, phone: string, bio: string, company: string, location: string, token: string | null) => {
  const body = {
    name,
    avatar,
    email,
    phone,
    bio,
    company,
    location
  };
  try {
    const response = await axios.put(`${LINK_TO_SERVER}/user/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};