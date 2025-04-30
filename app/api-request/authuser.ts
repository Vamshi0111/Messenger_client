import axios from "axios";
import { origin } from "./config";

export const authuserApi = async (data: any) => {

  console.log(data);
  
  const newData = JSON.stringify(data);
  try {
    const response = await axios({
      method: 'POST',
      url: `${origin}/api/v1/auth/login`,
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
