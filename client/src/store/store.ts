import {configureStore} from '@reduxjs/toolkit'
import {loginApi} from '../API/loginApi'
import {chatApi} from "../API/chatApi";
import {messageApi} from "../API/messageApi";

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware, chatApi.middleware, messageApi.middleware),
})
