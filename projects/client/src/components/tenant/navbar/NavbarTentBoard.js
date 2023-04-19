import React from "react";

import { FiMenu } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import {
  BsHouseAddFill,
  BsFillHousesFill,
  BsFillHouseGearFill,
} from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";

const NavbarDashboard = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%]">
      <div className="flex justify-between items-center sm:mx-6 md:mx-10 lg:mx-12">
        {/* Left */}
        <div className="flex h-10 my-5 pl-3">
          <img src={`${process.env.REACT_APP_API_BASE_URL}Public/assets/logo.png`} className="object-cover my-1" />
        </div>

        {/* Middle */}
        <div className="hidden xl:flex justify-center items-center rounded-full relative">
          <a
            href="#"
            class="text-base text-gray-900 rounded-lg font-normal hover:bg-gray-100 flex items-center p-2 group "
          >
            <svg
              class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="ml-3 flex-1 whitespace-nowrap">Profile</span>
          </a>
          <div class="flex justify-center">


            <div>
              <div class="relative  " data-te-dropdown-ref>
                <button
                  class="flex items-center whitespace-nowrap pt-2.5 pb-2 text-[16px] text-gray-700 font-medium leading-normal transition duration-150 ease-in-out  focus:outline-none focus:ring-0  motion-reduce:transition-none "
                  type="button"
                  id="dropdownMenuButton1"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <a
                    href="#"
                    class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <BsFillHouseGearFill className="text-[20px] text-gray-500" />
                    <span class="ml-1 flex whitespace-nowrap">Listings</span>
                    <span class="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </a>
                </button>
                <ul
                  class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-white [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton1"
                  data-te-dropdown-menu-ref
                >
                  <li>
                    <a
                      href="#"
                      class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                    >
                      <BsFillHousesFill className="text-[20px] text-gray-500" />
                      <span class="ml-1 flex whitespace-nowrap">
                        Property list
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                    >
                      <BsHouseAddFill className="text-[20px] text-gray-500" />
                      <span class="ml-1 flex whitespace-nowrap">
                        Create a new listing
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              
            </div>
          </div>
          <a
            href="#"
            target="_blank"
            class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
          >
            <FaCalendar className="text-[20px] text-gray-500" />
            <span class="ml-1 whitespace-nowrap">Calendar</span>
          </a>
          <a
            href="#"
            target="_blank"
            class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
          >
            <GrTransaction className="text-[20px] text-gray-500" />
            <span class="ml-1 whitespace-nowrap">Reservations</span>
          </a>
          <a
            href="#"
            target="_blank"
            class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
          >
            <svg
              class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="ml-1 whitespace-nowrap">Report</span>
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center pr-3 font-semibold text-gray-600">
          <div className="flex rounded-full px-4 py-2 duration-100 ease-out">
            <a
              href="#"
              class="hidden sm:inline-flex bg-[#c9403e] text-white shadow-sm shadow-gray-300 hover:bg-[#e58786] duration-100 ease-out font-medium rounded-full text-sm px-5 py-2.5 text-center items-center"
            >
              <MdOutlineHomeWork className="text-[14px] mr-1" />
              Tenant Dashboard
            </a>
          </div>

          <div className="flex items-center border px-3 py-2 rounded-full gap-1 bg-[#c9403e] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#e58786] duration-100 ease-out">
            <AiOutlineUser className="text-[22px]" />
            <FiMenu className="text-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
