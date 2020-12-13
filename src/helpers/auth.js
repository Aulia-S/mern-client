import { getCookies, setCookies } from "./cookies"
import { getLocalStorage, setLocalStorage } from "./localStorage";

export const setAuthentication = (token, user) => {
  setCookies('token', token);
  setLocalStorage('user', user);
}

export const isAuthenticated = () => {
  if(getCookies('token') && getLocalStorage('user')){
    return getLocalStorage('user');
  } else{
    return false
  }
}