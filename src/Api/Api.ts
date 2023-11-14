/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getTokenFromLocalStorage } from "../Storage/Token.ts";

class Api {
    protected static base_url:string = 'https://codie-backend.azurewebsites.net/mobile'

    protected static post(url:string,data?:any) {
        const response = axios.post(this.base_url+url,data,{
            headers:{
                'Authorization': 'Bearer ' + getTokenFromLocalStorage()
            }
        })
        return response
    }
}

export default Api;