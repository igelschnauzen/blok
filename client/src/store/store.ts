import { configureStore } from '@reduxjs/toolkit'
import { loginAPI } from '../API/loginAPI'

export const store = configureStore({
    reducer: {
        [loginAPI.reducerPath]: loginAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginAPI.middleware),
})
