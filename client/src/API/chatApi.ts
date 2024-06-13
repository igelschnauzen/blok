import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const chatApi = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://5.35.100.88:3000/api/chats'}),
    endpoints: (build) => ({
        createChat: build.mutation<chatIds, any>({
            query: (createChatData) => ({
                url: '/',
                method: 'POST',
                body: createChatData,
            }),
        }),
        findUserChats: build.query<number, any>({
            query: (userId) => `/${userId}`,
        }),
        findChat: build.query<chatIds, any>({
            query: (findChatData) => `find/${findChatData.firstId}/${findChatData.secondId}`,
        }),
    }),
})

export const {useCreateChatMutation, useFindUserChatsQuery, useFindChatQuery} = chatApi
