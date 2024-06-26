import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const chatApi = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://5.35.100.88:3000/api/chats'}),
    endpoints: (build) => ({
        createChat: build.mutation({
            query: (createChatData) => ({
                url: '/',
                method: 'POST',
                body: createChatData,
            }),
        }),
        findUserChats: build.query({
            query: (userId) => `/${userId}`,
        }),
    }),
})

export const {useCreateChatMutation, useFindUserChatsQuery} = chatApi
