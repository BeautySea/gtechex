/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "@reduxjs/toolkit/query";
import axios from "axios";
import ENUM from "../../service/enum";

interface API_RESPONSE<T = any> {
    status?: boolean
    message?: string
    data?: T
}

export interface userData {
    limits: null | string | number,
    applications: string[],
    resumes: string[],
    id: string,
    email: string
    username: string,
    firstName: string,
    lastName: string,
    authType: string[],
    picture: string,
}

export interface AccountState {
    loading?: 'false' | 'true' | 'done'
    error?: boolean
    errorMessage?: string | null
    data?: userData | null;
}


const initialState: AccountState = {
    error: false,
    loading: "false",
    errorMessage: null,
    data: null
}
// "google" | "manual"
// 'login' | 'register'
// {[key: string]: any}

// export const login = createAsyncThunk<API_RESPONSE, any, {state:any}>(
//     "account/login", async({url, data, request}: {url: string; data: any ; request: string }, {rejectWithValue}) => {
//         try {
//             const res = (await axios.post(`${ENUM.BASE_URL}${url === 'google' ? ENUM.GOOGLE_AUTH_URL : ENUM.LOGIN_URL}`, url === 'google' ? {google_id_token: data.google_id_token} : {user: data.email, password: data.password},
//             {
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             )) as { data: API_RESPONSE<{ user: any; token: string }> };
//             return res;
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
// )

export const login = createAsyncThunk<API_RESPONSE, any, { state: any }>(
    "account/login",
    async ({ url, data, request }: { url: string; data: any; request: string }, { rejectWithValue }) => {
      try {
        const res = await axios.post(
          `${ENUM.BASE_URL}${url === 'google' ? ENUM.GOOGLE_AUTH_URL : ENUM.LOGIN_URL}`,
          url === 'google' ? { google_id_token: data.google_id_token } : { user: data.email, password: data.password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        // Assuming res.data is an object with the expected shape
        const apiResponse: API_RESPONSE = res.data;
  
        return apiResponse;
      } catch (error) {
        console.error(error);
        // Reject with a specific error message or the error object itself
        return rejectWithValue("Login failed");
      }
    }
  );
  




export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(login.pending, (state: AccountState) => {
            state.loading = "true";
        })
        .addCase(login.fulfilled, (state: AccountState, action: PayloadAction<API_RESPONSE>) => {
            state.loading = "done";
            state.error = false;
            state.errorMessage = "";
            state.data = action.payload.data || null;
        })
        .addCase(login.rejected, (state: AccountState, action: PayloadAction<any>) => {
            state.loading = "done";
            state.error = true;
            state.errorMessage = action.payload || "";
        })
    }
})

export default accountSlice.reducer;