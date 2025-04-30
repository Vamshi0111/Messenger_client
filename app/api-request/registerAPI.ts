// // / eslint-disable @typescript-eslint/no-explicit-any /
// // / eslint-disable @typescript-eslint/no-explicit-any /
// import axios from "axios";
// import { origin } from "./config";

// export const registerApi = async (data: any) =>{
//     const newData = JSON.stringify(data)
//     try {
//         const response = await axios(
//             {
//                 method:'post',
//                 url:`${origin}/api/v1/users`,
//                 headers:{
//                     "Content-Type":"application/json"
//                 },
//                 data: newData
//             }
//         ) 
//         const responseData = await response.data
//         return responseData
//     } catch (error:any) {
//      return error.response.data   
//     }
// }
// export const getCrudData = async () => {
//     try{
//         const response = await axios(
//             {
//                 method: 'get',
//                 url: `${config.API_DOMAIN_URL}/api/v1/crud`,
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//         )
//         const responseData = await response.data
//         return responseData;
//     }
//     catch(error:any) {
//         return error.response.data;
//     }
// }
// export const editCrudData = async (data:any, id:number) => {
//     const newData = JSON.stringify(data);
//     try {
//         const response = await axios({
//             method: 'patch',
//             url: `${config.API_DOMAIN_URL}/api/v1/crud/${id}`,
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             data: newData
//         })
//         const responseData = await response.data
//         return responseData;

//     } catch (error:any) {
//         return error.response.data;
//     }
// }


import axios from 'axios';
import { origin } from './config';

export const createUser = async (userData: {
    user_name: string;
    name: string;
    phone: string;
    password: string;
    email: string;
    date_of_birth: string;
}) => {
    try {
        const response = await axios.post(`${origin}/api/v1/users`, userData);
        return response.data;
    } catch (error: any) {
        console.error('Error creating user:', error.response?.data || error.message);
        throw error;
    }
};
