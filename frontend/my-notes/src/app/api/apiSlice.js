import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000' }),// change when deployed to production environment.   
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})