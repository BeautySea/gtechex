/* eslint-disable no-useless-catch */
import axios from 'axios';
import Cookies from 'js-cookie';
import ENUM from '../service/enum';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your actual base 

export interface DefaultAxiosResponse {
  data: {
    status: boolean;
    message: string;
    data: any;
  };
}
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
  }

interface MyAxiosFetchWithPayloadProps {
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH';
  route: string;
  token?: string;
  data?: Record<string, any>; // Request data for POST, PUT, etc.
}

export const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const getAccessToken = () => {
  const token = getLocalStorageItem('authToken') || Cookies.get();

  

  return token[ENUM.ACCESS_TOKEN] || '';
  // return token
}
const token = localStorage.getItem('authToken') || '';
export async function myAxiosNoAuthFetchWithPayload({
  method,
  route,
  data = {},
}: MyAxiosFetchWithPayloadProps) {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${route}`,
      headers: {
        // Authorization: `Bearer ${token}`,
        ...DEFAULT_HEADERS,
      },
      data, 
    });

    // Check if the response contains data, and return it
    if (response.data) {
      return response.data;
    }

    // If the response doesn't contain data, return the response itself
    return response;
  } catch (error) {
    // Handle errors more gracefully, e.g., log the error or display a message
    throw error; // Re-throw the error for the caller to handle
  }
}


export async function myAxiosWithAuthFetchWithPayload({
    method,
    route,
    token,
    data = {},
  }: MyAxiosFetchWithPayloadProps) {
    try {
      const response = await axios({
        method,
        url: `${BASE_URL}${route}`,
        headers: {
          Authorization: `Bearer ${token}`,
          ...DEFAULT_HEADERS,
        },
        data, 
      });
  
      // Check if the response contains data, and return it
      if (response.data) {
        return response.data;
      }
  
      // If the response doesn't contain data, return the response itself
      return response;
    } catch (error) {
      // Handle errors more gracefully, e.g., log the error or display a message
      throw error; // Re-throw the error for the caller to handle
    }
  }

  export const fileUpload = async (
    data: any,
    key = "",
    progressFunc?: (v: number) => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", data);
      const res: DefaultAxiosResponse = await axios({
        method: "post",
        url: ENUM.BASE_URL + ENUM.UPLOAD_FILE,
        data: formData,
        // headers: {
        //   Authorization: "Bearer " + token,
        // },
        onUploadProgress: (e: any) => {
          if (progressFunc) {
            const percent = Math.round((e.loaded / e.total) * 100);
            progressFunc(percent);
          }
        },
      });
      if (res.data.status) {
        // saveJWT(res.data?.data?.token);
        if (key) {
          return { error: false, errorMessage: null, data: res.data?.data };
        } else {
          return { error: false, errorMessage: null, data: res?.data?.data };
        }
      } else {
        return { error: true, errorMessage: res.data?.message, data: null };
      }
    } catch (e: any) {
      return {
        error: true,
        errorMessage: e?.response?.data?.message || e.message,
        data: e?.response?.data?.data || null,
      };
    }
  };
