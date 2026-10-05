import type { User } from "../api/models/user.model";
import { GMH_TOKEN_KEY } from "../constants";

export const login = (jwt: string) => {
  localStorage.setItem(GMH_TOKEN_KEY, jwt);
};

export const logout = () => {
  localStorage.removeItem(GMH_TOKEN_KEY);
};

export const isLogged = () => {
  return !!localStorage.getItem(GMH_TOKEN_KEY);
};

export const getCurrentToken = () => {
  return localStorage.getItem(GMH_TOKEN_KEY);
};

interface JwtPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}

export const decodeToken = (jwt: string) => {
  const [header, payload] = jwt
    .split(".")
    .slice(0, 2)
    .map((el) => el.replace(/-/g, "+").replace(/_/g, "/"))
    .map((el) => JSON.parse(window.atob(el)));

  return {
    header,
    payload: payload as JwtPayload,
  };
};

export const getLoggedUser = (): User | null => {
  const token = getCurrentToken();

  if (!token) return null;

  const { payload } = decodeToken(token);

  return {
    username: payload.sub,
    email: payload.sub,
    token: token
  } as User;
}