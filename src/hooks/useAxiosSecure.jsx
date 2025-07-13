import axiosInstance from "../api/axiosInstance";
import { useAuth } from "./useAuth";

const useAxiosSecure = () => {
    const { user, loading } = useAuth()

    if (!user && loading) return null;

    axiosInstance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${user?.accessToken}`;
        return config;
    });

    return axiosInstance;
}

export default useAxiosSecure;