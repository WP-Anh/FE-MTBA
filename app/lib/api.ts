import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../config/api";

// Tạo instance axios với config mặc định
export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      const data = error.response.data as any;
      throw {
        message: data.message || "Something went wrong",
        errors: data.errors,
      };
    }
    throw error;
  }
);
