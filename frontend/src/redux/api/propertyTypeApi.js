import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertyTypeApi = createApi({
  reducerPath: 'propertyTypeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://property-registeration-system.onrender.com/api/propertyType' }), // Adjust the base URL as needed
  tagTypes: ['PropertyType', 'PropertyTypeStats'],
  endpoints: (builder) => ({
    // GET /property-types (get all property types with pagination)
    getPropertyTypes: builder.query({
      query: (params) => ({
        url: '/',
        params,
      }),
      providesTags: (result) =>
        result && result.docs
          ? [
              ...result.docs.map(({ id }) => ({ type: 'PropertyType', id })),
              { type: 'PropertyType', id: 'LIST' },
            ]
          : [{ type: 'PropertyType', id: 'LIST' }],
    }),


    // POST /property-types (create a new property type)
    createPropertyType: builder.mutation({
      query: (newPropertyType) => ({
        url: '/create',
        method: 'POST',
        body: newPropertyType,
      }),
      invalidatesTags: [{ type: 'PropertyType', id: 'LIST' }, 'PropertyTypeStats'],
    }),

    // PUT /property-types/:id (update a property type)
    updatePropertyType: builder.mutation({
      query: ({ id, ...updatedPropertyType }) => ({
        url: `/property-types/${id}`,
        method: 'PUT',
        body: updatedPropertyType,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PropertyType', id },
        { type: 'PropertyType', id: 'LIST' },
        'PropertyTypeStats',
      ],
    }),

    // DELETE /property-types/:id (delete a property type)
    deletePropertyType: builder.mutation({
      query: ({ id }) => ({
        url: `/property-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PropertyType', id },
        { type: 'PropertyType', id: 'LIST' },
        'PropertyTypeStats',
      ],
    }),
  }),
});

export const {
  useGetPropertyTypesQuery,
  useGetPropertyTypeStatsQuery,
  useCreatePropertyTypeMutation,
  useUpdatePropertyTypeMutation,
  useDeletePropertyTypeMutation,
} = propertyTypeApi;
