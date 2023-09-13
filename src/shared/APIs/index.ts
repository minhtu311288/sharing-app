import axios, { AxiosRequestConfig } from 'axios'
const HOST = 'http://localhost:3001'
// POST
export const CallAPIPOST = (url: string, request: any, optional?: AxiosRequestConfig<any> | undefined) => {
    const response = axios.post(HOST + url, request, optional)
        .then(function (response: { status: number; data: any }) {
            if (response.status != 200) return
            return response.data
        })
        .catch(function (error: any) {
            console.log("error ", error)
            return error
        })
    return response
}

// GET
export const CallAPIGET = (url: string, header: AxiosRequestConfig<any> | undefined) => {
    const response = axios.get(HOST + url, header)
        .then(function (response: { status: number; data: any }) {
            if (response.status != 200) return
            return response.data
        })
        .catch(function (error: any) {
            console.log("error ", error)
            return error
        })
    return response
}