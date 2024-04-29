import axios from 'axios';
import { LINK_TO_SERVER } from 'src/constants';

export const getBlogMap = async (pageId: string) => {
  try {
    if (pageId === "about") return null;
    const response = await axios.get(`${LINK_TO_SERVER}/postitem/${pageId}`);
    const recordMap = response.data.detail;
    return recordMap;
  } catch (error) {
    console.error('Error fetching blog map:', error);
    return null;
  }
}
