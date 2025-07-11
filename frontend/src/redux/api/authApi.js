import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query"


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://property-registeration-system.onrender.com/api/users'
    }),
    endpoints: (builder)=>({
        login: builder.mutation({
            query: ({email,password})=>({
                url:'/login',
                method: 'POST',
                body: {email,password}
            }),
        })
    })
})


export const {useLoginMutation}=authApi
