import { createApi } from '@reduxjs/toolkit/query/react';
import {createBaseQuery} from "../utils/createBaseQuery.ts";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: createBaseQuery(''),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: 'register/',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login/',
                method: 'POST',
                body: credentials,
            }),
        }),
        fetchUser: builder.query({
            query: () => 'user/',  // Перевірте цей маршрут
        }),
    }),
});


export const {
    useRegisterMutation,
    useLoginMutation,
    useFetchUserQuery,
} = authApi;