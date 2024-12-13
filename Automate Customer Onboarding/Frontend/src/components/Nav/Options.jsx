import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../Redux/api/userApiSlice";
import { logOut as logOutCredentials } from "../../Redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Options({ toggle }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [logOut] = useLogoutMutation();
  const dispatch = useDispatch();
  const logOutHandler = async () => {
    try {
      await logOut().unwrap();
      dispatch(logOutCredentials());
      toggle();
      toast.success("Successfully LogOut", {
        autoClose: 1000,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };
  return (
    <div className="absolute right-5 mt-5 w-30 md:w-48 bg-purple-100 border rounded-lg shadow-md z-50">
      <ul className="text-gray-700">
        <li className="hover:bg-gray-200" onClick={toggle}>
          <Link to="/profile" className="block px-4 py-2">
            Profile
          </Link>
        </li>
        <li className="hover:bg-gray-200" onClick={toggle}>
          <Link to="/kycStatus" className="block px-4 py-2">
            KYC
          </Link>
        </li>
        <li className="hover:bg-gray-200" onClick={toggle}>
          <Link to="/policies" className="block px-4 py-2">
            Insurance Policies
          </Link>
        </li>
        <li className="hover:bg-gray-200" onClick={toggle}>
          <Link to="/policy-status" className="block px-4 py-2">
            Policy Status
          </Link>
        </li>
        <li className="hover:bg-gray-200" onClick={toggle}>
          <Link to="/notification" className="block px-4 py-2">
            Notification{" "}
            {userInfo?.notifications?.length > 0 && (
              <span className="text-red-500">*</span>
            )}
          </Link>
        </li>
        {userInfo?.isAdmin && (
          <>
            <li className="hover:bg-gray-200" onClick={toggle}>
              <Link to="/kycApplications" className="block px-4 py-2">
                Kyc Applications
              </Link>
            </li>
            {/* <li className="hover:bg-gray-200" onClick={toggle}>
              <Link to="/notification" className="block px-4 py-2">
                policy Applications
              </Link>
            </li> */}
          </>
        )}
        <li className="hover:bg-gray-200" onClick={logOutHandler}>
          <button className="block px-4 py-2">Log out</button>
        </li>
      </ul>
    </div>
  );
}

export default Options;
