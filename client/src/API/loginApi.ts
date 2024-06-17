import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://5.35.100.88:3000/api/users'}),//write baseurl
    endpoints: (build) => ({
        registerUser: build.mutation({//there may be strange type error but it is probably ok
            query: (registrationData) => ({
                url: '/register',//write endpoint
                method: 'POST',//write method
                body: registrationData,
            }),
        }),
        loginUser: build.mutation({//there may be strange type error but it is probably ok
            query: (loginData) => ({
                url: '/login',//write endpoint
                method: 'POST',//write method
                body: loginData,
            }),
        }),
        findUser: build.query({
            query: (findUserData) => `find/${findUserData}`,
        }),
    }),
})

export const {useRegisterUserMutation, useLoginUserMutation, useFindUserQuery} = loginApi
