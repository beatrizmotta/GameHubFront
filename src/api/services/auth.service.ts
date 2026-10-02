import base from "../base";
import type { LoginRequest } from "../models/login.model";
import type {
  ChangePasswordRequest,
  RecoverPasswordRequest,
} from "../models/password.model";
import type { RegisterRequest } from "../models/register.models";

const RESOURCE = "/auth";

class AuthService {
  static async register(request: RegisterRequest) {
    return await base.post(RESOURCE + "/register", request);
  }

  static async login(request: LoginRequest) {
    return await base.post(RESOURCE + "/login", request);
  }

  static async requestPasswordChangeToken(request: RecoverPasswordRequest) {
    return await base.post(RESOURCE + "/recover", request);
  }

  static async changePassword(request: ChangePasswordRequest) {
    return await base.post(RESOURCE + "/change-password", request);
  }
}

export default AuthService;
