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
            }),
        }),
        getMessages: build.query({
            query: (chatId) => `/${chatId}`,
        }),
    }),
})

export const { useCreateMessageMutation, useLazyGetMessagesQuery } = messageApi
