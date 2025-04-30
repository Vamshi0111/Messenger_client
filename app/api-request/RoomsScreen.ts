
import axios from "axios";
import {origin, userCookie} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createAnRoomApi = async (data:any) =>{
    const token = await AsyncStorage.getItem(userCookie)
    console.log(token);
    const newData = JSON.stringify(data)
    try {
        const response = await axios(
            {
                method:'post',
                url:`${origin}/api/v1/rooms/roomscreen`,
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

export const fetchRoomData = async () =>{

    const token = await AsyncStorage.getItem(userCookie)

    console.log(token);
    
    try {
        const response = await axios(
            {
                method:'GET',
                url:`${origin}/api/v1/rooms`,
                headers:
                {
                    "Content-Type":"application/json",
                    'Authorization':`Bearer ${token}`
                },
            }  
        );
        const responseData = await response.data
        return responseData
    } catch (error:any) {
     return error.response.data   
    }
}
export const editRoomApi = async (data:any, id:number) => {
    const token = await AsyncStorage.getItem(userCookie);
    console.log(token)
    const newData = JSON.stringify(data);
    try {
        const response = await axios({
            method: 'patch',
            url: `${origin}/api/v1/MessengerApp/${id}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }, 
            data: newData
        })
        const responseData = await response.data
        return responseData;

    } catch (error:any) {
        return error.response.data;
    }
}

