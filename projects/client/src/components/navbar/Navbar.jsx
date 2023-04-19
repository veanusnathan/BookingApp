import React, { useEffect, useRef, useState } from "react";
import logo from "../../supports/assets/logo.png";
import { FiMenu, FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {
  const location = useLocation();
  const { id } = useParams();
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef()  

  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);

  

  return (
    <>
      {location.pathname === "/dashboard" || location.pathname === "/dashboard-reservation" ||
      location.pathname === "/dashboard-register" || location.pathname === "/dashboard-profile" || location.pathname === "/dashboard-propertylist" || location.pathname === "/dashboard-createlisting" || location.pathname === "/dashboard-edit-price" || location.pathname === "/dashboard-createroom" || location.pathname === "/dashboard-sales-report" ||  location.pathname === `/tenant-activation/${id}` || location.pathname === "/dashboard-sales-report-room" ? null : (
        <div className="flex justify-between items-center ml-2 mr-2 border-b pb-5 md:pb-0 top-0 mt-5 md:pt-0 ">
          {/* Left */}
          <Link to="/" className="hidden md:flex ">
            <div className=" my-5 h-10 md:flex pl-3">
              <img src={`${process.env.REACT_APP_API_BASE_URL}Public/assets/logo.png`} className="object-cover my-1" alt="" />
            </div>
          </Link>
          <Link to="/" className="flex items-center md:hidden ">
            <div className="mb-2 ml-4 h-2 w-fit md:flex pl-3">
              <img src={`${process.env.REACT_APP_API_BASE_URL}Public/assets/logo-vcation02.png`} className="object-cover h-5 " alt="" />
            </div>
          </Link>

          

          {/* Right */}
          <div className="flex items-center pr-3 font-semibold text-gray-600">
            {localStorage.getItem("tokenTid") && 
            <div className="flex rounded-full px-4 py-2 hover:bg-[#c7c7c743] duration-100 ease-out">
            <Link to="/dashboard" className="hidden md:flex ">
              <p className="items-center mx-1 gap-1 text-[14px] font-semibold">
                Vcation your
              </p>
              <MdOutlineHomeWork className="text-[22px]" />
            </Link>
          </div>}

          {!localStorage.getItem("tokenTid") &&
          <div className="flex rounded-full px-4 py-2 hover:bg-[#c7c7c743] duration-100 ease-out">
          <Link to="/tenant-login" className="hidden md:flex ">
            <p className="items-center mx-1 gap-1 text-[14px] font-semibold">
              Vcation your
            </p>
            <MdOutlineHomeWork className="text-[22px]" />
          </Link>
        </div>}

          
            <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-[#c9403e] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#e58786] cursor-pointer"
            onClick={handleClick}
            >
              {props.data.username ? (
                <div className="font-bold capitalize">
                  {localStorage.getItem("token") ||
                  localStorage.getItem("tokenUid")
                    ? props.data.username
                    : null}
                </div>
              ) : (
                <AiOutlineUser className="text-[22px]" />
              )}
              <FiMenu className="text-[22px]" />
            </div>
            {/* </button> */}

           {showMenu && 
           
           <div className="drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3 transition duration-300 ease-in-out z-[1045]"
           ref={menuRef}>
           <ul>
             {localStorage.getItem("token") ||
             localStorage.getItem("tokenUid") ? (
               <>
                <Link to="/user-profile">
                 <li className="px-3  py-3  text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                   <span>
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       class="h-5 w-5"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                       />
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                       />
                     </svg>
                   </span>
                   <span> Profile </span>
                 </li>
                 </Link>
                 <li className="px-3 cursor-pointer py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400"
                 onClick={props.myFunc.onLogout}>
                   <span>
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-6 w-6"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                     >
                       <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         stroke-width="2"
                         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                       />
                     </svg>
                   </span>
                   <span> Sign Out </span>
                 </li>
               </>
             ) : (
               <>
                 <Link to="/login">
                   <li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                     <span>
                       <svg
                         data-name="Layer 1"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 128 128"
                         className="h-6 w-6"
                       >
                         <path d="M121.5 62.25H68.225l9.523-9.523a1.75 1.75 0 0 0-2.475-2.475L62.765 62.76a1.755 1.755 0 0 0-.221.271c-.025.038-.042.079-.064.118a1.045 1.045 0 0 0-.149.352c-.016.052-.036.1-.047.157a1.756 1.756 0 0 0 0 .685c.011.054.031.1.046.156a1.7 1.7 0 0 0 .053.17 1.732 1.732 0 0 0 .1.182c.022.039.039.081.065.119a1.755 1.755 0 0 0 .221.271l12.504 12.507a1.75 1.75 0 0 0 2.475-2.475l-9.523-9.523H121.5a1.75 1.75 0 0 0 0-3.5z" />
                         <path d="M96 72.25A1.75 1.75 0 0 0 94.25 74v36.9H49.209V17.1H94.25V54a1.75 1.75 0 0 0 3.5 0V15.35A1.75 1.75 0 0 0 96 13.6H49.209V6.5a1.75 1.75 0 0 0-2.461-1.6L6.94 22.593a1.751 1.751 0 0 0-1.039 1.6v79.615a1.751 1.751 0 0 0 1.039 1.6L46.748 123.1a1.75 1.75 0 0 0 2.461-1.6v-7.1H96a1.75 1.75 0 0 0 1.75-1.75V74A1.75 1.75 0 0 0 96 72.25zm-50.291 46.558L9.4 102.67V25.33L45.709 9.192z" />
                         <path d="M13.076 97.083a1.75 1.75 0 0 0 1.75-1.75V66.667a1.75 1.75 0 0 0-3.5 0v28.666a1.75 1.75 0 0 0 1.75 1.75z" />
                       </svg>
                     </span>
                     <span>Login </span>
                   </li>
                 </Link>
                 <Link to="/register">
                   <li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
                     <span>
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 48 48"
                         className="h-6 w-6 pr-1"
                       >
                         <g data-name="13-accounting">
                           <path d="M16 36H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h36a3 3 0 0 1 3 3v21h-2V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h13z" />
                           <path d="M45 48H21a3 3 0 0 1-3-3V29a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3zM21 28a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h24a1 1 0 0 0 1-1V29a1 1 0 0 0-1-1z" />
                           <path d="M19 30h28v2H19zM19 34h28v2H19zM22 38h4v2h-4zM28 38h4v2h-4zM34 38h4v2h-4zM40 38h4v2h-4zM1 8h37v2H1zM4 4h2v2H4zM8 4h2v2H8zM12 4h2v2h-2zM36 4h2v2h-2zM10 22a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3z" />
                           <path d="M8 4h2v2H8z" />
                           <path d="M8 4h2v2H8z" />
                           <path d="M8 4h2v2H8zM15 30H5a1 1 0 0 1-1-1v-3a6 6 0 0 1 12 0v3a1 1 0 0 1-1 1zm-9-2h8v-2a4 4 0 0 0-8 0zM18 9h2v15h-2zM27 13h10v2H27zM23 17h14v2H23zM23 21h10v2H23zM23 13h2v2h-2zM35 21h2v2h-2z" />
                         </g>
                       </svg>
                     </span>
                     <span> Sign Up </span>
                   </li>
                 </Link>
               </>
             )}
           </ul>
         </div>}

            {/* <div
              className="invisible fixed bottom-0 top-0 right-0 z-[1045] flex w-96 max-w-full translate-x-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out lg:dark:bg-neutral-800 lg:dark:text-neutral-200 [&[data-te-offcanvas-show]]:transform-none"
              tabindex="-1"
              id="Menu"
              aria-labelledby="offcanvasRightLabel"
              data-te-offcanvas-init
            >
              <div className="flex items-center justify-between p-4">
                <h5
                  className="mb-0 font-semibold leading-normal"
                  id="offcanvasRightLabel"
                >
                  Menu
                </h5>
                <button
                  type="button"
                  className="box-content rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-offcanvas-dismiss
                >
                  <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </button>
              </div> */}

            {/* <div className="offcanvas-body flex-grow overflow-y-auto p-4">
                {localStorage.getItem("token") ? (
                  <>
                    <div className="login mb-5 hover:shadow-lg pointer">
                      <Link to="/user-profile"> Profile </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="login mb-5 hover:shadow-lg pointer">
                      <Link to="/login"> Login </Link>
                    </div>
                    <div className="signup hover:shadow-lg">
                      <div className="login mb-3 hover:shadow-lg pointer">
                        <Link to="/register"> Sign Up </Link>
                      </div>
                    </div>
                  </>
                )}


                <div
                  className="signout"
                  style={{ position: "absolute", bottom: 0 }}
                >
                  <button
                    className="hover:shadow-lg pointer mb-5 "
                    onClick={props.myFunc.onLogout}
                  >
                    {localStorage.getItem("token") ||
                    localStorage.getItem("tokenUid") ? (
                      <div className="login mb-5 hover:shadow-lg pointer">
                        Sign Out
                      </div>
                    ) : null}
                  </button>
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
