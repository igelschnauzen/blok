import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}:3000/api/users` }),
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (registrationData) => ({
                url: "/register",
                method: "POST",
                body: registrationData,
            }),
        }),
        loginUser: build.mutation({
            query: (loginData) => ({
                url: "/login",
                method: "POST",
                body: loginData,
            }),
        }),
        findUser: build.query({
            query: (findUserData) => `find/${findUserData}`,
        }),
        getUsers: build.query({
            query: () => ``,
        }),
    }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useFindUserQuery, useGetUsersQuery } = loginApi
