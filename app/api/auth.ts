import axios from "axios";

const API_URL = "http://localhost:3050/api";

// Interface cho dữ liệu đăng ký
interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

// Interface cho dữ liệu đăng nhập
interface LoginData {
  email: string;
  password: string;
}

// Interface cho response
interface AuthResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    createdAt: string;
  };
  token?: string;
  error?: string;
}

// Hàm đăng ký
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server trả về response với status code ngoài range 2xx
      return {
        message: "Đăng ký thất bại",
        error: error.response.data.error || "Đăng ký thất bại",
      };
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      return {
        message: "Đăng ký thất bại",
        error: "Không thể kết nối đến server",
      };
    } else {
      // Có lỗi khi setting up request
      return {
        message: "Đăng ký thất bại",
        error: "Đã xảy ra lỗi khi đăng ký",
      };
    }
  }
};

// Hàm đăng nhập
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server trả về response với status code ngoài range 2xx
      return {
        message: "Đăng nhập thất bại",
        error: error.response.data.error || "Đăng nhập thất bại",
      };
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      return {
        message: "Đăng nhập thất bại",
        error: "Không thể kết nối đến server",
      };
    } else {
      // Có lỗi khi setting up request
      return {
        message: "Đăng nhập thất bại",
        error: "Đã xảy ra lỗi khi đăng nhập",
      };
    }
  }
};

// Hàm lưu token vào localStorage
export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

// Hàm lấy token từ localStorage
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Hàm xóa token khỏi localStorage
export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};
