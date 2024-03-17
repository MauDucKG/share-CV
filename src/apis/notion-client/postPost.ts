import axios from "axios";
import { LINK_TO_SERVER } from "src/constants";

export const postPost = async (title: string, summary: string, image: string, content: string) => {
  const body = {
    title,
    summary,
    image,
    content,
  };
  
  try {
    const response = await axios.post(`${LINK_TO_SERVER}/post`, body);
    const { slug } = response.data;
    return slug
  } catch (error) {
    console.error(error);
  }
}