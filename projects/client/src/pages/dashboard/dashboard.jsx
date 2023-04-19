import React, { useEffect, useState } from "react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import Navbar from "./../../components/tenant/navbar/navbar";
import Sidebar from "./../../components/tenant/sidebar/sidebar";
import LineChart from "./../../components/tenant/chart/lineChart";
import BarChart from "./../../components/tenant/chart/barChart";
import Reservation from "pages/reservation/reservation";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CreateProperty from "components/create_propeerty/create_property";
import CreateRoom from "components/create_room/create_room";
import PropertyList from "components/property_list/property_list";
import Profile from "components/tenant/profile/profile";
import EditProperty from "components/edit_property/edit_property";
import EditRoom from "components/edit_room/edit_room";
import SpecialPrice from "components/special_price/special_price";
import SalesReport from "components/sales_report/sales_report";
import { FaStar } from "react-icons/fa";
import {RiReservedFill} from "react-icons/ri"
import {GiReceiveMoney} from "react-icons/gi"
import {TbStarsFilled} from "react-icons/tb"
import SalesReportRoom from "components/sales_report_room/sales_report_room";
import Homepage from "components/tenant/homepage/homepage";


export default function Dashboard(props) {
  const [redirect, setRedirect] = useState(false);

  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [details, setDetails] = useState("");
  const [report, setReport] = useState([])
  const [property, setProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const navigate = useNavigate();

  const [form, setForm] = useState({
    city_id: "",
    type_id: "",
  });


  const dashboard = location.pathname === "/dashboard"
  const reservation = location.pathname === "/dashboard-reservation";
  const profile = location.pathname === "/dashboard-profile";
  const propertylist = location.pathname === "/dashboard-propertylist";
  const createlisting = location.pathname === "/dashboard-createlisting";
  const createroom = location.pathname === "/dashboard-createroom";
  const editProperty = location.pathname === "/dashboard-edit-property"
  const editRoom = location.pathname === "/dashboard-edit-room"
  const setSpecialPrice = location.pathname === '/dashboard-edit-price'
  const salesReport = location.pathname === "/dashboard-sales-report"
  const salesReportRoom = location.pathname === `/dashboard-sales-report-room`
  const getTokenId = localStorage.getItem("tokenTid");

  useEffect(() => {
    checkIsLogin();
    getTenantProfile();
    getSalesReport();
    tenantProperty();
  }, []);

  let checkIsLogin = async () => {
    try {
      if (getTokenId) {
        let response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}tenant/keep-login`,
          {},
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          setRedirect(true);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setRedirect(false);
    }
  };

  const getTenantProfile = async () => {
    try {
      if (getTokenId) {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}tenant/tenant-profile`,
          {},
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        setDetails(res?.data?.data);
        setUsername(res?.data?.data?.first_name);
        setPicture(res?.data?.data?.tenant_detail?.picture_path);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesReport = async() => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}transaction/sales-report`, 
      {},
        {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        })
        setReport(res.data.data) 
    } catch (error) {
      console.log(error)
    }
  }


  const tenantProperty = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}properties/tenant-property`,
        {
          city_id: form?.city_id,
          type_id: form?.type_id,
          page: currentPage,
        },
        {
          headers: {
            auth: getTokenId,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setProperty(res.data.data);

    } catch (error) {
      console.log(error)
    }
  };

  const result = report.reduce((acc, curr) => {
    return acc + curr.bookings_count
  }, 0)


  const stars = report.reduce((acc,curr) => {
    return acc + curr.room?.rating
  }, 0)

  const revenueTotal = report.reduce((acc, curr) => {
    return acc + curr.revenue
  }, 0)



  if (!getTokenId) {
    navigate("/tenant-login");
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar username={username} picture={picture} isRedirect={redirect} property={property}/>

        {localStorage.getItem("tokenTid") ? (
          <>
           {property.length === 0 ? 
           <>
           <Homepage />
           </> : 
           <>
            {dashboard && (
              <>
                {/* Header */}
                <div className="relative my-bg-main md:pt-32 pb-32 pt-12">
                  <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                      {/* Card stats */}
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4 ">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                   Total Booked
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                    {result ?? 0} Time's
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                    <i className="far fa-chart-bar text-2xl"><RiReservedFill /></i>
                                  </div>
                                </div>
                              </div>
                              {/* <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-emerald-500 mr-2">
                                  <i className="fas fa-arrow-up"></i> 3.48%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last month
                                </span>
                              </p> */}
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Stars Average
                                  </h5>
                                  <div className="flex items-center">
                                  <span className="font-semibold text-xl text-blueGray-700">
                                  {(stars ? (stars / report?.length) : 0).toFixed(1)} 
                                  </span>
                                  <span className="my-rating ml-1"><FaStar /></span>
                                  </div>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="my-rating p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full my-bg-light"> 
                                    <i className="fas fa-chart-pie text-2xl"><TbStarsFilled /></i>
                                  </div>
                                </div>
                              </div>
                              {/* <p className="text-sm text-blueGray-400 mt-4">
                                <span className="text-red-500 mr-2">
                                  <i className="fas fa-arrow-down"></i> 3.48%
                                </span>
                                <span className="whitespace-nowrap">
                                  Since last week
                                </span>
                              </p> */}
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap">
                                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Total Sales
                                  </h5>
                                  <span className="font-semibold text-xl text-blueGray-700">
                                   Rp. {revenueTotal.toLocaleString() ?? 0}
                                  </span>
                                </div>
                                <div className="relative w-auto pl-4 flex-initial">
                                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                                    <i className="fas fa-users text-2xl "><GiReceiveMoney /></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chart */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                  <div className="flex flex-wrap">
                  </div>
                  <div className="flex flex-wrap mt-4">
                    {report.length === 0 ? "tes" :
                     <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                          <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                              <h3 className="font-semibold text-base text-blueGray-700">
                                Property Bookings
                              </h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <Link to={'/dashboard-sales-report'} >
                              <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                              >
                                See all
                              </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                        
                        {/*Reports review  */}
                        <div className="block w-full overflow-x-auto">
                          {/* Projects table */}
                          <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                              <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Property Name
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                  Booked
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                 Revenue
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {report? report.map((value, idx) => {
                                return(
                                  <>
                                  <tr key={idx}> 
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left capitalize">
                                  {value?.property.name}
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {value?.bookings_count} Time's
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  Rp. {value?.revenue?.toLocaleString()}
                                </td>
                              </tr>
                                  </>
                                )
                              }): null}
                            </tbody>
                          </table>
                        </div> 
                      </div>
                    </div>}

                    
                    {property.length === 0 ? "tes" : 
                    <div className="w-full xl:w-6/12 px-4 mb-24 md:mb-0">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-blueGray-700">
                              Property Review
                            </h3>
                          </div>
                          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                          <Link to={'/dashboard-propertylist'} >
                            <button
                              className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                              style={{ transition: "all .15s ease" }}
                            >
                              See all
                            </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                          <thead className="thead-light">
                            <tr>
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Property
                              </th>
                              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Type
                              </th>
                              <th
                                className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                                style={{ minWidth: "140px" }}
                              >Start From</th>
                            </tr>
                          </thead>
                          <tbody>
                            {property ? property.map((value, idx) => {
                              console.log(value)
                                return(
                                  <>
                                  <tr>
                              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                {value?.name}
                              </th>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {value?.type?.name}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2">Rp. {value?.rooms?.[1]?.price?.toLocaleString()}</span>
                                </div>
                              </td>
                            </tr>
                                  </>
                                )
                            }) : "tes"}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>}
                  </div>
                </div>
              </>
            )}
           </>}
          </>
        ) : null}

        {/* Reservation */}
        {localStorage.getItem("tokenTid") ? (
          <>
            {reservation && (
              <>
                <Reservation />
              </>
            )}
          </>
        ) : null}

        {profile && (
          <>
            <Profile details={details}/>
          </>
        )}

        {/* property list */}

        {localStorage.getItem("tokenTid") ? (
          <>
            {propertylist && (
              <>
                <PropertyList />
              </>
            )}
          </>
        ) : null}

        {/* create listing */}

        {localStorage.getItem("tokenTid") ? (
          <>
            {createlisting && (
              <>
                <CreateProperty />
              </>
            )}
          </>
        ) : null}

        {/* create room */}

        {localStorage.getItem("tokenTid") ? (
          <>
            {createroom && (
              <>
                <CreateRoom />
              </>
            )}
          </>
        ) : null}

        {/* Edit Property */}
        {localStorage.getItem("tokenTid") ? (
          <>
            {editProperty && (
              <>
                <EditProperty />
              </>
            )}
          </>
        ) : null}

        {/* Edit Room */}
        {localStorage.getItem("tokenTid") ? (
          <>
            {editRoom && (
              <>
                <EditRoom />
              </>
            )}
          </>
        ) : null}

        {/* set Special Price */}
        {localStorage.getItem("tokenTid") ? (
          <>
            {setSpecialPrice && (
              <>
                <SpecialPrice />
              </>
            )}
          </>
        ) : null}

        {/* Sales Report */}
        {localStorage.getItem("tokenTid") ? (
          <>
            {salesReport && (
              <>
                <SalesReport />
              </>
            )}
          </>
        ) : null}

        {/* Sales Report Room */}
        {localStorage.getItem("tokenTid") ? (
          <>
            {salesReportRoom && (
              <>
                <SalesReportRoom />
              </>
            )}
          </>
        ) : null}


        <Toaster />
      </div>
    </>
  );
}
