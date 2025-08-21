import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["AdminOwner", "AdminProperty"],
  endpoints: (builder) => ({
    // Owner endpoints (working)
    getAllOwnersAdmin: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams()
        if (params.page) queryParams.append("page", params.page)
        if (params.limit) queryParams.append("limit", params.limit)
        if (params.search) queryParams.append("search", params.search)
        if (params.sort) queryParams.append("sort", params.sort)
        if (params.searchFields) queryParams.append("searchFields", params.searchFields)
        const queryString = queryParams.toString()
        return `/admin/owners${queryString ? `?${queryString}` : ""}`
      },
      providesTags: ["AdminOwner"],
      transformResponse: (response) => {
        if (response && response.success && response.docs) {
          return response
        }
        return {
          success: false,
          docs: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        }
      },
    }),

    approveOwner: builder.mutation({
      query: (ownerId) => ({
        url: `/admin/approve-owner/${ownerId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminOwner"],
    }),

    // ✅ Use your existing properties endpoint
    getAllPropertiesAdmin: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams()
        if (params.page) queryParams.append("page", params.page)
        if (params.limit) queryParams.append("limit", params.limit)
        const queryString = queryParams.toString()
        return `/properties${queryString ? `?${queryString}` : ""}`
      },
      providesTags: ["AdminProperty"],
      transformResponse: (response) => {
        console.log("Properties API Response:", response)
        // Your getAllProperties returns { data: { docs, total, etc } }
        if (response && response.data) {
          return response.data
        }
        return {
          docs: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        }
      },
    }),

    // ✅ Enhanced property approval with better error handling
    approveProperty: builder.mutation({
      query: (propertyId) => {
        console.log("=== APPROVE PROPERTY API CALL ===")
        console.log("Property ID:", propertyId)
        console.log("URL will be:", `/admin/approve-property/${propertyId}`)

        return {
          url: `/admin/approve-property/${propertyId}`,
          method: "PATCH",
        }
      },
      invalidatesTags: ["AdminProperty"],
      transformResponse: (response) => {
        console.log("=== APPROVE PROPERTY RESPONSE ===")
        console.log("Response:", response)
        return response
      },
      transformErrorResponse: (errorResponse) => {
        console.log("=== APPROVE PROPERTY ERROR ===")
        console.log("Error Response:", errorResponse)
        console.log("Status:", errorResponse.status)
        console.log("Data:", errorResponse.data)
        return errorResponse
      },
    }),
  }),
})

export const {
  useGetAllOwnersAdminQuery,
  useApproveOwnerMutation,
  useGetAllPropertiesAdminQuery,
  useApprovePropertyMutation,
} = adminApi
