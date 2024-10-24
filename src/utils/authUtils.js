import React from 'react'
import axios from 'axios'


export const register  = async() => {
    try {
        const response = await axios.post(`localhost:8080/register`);
        console.log(response.data)
    }
    catch {
        console.log("Error")
        throw new Error("Authentication failed");
    }
}

export const login = async()=>{
    try {
        const response=await axios.post(`localhost:8080/login`)
    } catch (error) {
        console.log("Error")
        throw new Error("Authentication failed");
    }
}

