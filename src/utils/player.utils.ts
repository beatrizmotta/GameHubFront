import { GMH_USER_ID_KEY } from "../constants";

export const getCurrentPlayer = () => {
  console.log("Player id", localStorage.getItem(GMH_USER_ID_KEY));
  return localStorage.getItem(GMH_USER_ID_KEY);
};

export const saveCurrentPlayer = (playId: string) => {
  return localStorage.setItem(GMH_USER_ID_KEY, playId);
};
