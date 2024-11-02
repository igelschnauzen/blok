import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const chatApi = createApi({
    reducerPath: "chatAPI",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/chats` }),
    endpoints: (build) => ({
        createChat: build.mutation({
            query: (createChatData) => ({
                url: "/",
                method: "POST",
                body: createChatData,
                headers: {Authorization: JSON.parse(localStorage.getItem("user")!).token}
            }),
        }),
        findUserChats: build.query({
            query: (userId) => ({
                url: `/${userId}`,
                headers: {Authorization: JSON.parse(localStorage.getItem("user")!).token}
            }),
        }),
    }),
})

export const { useCreateChatMutation, useFindUserChatsQuery } = chatApi
