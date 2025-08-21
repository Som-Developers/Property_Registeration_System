import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ownerApi = createApi({
  reducerPath: "ownerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", // ✅ Use Render URL in production
    prepareHeaders: (headers, { getState }) => {
      // ✅ First try from Redux (optional), then fallback to localStorage
      const token = getState?.().auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Owner"],
  endpoints: (builder) => ({
    // ✅ Register Owner
    registerOwner: builder.mutation({
      query: (ownerData) => ({
        url: "/owners/register",
        method: "POST",
        body: ownerData,
      }),
      invalidatesTags: ["Owner"],
    }),

    // ✅ Get All Owners
    getAllOwners: builder.query({
      query: () => "/owners",
      providesTags: ["Owner"],
    }),

    // ✅ Get Owner By ID
    getOwnerById: builder.query({
      query: (id) => `/owners/${id}`,
      providesTags: (result, error, id) => [{ type: "Owner", id }],
    }),

    // ✅ Update Owner
    updateOwner: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/owners/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Owner", id }],
    }),

    // ✅ Delete Owner
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
