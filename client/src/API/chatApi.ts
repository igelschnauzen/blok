import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const chatApi = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://95.183.12.121:3000/api/chats'}),
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
