import axios from "axios";
import { LINK_TO_SERVER } from "src/constants";
import { TUser } from "src/types";

export const postCVData = async (fullName: string, major: string, cvText: string, userdata: TUser) => {
  const body = {
    fullName: fullName,
    major: major,
    cvText: cvText,
    userdata
  };
  
  try {
    const response = await axios.post(`${LINK_TO_SERVER}/cv`, body);
    const { slug } = response.data;
    return slug
  } catch (error) {
    console.error(error);
  }
}
