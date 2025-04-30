// // // import axios from "axios";
// // // import { origin } from './config';

// // // export const otpApi = async (data: any) => {
// // //   const newData = JSON.stringify(data);
// // //   try {
// // //     const response = await axios({
// // //       method: 'post',
// // //       url: `${origin}/api/v1/otp/otpgen`,
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       data: newData,
// // //     });
    
// // //     return response.data;
// // //   } catch (error: any) {
// // //     return error.response.data;
// // //   }
// // // };





// import axios from "axios";
// import { origin } from "./config";

// export const otpApi = async (data:any) => {
//   try {
//     const response = await axios.post(`${origin}/api/v1/otp/otpgen`, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return { success: false, message: error.response?.data?.message || 'An error occurred' };
//   }
// };
// export const otpValidateApi = async (data:any) => {
//   try {
//     const response = await axios.post(`${origin}/api/v1/otp/validate-otp`, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return { success: false, message: error.response?.data?.message || 'An error occurred' };
//   }
// };
// export default otpApi;

import axios from "axios";
import { origin } from "./config";

export const otpApi = async (data:any) => {
  try {
    const response = await axios.post(`${origin}/api/v1/otp/otpgen`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred' };
  }
};
export const otpValidateApi = async (data:any) => {
  try {
    const response = await axios.post(`${origin}/api/v1/otp/validate-otp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred' };
  }
};
export const otpResendApi = async (data:any) => {
  try {
    const response = await axios.post(`${origin}/api/v1/otp/resend-otp`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error:any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred' };
  }
};
export default otpApi;

