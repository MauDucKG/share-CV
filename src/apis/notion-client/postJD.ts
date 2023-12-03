import axios from "axios";
import { LINK_TO_SERVER } from "src/constants";

export const postJD = async (email: string, position: string, jdText: string) => {
  const body = {
    email,
    position,
    jdText
  };

  try {
    await axios.post(`${LINK_TO_SERVER}/jd`, body);
  } catch (error) {
    console.error(error);
  }
}
