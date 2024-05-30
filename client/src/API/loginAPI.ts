import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface registrationFields {
    name: string
    password: string
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),//get baseurl
    endpoints: (build) => ({
        registerUser: build.mutation<registrationFields, void>({//strange type error
            query: (registrationData) => ({
                url: '',//get url
                method: '',//get method
                body: registrationData,
            }),
        }),
    }),
})

export const {useRegisterUserMutation} = loginAPI
