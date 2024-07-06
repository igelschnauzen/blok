import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://5.35.100.88:3000/api/users'}),
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (registrationData) => ({
                url: '/register',
                method: 'POST',
                body: registrationData,
            }),
        }),
        loginUser: build.mutation({
            query: (loginData) => ({
                url: '/login',
                method: 'POST',
                body: loginData,
            }),
        }),
        findUser: build.query({
            query: (findUserData) => `find/${findUserData}`,
        }),
    }),
})

export const {useRegisterUserMutation, useLoginUserMutation, useFindUserQuery} = loginApi
