import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { authApi } from "./api/authApi"
import { userApi } from "./api/userApi"
import { propertyTypeApi } from "./api/propertyTypeApi"
import { ownerApi } from "./api/ownerApi"
import { adminApi } from "./api/adminApi";

export const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [ownerApi.reducerPath]:ownerApi.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
        [propertyTypeApi.reducerPath]:propertyTypeApi.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware,userApi.middleware,propertyTypeApi.middleware,ownerApi.middleware,adminApi.middleware)
})


setupListeners(store.dispatch)