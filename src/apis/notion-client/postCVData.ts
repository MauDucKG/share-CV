import axios from "axios";
import { LINK_TO_SERVER } from "src/constants";

export const postCVData = async (fullName: string, major: string, cvText: string) => {
  const body = {
    fullName: fullName,
    major: major,
    cvText: cvText
  };

  try {
    const response = await axios.post(`${LINK_TO_SERVER}/cv`, body);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
