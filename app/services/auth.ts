import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "../types/auth";

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  return axiosInstance.post<any, RegisterResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    data
  );
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return axiosInstance.post<any, LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
}
