import axios from "axios";
import { origin, userCookie } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const feedbackapi = async (data:any) =>{
    const token = await AsyncStorage.getItem(userCookie)
    console.log(token);
    const newData = JSON.stringify(data)
    try {
        const response = await axios(
            {
                method:'post',
                url:`${origin}/api/v1/feedback/feedbacks`,
                headers:
                {
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                },
                data: newData
            }
            ) 
        const responseData = await response.data
        return responseData
    } catch (error:any) {
     return error.response.data   
    }
}
