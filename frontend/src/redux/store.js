import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Slices
import ownerReducer from "./slice/ownerSlice";

// APIs
// import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { ownerApi } from "./api/ownerApi";
import { adminApi } from "./api/adminApi";
import { propertyApi } from "./api/propertyApi";
import { propertyTypeApi } from "./api/propertyTypeApi";

export const store = configureStore({
  reducer: {
    owner: ownerReducer, // ✅ Local slice reducer

    // [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ownerApi.reducerPath]: ownerApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [propertyTypeApi.reducerPath]: propertyTypeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // authApi.middleware,
      userApi.middleware,
      ownerApi.middleware,
      adminApi.middleware,
      propertyApi.middleware,
      propertyTypeApi.middleware
    ),
});

setupListeners(store.dispatch);
