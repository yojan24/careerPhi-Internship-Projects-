import { CAR_URL } from "../constant.js";
import { apiSlice } from "./apiSlice.js";

const carApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyCarIns: builder.mutation({
      query: (data) => ({
        url: `${CAR_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    getCarIns: builder.query({
      query: () => ({
        url: `${CAR_URL}/`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllCarIns: builder.query({
      query: () => ({
        url: `${CAR_URL}/getAllInsurances`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useApplyCarInsMutation,
  useGetCarInsQuery,
  useGetAllCarInsQuery,
} = carApiSlice;
