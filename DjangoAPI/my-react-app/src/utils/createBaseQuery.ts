import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APP_ENV} from "../env";


export const createBaseQuery = (endpoint: string) => {
    return fetchBaseQuery({
        baseUrl: `${APP_ENV.API_BASE_URL}/api/${endpoint}`,
        // baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.access;  // Використовуємо 'access' замість 'token'
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });
}