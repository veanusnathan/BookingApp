import React from "react";
import { MdOutlineHomeWork } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaCalendar } from "react-icons/fa";
import { BsHouseAddFill, BsFillHousesFill } from "react-icons/bs";

const dashboardTenant = () => {
  return (
    <>
      <div className="">
        <nav class="w-full top-20 border-b sticky z-30">
          <div class="py-3 lg:px-3 bg-white/[95%]">
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                <div className=" text-gray-400">
                  <a
                    href="#"
                    className="focus:outline-none hover:underline text-gray-500"
                  >
                    Homepage
                  </a>{" "}
                  / <span className="text-gray-600">Tenant Dashboard</span>
                </div>
              </div>

              <div class="flex justify-center">
                <div class="my-3 xl:w-80">
                  <div class="relative flex w-full flex-wrap items-stretch">
                    <input
                      type="search"
                      class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l-full border border-solid border-gray-500 bg-gray-100 bg-clip-padding px-3 py-1.5 text-base font-normal text-black outline-none transition duration-300 ease-in-out focus:border-[#c9403e] focus:text-black focus:shadow-te-primary focus:outline-none dark:text-black dark:placeholder:text-gray-600"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="button-addon1"
                    />
                    <button
                      class="relative z-[2] flex items-center rounded-r-full bg-[#c9403e] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-[#c9403e] hover:shadow-lg focus:bg-[#c9403e] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#c9403e] active:shadow-lg"
                      type="button"
                      id="button-addon1"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* isi dashboard background*/}
        <div className="">
          <div
            id="main-content"
            class="h-full w-full bg-black rounded-lg relative overflow-y-auto "
          >
            <div class="py-4 pb-20 px-4">
              {/* isi dashboard data*/}

              <body class="antialiased font-sans bg-gray-200">
                <div class="container mx-auto px-4 sm:px-8">
                  <div class="py-8">
                    <div>
                      <h2 class="text-2xl font-semibold leading-tight">
                        Reservations
                      </h2>
                    </div>
                    <div class="my-2 flex sm:flex-row flex-col">
                      <div class="flex flex-row mb-1 sm:mb-0">
                        <div class="relative">
                          <select class=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                            <option>Upcoming</option>
                            <option>Completed</option>
                            <option>Canceled</option>
                            <option>All</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              class="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                        <div class="relative">
                          <select class=" h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                            <option>Paid</option>
                            <option>Cancel</option>
                            <option>Waiting payment</option>
                            <option>Waiting approval</option>
                            <option>All</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              class="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table class="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                User
                              </th>
                              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              ORDER ID
                              </th>
                              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Booked
                              </th>
                              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Check-In
                              </th>
                              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Checkout
                              </th>
                              <th class="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status Reservations
                              </th>
                              <th class="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status Payment
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Upcoming</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Paid</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Completed</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Paid</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Canceled</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Cancel</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Upcoming</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Waiting payment</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Upcoming</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Waiting approval</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Completed</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Paid</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Canceled</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Cancel</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Upcoming</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Waiting payment</span>
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Canceled</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Cancel</span>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td class="px-5 py-5 bg-white text-sm">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    <img
                                      class="w-full h-full rounded-full"
                                      src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                                      alt=""
                                    />
                                  </div>
                                  <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                      Gigi Hartono
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td class="px-5 py-5 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  123188
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 15, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 21, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  Jan 22, 2023
                                </p>
                              </td>
                              <td class="px-5 py-5 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Upcoming</span>
                                </span>
                              </td>
                              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span class="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                  <span
                                    aria-hidden
                                    class="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
                                  ></span>
                                  <span class="relative">Waiting approval</span>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                          <span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 10 of 20 Entries
                          </span>
                          <div class="inline-flex mt-2 xs:mt-0">
                            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                              Prev
                            </button>
                            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </body>

              {/* <div class="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        Rp
                      </span>{" "}
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        700.000
                      </span>
                      <h3 class="text-base font-normal text-gray-500">
                        Sales this month
                      </h3>
                    </div>

                    <div class="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      12.5%
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div id="main-chart"></div>
                </div>
                <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div class="mb-4 flex items-center justify-between">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900 mb-2">
                        Latest Transactions
                      </h3>
                      <span class="text-base font-normal text-gray-500">
                        This is a list of latest transactions
                      </span>
                    </div>
                    <div class="flex-shrink-0">
                      <a
                        href="#"
                        class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                  <div class="flex flex-col mt-8">
                    <div class="overflow-x-auto rounded-lg">
                      <div class="align-middle inline-block min-w-full">
                        <div class="shadow overflow-hidden sm:rounded-lg">
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Transaction
                                </th>
                                <th
                                  scope="col"
                                  class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date & Time
                                </th>
                                <th
                                  scope="col"
                                  class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody class="bg-white">
                              <tr>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment from{" "}
                                  <span class="font-semibold">
                                    Gigi Hartono
                                  </span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Mar 22 ,2023
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Rp430.000
                                </td>
                              </tr>
                              <tr class="bg-gray-50">
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                  Payment refund to{" "}
                                  <span class="font-semibold">#212</span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 23 ,2023
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  -Rp70.0000
                                </td>
                              </tr>
                              <tr>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment failed from{" "}
                                  <span class="font-semibold">#230203</span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 18 ,2023
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Rp230.203
                                </td>
                              </tr>
                              <tr class="bg-gray-50">
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                  Payment from{" "}
                                  <span class="font-semibold">Ginanjar</span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 15 ,2023
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Rp899.000
                                </td>
                              </tr>
                              <tr>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment from{" "}
                                  <span class="font-semibold">Jaka</span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 15 ,2023
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Rp430.000
                                </td>
                              </tr>
                              <tr class="bg-gray-50">
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                  Payment from{" "}
                                  <span class="font-semibold">Tri</span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 11 ,2023
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Rp98.000
                                </td>
                              </tr>
                              <tr>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment from{" "}
                                  <span class="font-semibold">Putra</span>
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  Apr 6 ,2023
                                </td>
                                <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  Rp210.000
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        2,340
                      </span>
                      <h3 class="text-base font-normal text-gray-500">
                        New products this week
                      </h3>
                    </div>
                    <div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      14.6%
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        5,355
                      </span>
                      <h3 class="text-base font-normal text-gray-500">
                        Visitors this week
                      </h3>
                    </div>
                    <div class="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      32.9%
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        385
                      </span>
                      <h3 class="text-base font-normal text-gray-500">
                        User signups this week
                      </h3>
                    </div>
                    <div class="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                      -2.7%
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold leading-none text-gray-900">
                      Latest Customers
                    </h3>
                    <a
                      href="#"
                      class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
                    >
                      View all
                    </a>
                  </div>
                  <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200">
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                            <img
                              class="h-8 w-8 rounded-full"
                              src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
                              alt="Neil image"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                              Neil Sims
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                class="__cf_email__"
                                data-cfemail="17727a767e7b57607e7973646372653974787a"
                              >
                                [email&#160;protected]
                              </a>
                            </p>
                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900">
                            $320
                          </div>
                        </div>
                      </li>
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                            <img
                              class="h-8 w-8 rounded-full"
                              src="https://demo.themesberg.com/windster/images/users/bonnie-green.png"
                              alt="Neil image"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                              Bonnie Green
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                class="__cf_email__"
                                data-cfemail="d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9"
                              >
                                [email&#160;protected]
                              </a>
                            </p>
                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900">
                            $3467
                          </div>
                        </div>
                      </li>
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                            <img
                              class="h-8 w-8 rounded-full"
                              src="https://demo.themesberg.com/windster/images/users/michael-gough.png"
                              alt="Neil image"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                              Michael Gough
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                class="__cf_email__"
                                data-cfemail="57323a363e3b17203e3933242332257934383a"
                              >
                                [email&#160;protected]
                              </a>
                            </p>
                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900">
                            $67
                          </div>
                        </div>
                      </li>
                      <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                            <img
                              class="h-8 w-8 rounded-full"
                              src="https://demo.themesberg.com/windster/images/users/thomas-lean.png"
                              alt="Neil image"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                              Thomes Lean
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                class="__cf_email__"
                                data-cfemail="284d45494144685f41464c5b5c4d5a064b4745"
                              >
                                [email&#160;protected]
                              </a>
                            </p>
                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900">
                            $2367
                          </div>
                        </div>
                      </li>
                      <li class="pt-3 sm:pt-4 pb-0">
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
                            <img
                              class="h-8 w-8 rounded-full"
                              src="https://demo.themesberg.com/windster/images/users/lana-byrd.png"
                              alt="Neil image"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                              Lana Byrd
                            </p>
                            <p class="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                class="__cf_email__"
                                data-cfemail="a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf"
                              >
                                [email&#160;protected]
                              </a>
                            </p>
                          </div>
                          <div class="inline-flex items-center text-base font-semibold text-gray-900">
                            $367
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <h3 class="text-xl leading-none font-bold text-gray-900 mb-10">
                    Acquisition Overview
                  </h3>
                  <div class="block w-full overflow-x-auto">
                    <table class="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Top Channels
                          </th>
                          <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Users
                          </th>
                          <th class="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        <tr class="text-gray-900">
                          <th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            Organic Search
                          </th>
                          <td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                            5,649
                          </td>
                          <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            <div class="flex items-center">
                              <span class="mr-2 text-xs font-medium">30%</span>
                              <div class="relative w-full">
                                <div class="w-full bg-gray-200 rounded-sm h-2">
                                  <div class="bg-cyan-600 h-2 rounded-sm"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr class="text-gray-500">
                          <th class="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            Referral
                          </th>
                          <td class="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                            4,025
                          </td>
                          <td class="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            <div class="flex items-center">
                              <span class="mr-2 text-xs font-medium">24%</span>
                              <div class="relative w-full">
                                <div class="w-full bg-gray-200 rounded-sm h-2">
                                  <div class="bg-orange-300 h-2 rounded-sm"></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboardTenant;
