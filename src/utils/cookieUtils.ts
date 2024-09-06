import Cookies from 'js-cookie';

export const setCookie = (key: string, value: any, options?: Cookies.CookieAttributes) => {
  Cookies.set(key, JSON.stringify(value), options);
};

export const getCookie = <T>(key: string): T | undefined => {
  const cookieValue = Cookies.get(key);
  return cookieValue ? JSON.parse(cookieValue) : undefined;
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
