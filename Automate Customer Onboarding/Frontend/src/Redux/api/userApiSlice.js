import { apiSlice } from "./apiSlice.js";
import { USER_URL } from "../constant.js";
import { UPLOAD_URL } from "../constant.js";
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
        url: `${USER_URL}`,
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
    profile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/update`,
        method: "PATCH",
        body: data,
      }),
    }),
    getUserDetails: builder.query({
      query: (ID) => ({
        url: `${USER_URL}/${ID}`,
      }),
      keepUnusedDataFor: 5,
    }),
    sendVerificationCode: builder.mutation({
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
    uploadIMG: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getNotificcations: builder.query({
      query: () => ({
        url: `${USER_URL}/notifications`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteNotification: builder.mutation({
      query: (ID) => ({
        url: `${USER_URL}/deleteNotification/${ID}`,
        method: "DELETE",
      }),
    }),
    addNotif: builder.mutation({
      query: (data1) => ({
        url: `${USER_URL}/addNotification`,
        method: "POST",
        body: data1,
      }),
    }),
    updateStausOfUser: builder.mutation({
      query: ({ updatedStatus, ID }) => ({
        url: `${USER_URL}/updateKycStatus/${ID}`,
        method: "POST",
        body: updatedStatus,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUserDetailsQuery,
  useSendVerificationCodeMutation,
  useResendOTPMutation,
  useUploadIMGMutation,
  useGetNotificcationsQuery,
  useDeleteNotificationMutation,
  useAddNotifMutation,
  useUpdateStausOfUserMutation,
} = userApiSlice;
