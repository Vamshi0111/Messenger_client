import axios from "axios";
import { origin } from "./config";

export const AddfriendApi = async (data: any) => {
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'get',
      url: `${origin}/api/v1/Addfriend/username`,
      headers: {
        "Content-Type": "application/json",
      },
      data: newData,
    });
    
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
