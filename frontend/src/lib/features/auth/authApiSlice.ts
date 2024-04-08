import { api } from "../../api";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { name, email, password},
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
