import { api } from "../api";
import type { ReviewResponse, ReviewPayload } from "./review.interface";


export const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllApprovedReviews: builder.query<ReviewResponse[], void>({
            query: () => ({
                url: 'reviews/approved',
                method: 'GET'
            }),
            providesTags: ['Reviews'],
        }),
        createReview: builder.mutation<ReviewResponse[], ReviewPayload>({
            query: (newReview) => ({
                url: 'reviews',
                method: 'POST',
                body: newReview,
            }),
            invalidatesTags: ['Reviews']
        })
    })
})

export const {
    useGetAllApprovedReviewsQuery,
    useCreateReviewMutation,
} = reviewApi;

