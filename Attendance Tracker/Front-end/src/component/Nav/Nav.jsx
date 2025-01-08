import React, { useState, useEffect, useRef } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useLogoutMutation } from "../../Redux/api/userApiSlice";
import { logOut as loggingOut } from "../../Redux/features/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [logOut] = useLogoutMutation();

  const dropdownRef = useRef(null);
  const toggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false); // Close dropdown if clicked outside
      }
    };

    const handleScroll = () => {
      setOpen(false); // Close dropdown on scroll
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners when component is unmounted
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Logout = async () => {
    try {
      const result = await logOut().unwrap();
      dispatch(loggingOut());
      navigate("/");
      toast.success("Log-Out Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 1000,
      });
    }
  };
  return (
    <section className="w-full h-[8vh] bg-teal-600 flex items-center  ">
      <header className="w-full flex justify-between items-center mx-8">
        <p className="text-md font-semibold text-white md:text-2xl">
          Attendance Tracker
        </p>
        <nav>
          <ul className="md:flex space-x-4 text-lg hidden ">
            {userInfo && (
              <li title="logOut">
                <Link
                  to="/profile"
                  className="flex flex-col justify-center items-center p-3 rounded-md text-white hover:bg-white hover:text-black"
                >
                  <FaRegUserCircle size={25} />
                  {/* <span className="text-lg">Log out</span> */}
                </Link>
              </li>
            )}
            {userInfo?.isAdmin && (
              <li title="All Users">
                <Link
                  to={"/all-users"}
                  className="flex flex-col justify-center items-center p-3 rounded-md text-white hover:bg-white hover:text-black"
                >
                  <FaUsers size={25} />
                  {/* <span className="text-lg">Log out</span> */}
                </Link>
              </li>
            )}
            {userInfo && (
              <li title="logOut">
                <button
                  onClick={Logout}
                  className="flex flex-col justify-center items-center p-3 rounded-md text-white hover:bg-white hover:text-black"
                >
                  <AiOutlineLogout size={25} />
                  {/* <span className="text-lg">Log out</span> */}
                </button>
              </li>
            )}
          </ul>
          <ul className="md:hidden flex relative">
            <IoMdMenu
              size={25}
              className={`text-white transition-all ease-in-out duration-300 ${
                open ? "rotate-180" : ""
              } `}
              onClick={toggle}
            />
            {open && (
              <div
                className=" absolute right-0 top-9 z-50 py-1"
                ref={dropdownRef}
              >
                <ul className="flex flex-col  bg-gray-200 py-2 rounded-md shadow-md">
                  <li
                    className="hover:bg-gray-300 px-5 py-1 font-semibold active:text-teal-400"
                    onClick={toggle}
                  >
                    <Link to={"/profile"}>Profile</Link>
                  </li>
                  <li
                    className="hover:bg-gray-300 px-5 py-1 font-semibold active:text-teal-400"
                    onClick={toggle}
                  >
                    <Link to={"/all-users"}>Employees</Link>
                  </li>
                  <li
                    className="hover:bg-gray-300 px-5 py-1 font-semibold active:text-teal-400"
                    onClick={toggle}
                  >
                    <button onClick={Logout}>Log Out</button>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </nav>
      </header>
    </section>
  );
}

export default Nav;
