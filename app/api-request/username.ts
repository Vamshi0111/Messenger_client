import axios from "axios";
import { origin } from "./config";

export const usernamerecoveryApi = async (data:any) => {
  try {
    const response = await axios.post(`${origin}/api/v1/emailrecovery/usernamerecoveryemail`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred' };
  }
};

export const verifyRecoveryOtpApi = async (data:any) => {
  try {
    const response = await axios.post(`${origin}/api/v1/emailrecovery/validate-otp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred' };
  }
};

export const resendOtpApi = async (data:any) => {
  try {
    const response = await axios.post(`${origin}/api/v1/emailrecovery/resend-otp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred' };
  }
};


export default usernamerecoveryApi;
