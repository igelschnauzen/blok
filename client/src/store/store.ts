import {configureStore} from '@reduxjs/toolkit'
import {loginApi} from '../API/loginApi'
import {chatApi} from "../API/chatApi";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware, chatApi.middleware),
})
