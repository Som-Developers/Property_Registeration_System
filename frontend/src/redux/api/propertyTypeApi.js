import { createApi } from "@reduxjs/toolkit/query";

export const propertyTypeApi = createApi({
  endpoints: (builder) => ({
    // GET /property-types (get all property types with pagination)
    getPropertyTypes: builder.query({
      query: (params) => ({
        url: '/property-types',
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

    // GET /property-types/stats (get property type statistics)
    getPropertyTypeStats: builder.query({
      query: () => '/property-types/stats',
      providesTags: ['PropertyTypeStats'],
    }),

    // POST /property-types (create a new property type)
    createPropertyType: builder.mutation({
      query: (newPropertyType) => ({
        url: '/property-types',
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