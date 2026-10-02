export interface RecoverPasswordResponse {
  resetToken: string;
}

export interface RecoverPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  newPassword: string;
  resetToken: string;
}
