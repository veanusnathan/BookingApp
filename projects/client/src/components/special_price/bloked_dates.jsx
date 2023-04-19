import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loader from "components/loader/loader";
import Modal from "./../tenant/modal/modalTenant";
import TenantCalendars from "components/tenant/calendar/tenant_calendar";
import Date from "components/date/date";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";

import ModalTenant from "components/tenant/modal/modalTenant";

function BlockedDates() {
  const location = useLocation();
  const id = location?.state?.id;

  console.log(id)

  const [blocked, setBlocked] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTokenId = localStorage.getItem("tokenTid");

  const [form, setForm] = useState({
    reason: "",
    start_date: "",
    end_date: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}transaction/get-blockedDate?room_id=${id}`
      );
      console.log(res);
      setBlocked(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let _form = {
      ...form,
      [name]: value,
    };

    setForm(_form);
  };

  const blockedRoom = async () => {
    try {
      setLoading(true);
      if (!form?.reason) throw { message: "Please Give a Reason" };
      if (!form?.start_date || !form.end_date)
        throw { message: "Please select date" };

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}transaction/blocked-date`,
        {
          reason: form?.reason,
          start_date: form?.start_date,
          end_date: form?.end_date,
          room_id: id,
        }
      );

      console.log(res);
      setTimeout(() => {
        toast.success(res?.data?.message);
      }, 3500);

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      setLoading(false);
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  if (!getTokenId) {
    navigate("/tenant-login");
  }
  return (
    <>
      <div className="relative my-bg-light md:pt-20 pb-32 mt-5 shadow-lg rounded-lg">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="w-full h-14 pt-2 text-center  bg-gray-700  shadow overflow-hidden sm:rounded-t-lg font-bold text-3xl text-white ">
            Block Room
          </div>
          <div className="border rounded-b-lg border-gray-300 mx-auto">
            <div className="mt-10 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-2 py-2 bg-white sm:p-6">
                    <div className="w-full uppercase h-10 mt-8 text-center overflow-hidden sm:rounded-t-lg font-bold text-xl text-black ">
                      Set Blocking Room
                    </div>
                    <div className="col-span-10 sm:col-span-10">
                      <label
                        for="reason"
                        className="block text-xl font-medium "
                      >
                        <span className="text-gray-700">Reason</span>{" "}
                        <span className="text-slate-200"> *Required</span>
                      </label>
                      <input
                        type="text"
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        placeholder="eg. Used by owner.."
                        id="reason"
                        autocomplete="reason"
                        className="py-4 px-4 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-md border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-10 mt-6 sm:col-span-10">
                      <label
                        for="date"
                        className="block text-xl font-medium text-gray-700"
                      >
                        Now, set your date
                      </label>
                      <label
                        for="date"
                        className="block text-md font-medium text-gray-400 grid grid-cols-2"
                      >
                        <span>It can be just 1 day or 7 days in a row</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-wrap justify-center items-center mb-4 h-full relative border rounded-lg shadow-md">
                          <div className="flex flex-col">
                            <span className="flex items-center justify-center leading-normal rounded rounded-md border border-r-1 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md mt-2">
                              Start Date
                            </span>
                            <Date
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border h-14 border-gray-300 px-3 relative"
                              onChange={handleChange}
                              value={form.start_date}
                              name="start_date"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="flex items-center justify-center leading-normal rounded rounded-md border border-l-1 font-regular text-gray-700 border-gray-300 px-4 whitespace-no-wrap text-md">
                              End Date
                            </span>
                            <Date
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border h-14 border-gray-300 px-3 relative"
                              onChange={handleChange}
                              value={form.end_date}
                              name="end_date"
                            />
                          </div>
                        </div>

                        <div className="right flex justify-center">
                          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 border rounded-lg shadow-md">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                              <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                  <h3 className="font-semibold text-base text-center text-blueGray-700">
                                    Blocked Dates Review
                                  </h3>
                                </div>
                              </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                              {/* Projects table */}
                              <table className="items-center w-full bg-transparent border-collapse">
                                <thead className="thead-light">
                                  <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Reason
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Start Date
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      End Date
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Delete
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {blocked.length === 0 ? (
                                    <>
                                      <div className="flex justify-center">
                                        <span className="font-semibold text-base text-center text-blueGray-700">
                                          No Dates Blocked
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    blocked?.map((value, idx) => {
                                      console.log(value?.start_blocked_date);
                                      return (
                                        <>
                                          <tr>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                              {value?.reason}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              {value?.start_blocked_date}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              {value?.end_blocked_date}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                              <div className="flex items-center hover:scale-125 duration-500">
                                                <span className="ml-2 cursor-pointer"
                                                data-te-target="#deleteDates"
                                                data-te-toggle="modal">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                  >
                                                    <circle cx="2" cy="10"r="2"></circle>
                                                    <circle cx="10" cy="10"r="2"></circle>
                                                    <circle cx="18" cy="10"r="2"></circle>
                                                  </svg>
                                                </span>
                                              </div>
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    })
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mx-4 my-4 py-3 bg-white flex justify-end sm:px-6">
                    <div className="">
                      <button
                        type="button"
                        className="inline-block rounded bg-success px-10 pt-2.5 pb-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-success-600"
                        onClick={() => blockedRoom()}
                      >
                        {loading ? <Loader /> : "SAVE"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ModalTenant data={blocked}/>
        <Toaster />
      </div>
    </>
  );
}

export default BlockedDates;
