import { apiSlice } from "./apiSlice";
import { HEALTH_URL } from "../constant";

const healthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyHealthIns: builder.mutation({
      query: (data) => ({
        url: `${HEALTH_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getHealthIns: builder.query({
      query: () => ({
        url: `${HEALTH_URL}/`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllHealthIns: builder.query({
      query: () => ({
        url: `${HEALTH_URL}/getAllInsurances`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useApplyHealthInsMutation,
  useGetHealthInsQuery,
  useGetAllHealthInsQuery,
} = healthApiSlice;
