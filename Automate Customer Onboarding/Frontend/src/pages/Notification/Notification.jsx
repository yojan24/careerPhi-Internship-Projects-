import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Notif } from "../../components";
import { useGetNotificcationsQuery } from "../../Redux/api/userApiSlice";
import { login } from "../../Redux/features/authSlice";

function Notification() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [notif, setNotif] = useState([]);
  const {
    data: Notification,
    isLoading,
    error,
    refetch,
  } = useGetNotificcationsQuery();

  useEffect(() => {
    if (Notification) {
      setNotif(Notification);
      dispatch(login({ ...userInfo, notifications: Notification }));
    }
  }, [Notification]);

  if (isLoading) {
    return <Loader />;
  }

  // Case: No notifications available
  if (notif.length === 0) {
    return (
      <div className="min-h-[92vh]">
        <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
          Notifications
        </h1>
        <div className="flex justify-center">
          <p>No notifications available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[92vh]">
      <h1 className="w-full text-center font-bold text-2xl md:text-4xl py-4 my-5 text-[#563A9C] tracking-wide drop-shadow-lg">
        Notifications
      </h1>
      <div className="flex flex-col">
        {notif.map((notification, i) => (
          <div
            key={notification.notifications._id}
            className="transition-all ease-in-out"
          >
            <Notif
              data={notif}
              subject={notification.notifications.subject}
              content={notification.notifications.content}
              id={notification.notifications._id}
              date={notification.notifications.createdAt}
              refetch={refetch}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
