import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "components/modal/modal";

const Reservation = () => {
  const [status, setStatus] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const tenant = location.pathname === "/dashboard-reservation";
  const user = location.pathname === "/user-reservation";

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const todayTime = new Date (formattedDate)


  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    status_id: "",
    order_id: "",
    sort_by: "",
  });

  const handleClearForm = () => {
    setForm({
      startDate: "",
      endDate: "",
      status_id: "",
      order_id: "",
      sort_by: "",
    });
  };

  const getStatus = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}transaction/status`);
      setStatus(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const _form = {
      ...form,
      [name]: value,
    };
    setForm(_form);
  };

  const userTransaction = async () => {
    try {
      if (localStorage.getItem("token") && user) {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}transaction/order-list?start_date=${form?.startDate}&end_date=${form?.endDate}&status_id=${form?.status_id}&page=${currentPage}`,
          {},
          {
            headers: {
              auth: localStorage.getItem("token"),
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setTotalPages(res.data.total_pages);
        setOrderList(res.data.data);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const tenantOrderList = async() => {
    try {
      if (localStorage.getItem("tokenTid") && tenant) {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}transaction/tenant-orderList`,
          {
            page: currentPage,
            status_id: form?.status_id,
            start_date: form?.startDate,
            end_date: form?.endDate
          },
          {
            headers: {
              auth: localStorage.getItem("tokenTid"),
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        setTotalPages(res.data.total_pages);
        setOrderList(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStatus();
    userTransaction();
    tenantOrderList();
  }, [currentPage, form]);


  return (
    <>
      {tenant ? (
        <>
          {localStorage.getItem("tokenTid") && (
            <>
              {/* <NavbarDashboard /> */}

              {/* isi dashboard background*/}
              <div
                id="main-content"
                className="h-full w-full bg-transparent rounded-lg relative overflow-y-auto z-0 mb-24 md:0"
              >
               
                {/* isi dashboard data*/}

                <body className="antialiased font-sans bg-transparent">
                  <div className="container md:mx-auto md:px-2">
                    <div className="py-8">
                      <div>
                        <h2 className="text-2xl font-semibold leading-tight">
                          Reservations
                        </h2>
                      </div>
                      <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">
                          <div className="relative">
                            <div className="flex">
                              <select
                                className=" h-full rounded-r border-t border-l border-r border-b block appearance-none bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                onChange={(e) => handleChange(e)}
                                value={form?.status_id}
                                name="status_id"
                              >
                                <option selected value={""}>
                                  All
                                </option>
                                {status
                                  ? status.map((value, idx) => {
                                      return (
                                        <>
                                          <option value={value.id} key={idx}>
                                            {value.name}
                                          </option>
                                        </>
                                      );
                                    })
                                  : "Loading"}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Calendar */}
                           <div className="relative">
                            <div className="flex">
                              {/* start date */}
                              <input
                                type="date"
                                placeholder="Start Date"
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-3.5 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={form.startDate}
                                name="startDate"
                                onChange={handleChange}
                              />
                              {/* endDate */}
                              <input
                                type="date"
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-3.5 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={form.endDate}
                                name="endDate"
                                onChange={handleChange}
                              />
                              {form?.startDate && (
                                <button
                                  className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                  onClick={handleClearForm}
                                >
                                  Clear Dates
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                          <table className="min-w-full leading-normal">
                            <thead>
                              <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Property Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  ORDER ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Booked
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Check-In
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Checkout
                                </th>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Status Reservations
                                </th>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Status Payment
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {orderList &&
                                orderList?.map((value, index) => {
                                  return (
                                    <>
                                      <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <Link
                                            to={`/tenant-transaction/${value?.transaction?.room_id}/${value?.transaction?.order_id}`} state={value?.transaction?.users_id}
                                          >
                                            <div className="flex items-center">
                                              <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                                <img
                                                  src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.room?.room_images?.[0]
                                                  ?.image_path}`}
                                                  alt=""
                                                />
                                              </div>
                                              <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap capitalize">
                                                  {value?.property?.name}{" "}
                                                  {value?.room?.name}
                                                </p>
                                              </div>
                                            </div>
                                          </Link>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.transaction?.order_id}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.transaction?.createdAt?.split("T")[0]}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.transaction?.check_in?.split("T")[0]}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.transaction?.check_out?.split("T")[0]}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          {value?.transaction?.status_id === 4 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                                              ></span>
                                              <span className="relative">
                                                Upcoming
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 7 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                                              ></span>
                                              <span className="relative">
                                                Upcoming
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 2 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-green-200"
                                              ></span>
                                              <span className="relative">
                                                Completed
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 3 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                              ></span>
                                              <span className="relative">
                                                Canceled
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 8 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                              ></span>
                                              <span className="relative">
                                                Canceled
                                              </span>
                                            </span>
                                          )}
                                        </td>
                                        <td className="px-1 py-5 border-b border-gray-200 bg-white text-sm">
                                          {value?.transaction?.status_id === 2 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                             
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-green-200"
                                              ></span>
                                              <span className="relative">
                                                Paid
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 3 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                              ></span>
                                              <span className="relative">
                                                Cancel
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 8 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                              ></span>
                                              <span className="relative">
                                                Rejected
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 4 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight"
                                              
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                                              ></span>
                                              <span className="relative">
                                                Waiting Payment
                                              </span>
                                            </span>
                                          )}
                                          {value?.transaction?.status_id === 7 && (
                                            <span
                                              className="relative inline-block px-5 pr-7 py-1 font-semibold text-purple-900 leading-tight"
                                             
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-purple-200"
                                              ></span>
                                              <span className="relative">
                                                Waiting Approval
                                              </span>
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                            </tbody>
                          </table>
                          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                            <span className="text-xs xs:text-sm text-gray-900">
                             Page {currentPage}, Showing 1 to {orderList?.length} data of {totalPages} Pages
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                              <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                                onClick={() => {
                                  if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                  }
                                }}
                              >
                                Prev
                              </button>
                              <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                                onClick={() => {
                                  if (currentPage < totalPages) {
                                    setCurrentPage(currentPage + 1);
                                  }
                                }}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </body>
              </div>
            </>
          )}
        </>
      ) : null}

   

      {user ? (
        <>
          {localStorage.getItem("token") && (
            <>
              {/* <NavbarDashboard /> */}

              {/* isi dashboard background*/}
              
              <div
                id="main-content"
                className="h-full w-full bg-transparent rounded-lg relative overflow-y-auto z-0 mb-24 md:0"
              >
               
                {/* isi dashboard data*/}

                <body className="antialiased font-sans bg-transparent">
                  <div className="container md:mx-auto md:px-2">
                    <div className="py-8">
                      <div>
                        <h2 className="text-2xl font-semibold leading-tight">
                          Reservations
                        </h2>
                      </div>
                      <div className="my-2 flex sm:flex-row flex-col">
                        <div className="flex flex-row mb-1 sm:mb-0">
                          {/* status */}
                          <div className="relative">
                            <div className="flex">
                              <select
                                className=" h-full rounded-r border-l border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                onChange={(e) => handleChange(e)}
                                value={form.status_id}
                                name="status_id"
                              >
                                <option selected value={""}>
                                  All
                                </option>
                                {status
                                  ? status.map((value, idx) => {
                                      return (
                                        <>
                                          <option value={value.id} key={idx}>
                                            {value.name}
                                          </option>
                                        </>
                                      );
                                    })
                                  : "Loading"}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  className="fill-current h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          {/* Calendar */}
                          <div className="relative">
                            <div className="flex">
                              {/* start date */}
                              <input
                                type="date"
                                placeholder="Start Date"
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-3.5 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={form.startDate}
                                name="startDate"
                                onChange={handleChange}
                              />
                              {/* endDate */}
                              <input
                                type="date"
                                className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-3.5 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                value={form.endDate}
                                name="endDate"
                                onChange={handleChange}
                              />
                              {form?.startDate && (
                                <button
                                  className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-[9px] px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                  onClick={handleClearForm}
                                >
                                  Clear Dates
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 ">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                          <table className="min-w-full leading-normal">
                            <thead>
                              <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Property Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  ORDER ID
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Booked
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Check-In
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Checkout
                                </th>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Status Reservations
                                </th>
                                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Status Payment
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {orderList &&
                                orderList.map((value, index) => {
                                  const checkoutTime = new Date (value?.check_out?.split("T")[0])
                                  return (
                                    <>
                                    <Modal />
                                      <tr key={index}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <Link
                                            to={`/transaction/${value?.room_id}/${value?.order_id}`}
                                          >
                                            <div className="flex items-center">
                                              <div className="overflow-hidden rounded-md w-36 h-24 bg-gray-50 border border-gray-200">
                                                <img
                                                  src={`${process.env.REACT_APP_API_BASE_URL}Public/PROPERTY/${value?.room?.room_images?.[0]?.image_path}`}
                                                  alt=""
                                                />
                                              </div>
                                              <div className="ml-3">
                                                <p className="text-gray-900 whitespace-pre-wrap font-semibold">
                                                  {value?.room?.property?.name},{" "}
                                                  {value?.room?.name} Type
                                                </p>
                                              </div>
                                            </div>
                                          </Link>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.order_id}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.createdAt?.split("T")[0]}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.check_in?.split("T")[0]}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {value?.check_out?.split("T")[0]}
                                          </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          {value?.status_id === 4 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight"
                                            
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                                              ></span>
                                              <span className="relative">
                                                Upcoming
                                              </span>
                                            </span>
                                          )}
                                          {value?.status_id === 7 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight"
                                             
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                                              ></span>
                                              <span className="relative">
                                                Upcoming
                                              </span>
                                            </span>
                                          )}
                                          {value?.status_id === 2 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                             
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-green-200"
                                              ></span>
                                              <span className="relative">
                                                Completed
                                              </span>
                                            </span>
                                          )}
                                          {value?.status_id === 3 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                             
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                              ></span>
                                              <span className="relative">
                                                Canceled
                                              </span>
                                            </span>
                                          )}
                                          {value?.status_id === 8 && (
                                            <span
                                            className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                       
                                          >
                                            <span
                                              aria-hidden
                                              className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                            ></span>
                                            <span className="relative">
                                              Canceled
                                            </span>
                                          </span>
                                          )}
                                        </td>
                                        <td className="px-1 py-5 border-b border-gray-200 bg-white text-sm">
                                          {value?.status_id === 2 && (
                                            <>{todayTime >= checkoutTime ? 
                                            <Link to={`/room-details/${value?.room_id}`}>
                                            <span
                                              className="inline-block px-3 py-1 font-bold "
                                            >
                                               Leave a Review
                                            </span>
                                            </Link>
                                            :
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                            
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-green-200"
                                              ></span>
                                              <span className="relative">
                                               Paid
                                              </span>
                                            </span>}
                                            </>
                                          )}
                                          {value?.status_id === 3 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                              // style={{ backgroundColor: "#FEE2E2" }}
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                              ></span>
                                              <span className="relative">
                                                Cancel
                                              </span>
                                            </span>
                                          )}
                                          {value?.status_id === 8 && (
                                            <span
                                              className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                                              // style={{ backgroundColor: "#FEE2E2" }}
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-red-200"
                                              ></span>
                                              <span className="relative">
                                                Rejected
                                              </span>
                                            </span>
                                          )}
                                          {value?.status_id === 4 && (
                                            <span
                                              className="relative inline-block px-2 overflow-x-auto py-3 font-semibold text-yellow-900 leading-tight"
                                              // style={{ backgroundColor: "#FEF3C7" }}
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-yellow-200"
                                              ></span>
                                              <span className="relative whitespace-nowrap">
                                                Waiting Payment
                                              </span>
                                            </span>
                                          )}
                                          {value?.status_id === 7 && (
                                            <span
                                              className="relative inline-block px-2 overflow-x-auto py-3 mr-2 font-semibold text-purple-900 leading-tight"
                                              // style={{ backgroundColor: "#EDE9FE" }}
                                            >
                                              <span
                                                aria-hidden
                                                className="absolute inset-0 opacity-50 rounded-full bg-purple-200"
                                              ></span>
                                              <span className="relative whitespace-nowrap">
                                                Waiting Approval
                                              </span>
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                            </tbody>
                          </table>
                          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between ">
                            <span className="text-xs xs:text-sm text-gray-900">
                            Page {currentPage}, Showing 1 to {orderList?.length} data of{" "}
                              {totalPages} Pages
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                              <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                                onClick={() => {
                                  if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1);
                                  }
                                }}
                              >
                                Prev
                              </button>
                              <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                                onClick={() => {
                                  if (currentPage < totalPages) {
                                    setCurrentPage(currentPage + 1);
                                  }
                                }}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </body>
              </div>
              {/* </div> */}
              {/* </div> */}
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default Reservation;
