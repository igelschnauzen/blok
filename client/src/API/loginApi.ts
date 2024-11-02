import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/users` }),
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
            query: (findUserData) => ({
                url: `find/${findUserData}`,
                headers: {Authorization: JSON.parse(localStorage.getItem("user")!).token}
            }),
        }),
        getUsers: build.query({
            query: () => ({
                url: '',
                headers: {Authorization: JSON.parse(localStorage.getItem("user")!).token}
            }),
        }),
    }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useFindUserQuery, useGetUsersQuery } = loginApi
