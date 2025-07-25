import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
baseUrl: "http://localhost:3000/api/users",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ username, email, password }) => ({
        url: "/register",
        method: "POST",
        body: { username, email, password },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ id, username, email, password }) => ({
        url: `/${id}`,
        method: "PUT",
        body: { username, email, password },
      }),
    }),
    deleteProfile: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useGetCurrentUserQuery, // ✅ this is what you will now use
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = userApi;
