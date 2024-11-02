import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/messages` }),
    endpoints: (build) => ({
        createMessage: build.mutation({
            query: (createMessageData) => ({
                url: "/",
                method: "POST",
                body: createMessageData,
                headers: {Authorization: JSON.parse(localStorage.getItem("user")!).token}
            }),
        }),
        getMessages: build.query({
            query: (chatId) => ({
                url: `/${chatId}`,
                headers: {Authorization: JSON.parse(localStorage.getItem("user")!).token}
            }),
        }),
    }),
})

export const { useCreateMessageMutation, useLazyGetMessagesQuery } = messageApi
