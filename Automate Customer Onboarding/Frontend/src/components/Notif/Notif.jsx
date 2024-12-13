import React from "react";
import { useDeleteNotificationMutation } from "../../Redux/api/userApiSlice";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/features/authSlice";

function Notif({ subject, content, id, date, refetch, data }) {
  const dispatch = useDispatch();
  const [deleteNotification] = useDeleteNotificationMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const handleDelete = async (ID) => {
    try {
      console.log(id);
      await deleteNotification(ID).unwrap();
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="mx-4 my-4 p-4 border-l-4 border-purple-500 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-900">{subject}</p>
        <p className="text-xs text-gray-500">
          {new Date(date).toISOString().split("T")[0].replaceAll("-", "/")}
        </p>
      </div>
      <p className="text-sm text-gray-600 mt-2">{content}</p>

      {/* Mark as Read Button with Purple Shades and Active State */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleDelete(id)}
          className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-lg hover:bg-purple-600 active:bg-purple-700 transition-all duration-300"
        >
          Mark as Read
        </button>
      </div>
    </div>
  );
}

export default Notif;
