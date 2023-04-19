import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import NotificationDropdown from "./../notification/notification";
import UserDropdown from "./../userDropdown/userDropdown";
import { BsHouseAdd, BsHouses, BsHouseGear, BsPerson } from "react-icons/bs";
import { MdLogin, MdAppRegistration } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineDocumentReport } from "react-icons/hi";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");

  const navigate = useNavigate()

  let onLogout = () => {
    localStorage.removeItem("tokenTid");
    return navigate('/tenant-login')
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer  opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent hover:scale-105 duration-500"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Tenant Dashboard
          </Link>

          {/* User / shows when its small */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            {/* <li className="inline-block relative">
              <NotificationDropdown />
            </li> */}
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Tenant Dashboard
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent hover:scale-105 duration-500"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {localStorage.getItem("tokenTid") ? (
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                {/* sidebar Dashboard */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500"
                    to="/dashboard"
                  >
                    <RxDashboard className="text-[23px] mr-1 text-black" /> Main
                    Dashboard
                  </Link>
                </li>

                {/* sidebar Landing Page */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500"
                    to="/"
                  >
                    <RiPagesLine className="text-[23px] mr-1 text-black" />
                    Landing Page
                  </Link>
                </li>

                {/* sidebar Profile Page */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500"
                    to="/dashboard-profile"
                  >
                    <BsPerson className="text-[23px] mr-1 text-black" />
                    Profile Page
                  </Link>
                </li>

                {/* sidebar Reservation */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500"
                    to="/dashboard-reservation"
                  >
                    <GrTransaction className="text-[23px] mr-1 text-black" />
                    Reservation
                  </Link>
                </li>

                {/* sidebar Property List */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500"
                    to="/dashboard-propertylist"
                  >
                    <BsHouses className="text-[23px] mr-1 text-black" />
                    Property List
                  </Link>
                </li>

                {/* sidebar Sales Report List */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500"
                    to="/dashboard-sales-report"
                  >
                    <HiOutlineDocumentReport className="text-[23px] mr-1 text-black" />
                    Sales Report
                  </Link>
                </li>

                {/* sidebar create property */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500"
                    to="/dashboard-createlisting"
                  >
                    <BsHouseAdd className="text-[23px] mr-1 text-black" />
                    Create a new listing
                  </Link>
                </li>

                <li className="items-center">
                <button
          className={
            "text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500  "
          }
          onClick={() => onLogout()}
        >
          Sign Out
        </button>
                </li>
              </ul>
            ) : (
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                {/* tenant dashboard non-login */}
                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group"
                    to="/"
                  >
                    <RxDashboard className="text-[23px] mr-1 text-black" />
                    Dashboard
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group"
                    to="/"
                  >
                    <RiPagesLine className="text-[23px] mr-1 text-black" />
                    Landing Page
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group"
                    to="/user-profile"
                  >
                    <BsPerson className="text-[23px] mr-1 text-black" />
                    Profile Page
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group"
                    to="/tenant-login"
                  >
                    <MdLogin className="text-[23px] mr-1 text-black" />
                    Login
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className="text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group"
                    to="/tenant-register"
                  >
                    <MdAppRegistration className="text-[23px] mr-1 text-black" />
                    Register
                  </Link>
                </li>
                <li>
                <button
          className={
            "text-sm text-black rounded-lg font-bold uppercase hover:bg-gray-100 flex items-center p-3 py-3 group hover:scale-105 duration-500 focus:bg-emerald-500  "
          }
          onClick={() => onLogout()}
        >
          Sign Out
        </button>
                </li>
              </ul>
              
            )}
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
