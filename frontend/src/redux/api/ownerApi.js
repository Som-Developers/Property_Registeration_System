import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ownerApi = createApi({
    reducerPath: "ownerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://property-registeration-system.onrender.com/api/owners",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token; // Adjust based on where your token is stored
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Register Owner (requires token)
        registerOwner: builder.mutation({
            query: (ownerData) => ({
                url: "/register",
                method: "POST",
                body: ownerData,
            }),
            invalidatesTags: ["Owner"],
        }),

        // Get Owner by ID
        getOwner: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Owner"],
        }),

        // Update Owner
        updateOwner: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: updateData,
            }),
            invalidatesTags: ["Owner"],
        }),

        // Delete Owner
        deleteOwner: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Owner"],
        }),

        // Get All Owners
        getAllOwners: builder.query({
            query: () => `/`,
            providesTags: ["Owner"],
        }),
    }),
});

export const {
    useRegisterOwnerMutation,
    useGetOwnerQuery,
    useUpdateOwnerMutation,
    useDeleteOwnerMutation,
    useGetAllOwnersQuery,
} = ownerApi;
