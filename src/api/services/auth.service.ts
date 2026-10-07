import type { AxiosResponse } from "axios";
import base from "../base";
import type { LoginRequest, LoginResponse } from "../models/login.model";
import type {
  ChangePasswordRequest,
  RecoverPasswordRequest,
  RecoverPasswordResponse,
} from "../models/password.model";
import type { RegisterRequest } from "../models/register.models";

const RESOURCE = "/auth";

class AuthService {
  static async register(
    request: RegisterRequest,
  ): Promise<AxiosResponse<void>> {
    return await base.post(RESOURCE + "/register", request);
  }

  static async login(
    request: LoginRequest,
  ): Promise<AxiosResponse<LoginResponse>> {
    return await base.post(RESOURCE + "/login", request);
  }

  static async requestPasswordChangeToken(
    request: RecoverPasswordRequest,
  ): Promise<AxiosResponse<RecoverPasswordResponse>> {
    return await base.post(RESOURCE + "/recover", request);
  }

  static async changePassword(request: ChangePasswordRequest): Promise<void> {
    return await base.post(RESOURCE + "/change-password", request);
  }
}

export default AuthService;
