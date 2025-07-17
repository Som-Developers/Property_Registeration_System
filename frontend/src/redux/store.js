import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import { authApi } from "./api/authApi"
import { userApi } from "./api/userApi"
import { propertyTypeApi } from "./api/propertyTypeApi"

export const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer   ,
        [propertyTypeApi.reducerPath]:propertyTypeApi.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(authApi.middleware,userApi.middleware,propertyTypeApi.middleware)
})


setupListeners(store.dispatch)