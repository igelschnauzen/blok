import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface registrationFields {
    name: string
    password: string
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),//write baseurl
    endpoints: (build) => ({
        registerUser: build.mutation<registrationFields, any>({//there may be strange type error but it is probably ok
            query: (registrationData) => ({
                url: '',//write endpoint
                method: '',//write method
                body: registrationData,
            }),
        }),
    }),
})

export const {useRegisterUserMutation} = loginAPI
