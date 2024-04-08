import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: 'include',
  prepareHeaders: (headers, { getState }: any) => {
    const accessToken = getState().accessToken;
    if(accessToken) {
      headers.set('authorization', accessToken);
    }

    return headers;
  }
})

const baseQueryWithLogout = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if(result?.error?.status === 401) {
    await api.dispatch(logOut());
  }

  return result;
}

export const api = createApi({
  baseQuery: baseQueryWithLogout,
  endpoints: builder => ({})
})