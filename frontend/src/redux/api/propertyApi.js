import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      // Add auth token if needed
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Property", "PropertyType", "Document"],
  endpoints: (builder) => ({
    // Get all property types
    getPropertyTypes: builder.query({
      query: () => "/propertyType",
      providesTags: ["PropertyType"],
      transformResponse: (response) => response.data || response,
    }),

    // Create new property
    createProperty: builder.mutation({
      query: (propertyData) => ({
        url: "/properties",
        method: "POST",
        body: propertyData,
      }),
      invalidatesTags: ["Property"],
    }),

    // Get all properties
    getAllProperties: builder.query({
      query: () => "/properties",
      providesTags: ["Property"],
    }),
    // ✅ Get current user's owner status
getOwnerStatus: builder.query({
  query: () => "/properties/my/owner-status",
}),

    // Get property by ID
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: "Property", id }],
    }),

    // Update property
    updateProperty: builder.mutation({
      query: ({ id, ...propertyData }) => ({
        url: `/properties/${id}`,
        method: "PUT",
        body: propertyData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Property", id }],
    }),

    // Delete property
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),

    // Search properties
    searchProperties: builder.query({
      query: (searchParams) => {
        const queryString = new URLSearchParams(searchParams).toString()
        return `/properties/search?${queryString}`
      },
      providesTags: ["Property"],
    }),

    // Upload document
    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/documents/upload",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Document"],
    }),
  }),
})

export const {
  useGetPropertyTypesQuery,
  useCreatePropertyMutation,
  useGetAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useSearchPropertiesQuery,
  useUploadDocumentMutation,
    useGetOwnerStatusQuery, // ✅ Add this

} = propertyApi
