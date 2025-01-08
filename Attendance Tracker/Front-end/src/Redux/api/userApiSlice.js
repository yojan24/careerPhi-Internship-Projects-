import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logOut`,
        method: "POST",
      }),
    }),
    checkIn: builder.mutation({
      query: () => ({
        url: `${USER_URL}/check-in`,
        method: "PATCH",
      }),
    }),
    checkOut: builder.mutation({
      query: () => ({
        url: `${USER_URL}/check-out`,
        method: "PATCH",
      }),
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/verifyOTP`,
        method: "POST",
        body: data,
      }),
    }),
    resendOTP: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/resendOTP`,
        method: "POST",
        body: data,
      }),
    }),
    currUser: builder.query({
      query: () => ({
        url: `${USER_URL}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    userByID: builder.query({
      query: (ID) => ({
        url: `${USER_URL}/getUser/${ID}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    allUsers: builder.query({
      query: () => ({
        url: `${USER_URL}/getAllUsers`,
      }),
      keepUnusedDataFor: 5,
    }),
    verifyToken: builder.query({
      query: () => ({
        url: `${USER_URL}/token-verification`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (ID) => ({
        url: `${USER_URL}/delete/${ID}`,
        method: "DELETE",
      }),
    }),
  }),
  tagTypes: ["User"],
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useUserByIDQuery,
  useCurrUserQuery,
  useCheckInMutation,
  useCheckOutMutation,
  useVerifyTokenQuery,
  useAllUsersQuery,
  useDeleteUserMutation,
} = userApiSlice;
