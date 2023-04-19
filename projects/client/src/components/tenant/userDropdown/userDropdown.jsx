import React, {useState, useRef} from "react";
import { createPopper } from "@popperjs/core";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BsHouseAdd, BsHouses, BsHouseGear, BsPerson } from "react-icons/bs";
import { MdLogin, MdAppRegistration } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import {HiOutlineDocumentReport} from "react-icons/hi"

const UserDropdown = (props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState();
  const btnDropdownRef = useRef();
  const popoverDropdownRef = useRef();

  const location = useLocation()
  const navigate = useNavigate()


  const dashboard = location.pathname === '/dashboard' 
  const reservation = location.pathname === '/dashboard-reservation'
  const createProperty = location.pathname === '/dashboard-createlisting'
  const propertyList = location.pathname === '/dashboard-propertylist'
  const salesReport = location.pathname === '/dashboard-sales-report'
  const roomReport = location.pathname === '/dashboard-sales-report-room'
  const createRoom = location.pathname === '/dashboard-createroom'
  const profile = location.pathname === '/dashboard-profile'
  

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  let onLogout = () => {
    localStorage.removeItem("tokenTid");
    return navigate('/tenant-login')
  }

  // if(!localStorage.getItem("tokenTid")){
  //   navigate("/tenant-login")
  // }

  return (
    <>
    {/* Dashboard */}
    {dashboard || reservation || createProperty || createRoom || propertyList || salesReport || roomReport ?
    <>
    <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={!props?.picture ? `https://tecdn.b-cdn.net/img/new/avatars/2.webp` : 
              `http://localhost:5000/${props?.picture}`
            }
            />
          </span>
        </div>
      </a>
      {/* <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 md:hidden"
                    to="/dashboard"
                  >
                    <RxDashboard className="text-[23px] mr-1 text-black" /> Main
                    Dashboard
                  </Link>
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 md:hidden"
                    to="/"
                  >
                    <RiPagesLine className="text-[23px] mr-1 text-black" />
                    Landing Page
                  </Link>
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 md:hidden"
                    to="/dashboard-profile"
                  >
                    <BsPerson className="text-[23px] mr-1 text-black" />
                    Profile Page
                  </Link>
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 md:hidden"
                    to="/dashboard-reservation"
                  >
                    <GrTransaction className="text-[23px] mr-1 text-black" />
                    Reservation
                  </Link>
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 md:hidden"
                    to="/dashboard-propertylist"
                  >
                    <BsHouses className="text-[23px] mr-1 text-black" />
                    Property List
                  </Link>
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 md:hidden"
                    to="/dashboard-sales-report"
                  >
                    <HiOutlineDocumentReport className="text-[23px] mr-1 text-black" />
                    Sales Report
                  </Link>
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 md:hidden"
                    to="/dashboard-createlisting"
                  >
                    <BsHouseAdd className="text-[23px] mr-1 text-black" />
                    Create a new listing
                  </Link>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          className={
            "text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500 "
          }
          onClick={() => onLogout()}
        >
          Sign Out
        </button>
      </div> */}
    </>  : null }
      

      {/* Profile */}
      {profile && 
      <>
      <a
        className="text-blueGray-500 block"
        href="#"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={!props?.picture ? `https://tecdn.b-cdn.net/img/new/avatars/2.webp` : 
              `http://localhost:5000/${props?.picture}`
            }
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        <a
          href="#"
          className={
            "text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500  "
          }
          // onClick={e => e.preventDefault()}
          data-te-target="#changePictureTenant"
          data-te-toggle="modal"
          role="button"
        >
          Change Picture
        </a>
        <a
          href="#"
          className={
            "text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500  "
          }
          // onClick={e => e.preventDefault()}
          data-te-target="#editProfileTenant"
          data-te-toggle="modal"
          role="button"
        >
          Edit Profile
        </a>
        <a
          href="#"
          className={
            "text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500  "
          }
          // onClick={e => e.preventDefault()}
          data-te-target="#changePasswordTenant"
          data-te-toggle="modal"
          role="button"
        >
          Change Password
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <button
          className={
            "text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500  "
          }
          onClick={() => onLogout()}
        >
          Sign Out
        </button>
      </div>
      </>}
    </>
  );
};

export default UserDropdown;