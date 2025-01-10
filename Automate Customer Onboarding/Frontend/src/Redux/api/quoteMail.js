import { apiSlice } from "./apiSlice.js";
import { QUOTE_URL } from "../constant.js";

const quoteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    carQuote: builder.mutation({
      query: (data) => ({
        url: `${QUOTE_URL}/car`,
        method: "POST",
        body: data,
      }),
    }),
    healthQuote: builder.mutation({
      query: (data) => ({
        url: `${QUOTE_URL}/health`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCarQuoteMutation, useHealthQuoteMutation } = quoteApiSlice;
