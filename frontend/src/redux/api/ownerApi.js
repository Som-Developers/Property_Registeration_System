// src/redux/api/ownerApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ownerApi = createApi({
  reducerPath: "ownerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Owner"],
  endpoints: (builder) => ({
    // Register new owner
    registerOwner: builder.mutation({
      query: (ownerData) => ({
        url: "/owners/register",
        method: "POST",
        body: ownerData,
      }),
      invalidatesTags: ["Owner"],
    }),

    // Get all owners (admin or analytics use)
    getAllOwners: builder.query({
      query: () => "/owners",
      providesTags: ["Owner"],
    }),

    // Get single owner by ID
    getOwnerById: builder.query({
      query: (id) => `/owners/${id}`,
      providesTags: (result, error, id) => [{ type: "Owner", id }],
    }),

    // Update owner info
    updateOwner: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/owners/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Owner", id }],
    }),

    // Delete owner
    deleteOwner: builder.mutation({
      query: (id) => ({
        url: `/owners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Owner"],
    }),
  }),
});

export const {
  useRegisterOwnerMutation,
  useGetAllOwnersQuery,
  useGetOwnerByIdQuery,
  useUpdateOwnerMutation,
  useDeleteOwnerMutation,
} = ownerApi;
