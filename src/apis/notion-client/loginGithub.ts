import axios from "axios";
import { useState } from "react";
import { LINK_TO_SERVER, DATA_USER } from "src/constants";

export const loginGithub = async () => {
  let utterancesParam
  let response = DATA_USER
  if (typeof localStorage !== "undefined" && localStorage.getItem("utterances-session")) {
    utterancesParam = localStorage.getItem("utterances-session")
  }
  const data = {
    "data": utterancesParam
  }
  
  try {
    const access_token = await axios.post(`${LINK_TO_SERVER}/getToken`, data);

    const infoResponse = await axios.get(`${LINK_TO_SERVER}/getUserData`, {
      headers: {
        Authorization: `Bearer ${access_token.data}`,
      },
    });
    response = infoResponse.data
    return response;
  } catch (error) {
    console.error(error);
  }
}
