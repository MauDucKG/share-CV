import axios from "axios";
import { LINK_TO_SERVER } from "src/constants";
import { TUser } from "src/types";

export const postPost = async (title: string, summary: string, content: string, thumbnail: string, userdata: TUser) => {
  const body = {
    title,
    summary,
    content,
    thumbnail,
    userdata
  };
  
  try {
    const response = await axios.post(`${LINK_TO_SERVER}/post`, body);
    const {slug} = response.data;
    return slug
  } catch (error) {
    console.error(error);
  }
}
