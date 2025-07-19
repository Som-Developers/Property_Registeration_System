import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://property-registeration-system.onrender.com/api/admin",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // ✅ Approve Property
        approveProperty: builder.mutation({
            query: (id) => ({
                url: `/approve-property/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["AdminActions"],
        }),

        // ✅ Approve Owner
        approveOwner: builder.mutation({
            query: (id) => ({
                url: `/approve-owner/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["AdminActions"],
        }),
    }),
});

export const {
    useApprovePropertyMutation,
    useApproveOwnerMutation,
} = adminApi;
