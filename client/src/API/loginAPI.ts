import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface registrationFields {
    name: string
    password: string
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api'}),//write baseurl
    endpoints: (build) => ({
        registerUser: build.mutation<registrationFields, any>({//there may be strange type error but it is probably ok
            query: (registrationData) => ({
                url: '/users/register',//write endpoint
                method: 'POST',//write method
                body: registrationData,
            }),
        }),
        loginUser: build.mutation<registrationFields, any>({//there may be strange type error but it is probably ok
            query: (loginData) => ({
                url: '/users/login',//write endpoint
                method: 'POST',//write method
                body: loginData,
            }),
        }),
    }),
})

export const {useRegisterUserMutation, useLoginUserMutation} = loginAPI
