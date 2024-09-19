import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://95.183.12.121:3000/api/messages'}),
    endpoints: (build) => ({
        createMessage: build.mutation({
            query: (createMessageData) => ({
                url: '/',
                method: 'POST',
                body: createMessageData,
            }),
        }),
        getMessages: build.query({
            query: (chatId) => `/${chatId}`,
        }),
    }),
})

export const {useCreateMessageMutation, useLazyGetMessagesQuery} = messageApi