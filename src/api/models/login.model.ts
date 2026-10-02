export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  fullName: string;
  token: string;
}
