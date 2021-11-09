import axios, {AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const httpClient = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

//Intercept Outgoing request
const getAuthToken = () => localStorage.getItem('auction.token');
const authInterceptor = (config: AxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${getAuthToken()}`;
    return config;
}
httpClient.interceptors.request.use(authInterceptor);

//Intercept Incoming response
const responseInterceptor = (response: AxiosResponse) => {
    //TODO: Handle success response
    return response;
}
const errorInterceptor = (error: any) => {
    //TODO: Handle error response
    //If status is not 422, handle here
    //status = error.response.status -> 500, 401 etc

    return Promise.reject(error);
}
httpClient.interceptors.response.use(
    responseInterceptor,
    errorInterceptor
);

export default httpClient;