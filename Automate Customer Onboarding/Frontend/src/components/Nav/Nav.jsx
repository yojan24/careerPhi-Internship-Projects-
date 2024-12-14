import React, { useEffect, useState } from "react";
import {
  AiOutlineHome,
  AiOutlineContacts,
  AiOutlineLogin,
  AiOutlineUser,
} from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { CiCircleInfo } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Options from "./Options";
import Modal from "./Modal";
function Nav() {
  const [options, setOptions] = useState(false);
  const [model, setModel] = useState(false);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const toggleM = () => {
    setModel(!model);
  };

  const toggle = () => {
    setOptions(!options);
  };
  return (
    <>
      <section className="bg-[#563A9C] md:h-[8vh] h-[10vh]">
        <header className="flex h-14 justify-between items-center mx-5 text-white group ">
          <p className="text-white  font-semibold text-lg md:text-2xl p-1 mt-[0.5vh] md:mt-0">
            <img src="navlogo.png" className="h-8 w-8 mr-2 md:mr-1" />
            Ensure
          </p>
          <nav className=" hidden lg:block">
            <ul className="flex gap-5">
              <Link className="flex flex-col justify-center items-center p-1 hover:bg-white rounded-md hover:text-black w-20">
                <AiOutlineHome size={23} />
                <span className="text-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300">
                  Home
                </span>
              </Link>
              <Link
                to={"/about-us"}
                className="flex flex-col justify-center items-center p-1 hover:bg-white rounded-md hover:text-black w-20"
              >
                <CiCircleInfo size={23} />
                <span className="text-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300">
                  About us
                </span>
              </Link>
              <Link
                to={"/contact-us"}
                className="flex flex-col justify-center items-center p-1 hover:bg-white rounded-md hover:text-black w-20"
              >
                <AiOutlineContacts size={23} />
                <span className="text-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300">
                  Contact
                </span>
              </Link>

              {userInfo ? (
                <li
                  className="flex flex-col justify-center items-center p-1 hover:bg-white rounded-md hover:text-black w-20"
                  onClick={toggle}
                >
                  <AiOutlineUser size={23} />
                  <span className=" flex  items-center justify-evenly text-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300 mx-auto">
                    {userInfo.name.split(" ")[0]}{" "}
                    <span
                      className={`ml-2 transform ${
                        options ? "rotate-180" : "rotate-0"
                      } duration-300 ease-in-out`}
                    >
                      <MdArrowDropDown size={25} />
                    </span>
                  </span>
                </li>
              ) : (
                <Link
                  to={"/login"}
                  className="flex flex-col justify-center items-center p-1 hover:bg-white rounded-md hover:text-black w-20"
                >
                  <AiOutlineLogin size={23} />
                  <span className="text-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-300">
                    Login
                  </span>
                </Link>
              )}
            </ul>
            {options && (
              <div>
                <Options toggle={toggle} />
              </div>
            )}
          </nav>
          <nav className="sm:block lg:hidden ">
            <ul className="flex gap-3">
              {userInfo ? (
                <li
                  className="flex flex-col justify-center items-center p-1  w-20"
                  onClick={toggle}
                >
                  <AiOutlineUser size={20} />
                  <span className=" flex  items-center justify-center ">
                    {userInfo.name.split(" ")[0]}{" "}
                    <span
                      className={`ml-2 transform ${
                        options ? "rotate-180" : "rotate-0"
                      } duration-300 ease-in-out`}
                    >
                      <MdArrowDropDown size={25} />
                    </span>
                  </span>
                </li>
              ) : (
                <div></div>
              )}
              <li
                className="flex  justify-center items-center p-1  rounded-md  w-15"
                onClick={() => {
                  setOptions(false);
                  toggleM();
                }}
              >
                <MdMenu size={22} />
              </li>
            </ul>
            {options && (
              <div>
                <Options toggle={toggle} />
              </div>
            )}
            {model && <Modal toggle={toggleM} />}
          </nav>
        </header>
      </section>
    </>
  );
}

export default Nav;
