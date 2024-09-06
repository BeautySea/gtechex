/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import ENUM from "./enum";


const DEFAULT_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  
  export async function normalRequest(method: string, route: string) {
    try {
      const res = await fetch(`${ENUM.BASE_URL}${route}`, {
        method: `${method}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return err;
    }
  }


  export async function normalRequestWithPayload(method: string, route: string, data = {}) {
    try {
      const response = await axios({
        method,
        url: `${ENUM.BASE_URL}${route}`,
        headers: {
          ...DEFAULT_HEADERS,
        },
        data, // Include request data for POST, PUT, etc.
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