import type { Banner } from "../../interfaces/banner.interface";
import { api } from "../api";

export const bannerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getActiveBanners: builder.query<Banner[], string>({
            query: (placement) => ({
                url: `banners/active/${placement}`,
                method: 'GET',
            }),
            providesTags: ['Banners'],
        })
    })
})

export const { useGetActiveBannersQuery } = bannerApi