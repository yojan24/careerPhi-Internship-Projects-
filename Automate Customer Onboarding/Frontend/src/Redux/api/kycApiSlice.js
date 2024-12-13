import { apiSlice } from "./apiSlice.js";
import { KYC_URL } from "../constant.js";

const kycApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyKyc: builder.mutation({
      query: (data) => ({
        url: `${KYC_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateKyc: builder.mutation({
      query: ({ data, id }) => ({
        url: `${KYC_URL}/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getKyc: builder.query({
      query: () => ({
        url: `${KYC_URL}/`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateStatus: builder.mutation({
      query: ({ updateData, ID }) => ({
        url: `${KYC_URL}/updateByAdmin/${ID}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    statusKyc: builder.mutation({
      query: (data) => ({
        url: `${KYC_URL}/adminStatus`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    getKycById: builder.query({
      query: (ID) => ({
        url: `${KYC_URL}/GetKycByAdmin/${ID}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useApplyKycMutation,
  useUpdateKycMutation,
  useGetKycQuery,
  useUpdateStatusMutation,
  useStatusKycMutation,
  useGetKycByIdQuery,
} = kycApiSlice;
