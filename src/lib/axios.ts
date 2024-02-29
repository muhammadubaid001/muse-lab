

import axios from "axios";
const BASE_URL =process.env.NEXT_PUBLIC_API_URL
export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});
export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
});





//
//
//
// import axios from "axios"
// import { getCookie } from 'cookies-next'
//
//
// const API_DOMAIN = process.env.NEXT_APP_API_URL || ""
//
// console.log(API_DOMAIN)
//
// const axiosInstance = axios.create({
//     baseURL: API_DOMAIN,
// })
//
// axiosInstance.interceptors.response.use(
//     response => {
//         const env = process.env.NEXT_APP_ENVIRONMENT
//         const token = getCookie(env === 'dev' ? "next-auth.session-token" : "__Secure-next-auth.session-token");
//         response.headers.Authorization = `Bearer ${token}`;
//
//         return response
//     },
//     error => {
//         const status = error?.response?.status
//         const message = error?.response?.data
//
//
//         return Promise.reject(error)
//     },
// )
//
// export default axiosInstance
