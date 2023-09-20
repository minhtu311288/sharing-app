import axios, { AxiosRequestConfig } from 'axios'
const API_URL = 'https://sharing-app-server.vercel.app'
// POST
export const CallAPIPOST = (url: string, request: any, optional?: AxiosRequestConfig<any> | undefined) => {
    const response = axios.post(API_URL + url, request, optional)
        .then(function (response: { status: number; data: any }) {
            if (response.status !== 200) return
            return response.data
        })
        .catch(function (error: any) {
            return error
        })
    return response
}

// GET
export const CallAPIGET = (url: string, header: AxiosRequestConfig<any> | undefined) => {
    const response = axios.get(API_URL + url, header)
        .then(function (response: { status: number; data: any }) {
            if (response.status !== 200) return
            return response.data
        })
        .catch(function (error: any) {
            console.log("error ", error)
            return error
        })
    return response
}