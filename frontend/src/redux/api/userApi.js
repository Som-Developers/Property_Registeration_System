import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"https://property-registeration-system.onrender.com/api/users"
    }),
    endpoints: (builder)=>({
        register: builder.mutation({
            query: ({username,email,password})=>({
                url: '/register',
                method: 'POST',
                body: {username,email,password}
            })
        }),
        login: builder.mutation({
            query: ({email,password})=>({
                url: '/login',
                method: 'POST',
                body: {email,password}
            })
        }),
        getUserById: builder.query({
            query: ({id})=>({
                url: `/${id}`,
                method: 'GET'
            })
        }),
        updateProfile: builder.mutation({
            query: ({id,username,email,password})=>({
                url: `/${id}`,
                method: 'PUT',
                body: {username,email,password}
            })
        }),
        deleteProfile: builder.mutation({
            query: ({id})=>({
                url: `/${id}`,
                method: 'DELETE'
            })
        }),

    })
})

export const { useRegisterMutation, useLoginMutation, useGetUserByIdQuery, useUpdateProfileMutation, useDeleteProfileMutation } = userApi;
