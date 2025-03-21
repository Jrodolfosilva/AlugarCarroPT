'use server'

import { LoginUserType } from "@/utils/types"
import { baseURL } from "./config"


export async function Auth(user:LoginUserType){

    try {
        const login = await fetch(`${baseURL}user/login/`,{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)

        })

        const response = await login.json()

        return response


    } catch (error) {
        
        return error
    }    
}

