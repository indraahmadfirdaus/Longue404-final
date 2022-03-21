import axios from "axios";
import { baseUrl } from "./config";

export const getLoggedUser = async (token) => {
  let result;
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/user`, {
      headers: { access_token: token },
    });

    result = data;
  } catch (error) {
    console.log(error.response);
    result = error.response;
  }

  return result;
};
