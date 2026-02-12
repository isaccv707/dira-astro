import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = import.meta.env.PUBLIC_API_URL;

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ["Quotation"],
    endpoints: () => ({}),
})