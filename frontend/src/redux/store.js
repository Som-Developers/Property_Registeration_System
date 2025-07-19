import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import ownerReducer from "./slice/ownerSlice"

import { authApi } from "./api/authApi"
import { userApi } from "./api/userApi"
import { propertyTypeApi } from "./api/propertyTypeApi"
import { propertyApi } from "./api/propertyApi" // Add this import

export const store = configureStore({
  reducer: {
        owner: ownerReducer, // ✅ Add this line

    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [propertyTypeApi.reducerPath]: propertyTypeApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer, // Add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      propertyTypeApi.middleware,
      propertyApi.middleware, // Add this line
    ),
})

setupListeners(store.dispatch)
