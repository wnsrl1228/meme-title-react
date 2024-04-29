import axios from "axios";
import { BASE_URL, ERROR_CODE, HTTP_STATUS_CODE } from "../constants/api";

export const loggedInAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

loggedInAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        // 로컬 스토리지에서 엑세스 토큰을 가져와서 요청 헤더에 추가

        if (!accessToken) {
            window.location.href = "/";
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }
);
loggedInAxiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const { data, status } = error.response;
        const originalRequest = error.config;
        // 토큰이 만료된 경우
        if (status === HTTP_STATUS_CODE.BAD_REQUEST && data.code === ERROR_CODE.EXPIRED_TOKEN) {
            
            return guestAxiosInstance.get('/auth/token').then((response) => {
                // 새로운 액세스 토큰 받기
                const newAccessToken = response.data.accessToken;
            
                // 새로운 액세스 토큰을 localStorage에 저장
                localStorage.setItem('ACCESS_TOKEN', newAccessToken);
        
                // 기존 요청에 엑세스 토큰 갱신
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                console.log("originalRequest : " + originalRequest);
                return loggedInAxiosInstance(originalRequest);

            }).catch((error) => {
                console.log(error);
                localStorage.removeItem('ACCESS_TOKEN');
                window.location.href = "/";
                throw error;
            })

        }

        if (status === ERROR_CODE.INVALID_JWT_FORMAT || status === ERROR_CODE.INVALID_TOKEN) {
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.href = "/";
            throw error;
        }
        
        return Promise.reject(error);
    }
)

export const guestAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true
});