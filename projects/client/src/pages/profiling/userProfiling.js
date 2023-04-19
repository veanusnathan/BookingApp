import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "components/modal/modal";
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuthValue } from "state/user-firebase/AuthContext";


const Profiling = (props) => {
  const {cacheUserGoogle} = useAuthValue()


  const location = useLocation()
  const navigate = useNavigate();
  let getTokenId = localStorage.getItem("token");

  useEffect(() => {
    getProfile();
    userTransaction();
    historyTransaction();
  }, []);


  const [orderList, setOrderList] = useState([]);
  const [history, setHistory] = useState([])

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone_number: "",
    status: "",
    address: "",
    birth_date: "",
    picture_path: "",
  });


  const getProfilePicture = (picturePath) => {
    if(picturePath && picturePath.includes("https")){
      return picturePath
    }else if(picturePath && picturePath.includes("Public")){
      return `${process.env.REACT_APP_API_BASE_URL}${picturePath}`
    }else{
      return `https://tecdn.b-cdn.net/img/new/avatars/2.webp`
    }
  }

  console.log(profile)

  const getProfile = async () => {
    try {
      if (getTokenId) {
        let response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}users/user-profile`,
          {},
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setProfile({
          ...profile,
          first_name: response?.data?.data?.first_name,
          last_name: response?.data?.data?.last_name,
          email: response?.data?.data?.email,
          gender: response?.data?.data?.users_detail?.gender,
          phone_number: response?.data?.data?.phone_number,
          status: response?.data?.data?.status,
          address: response?.data?.data?.users_detail?.address,
          birth_date: response?.data?.data?.users_detail?.birth_date,
          picture_path: response?.data?.data?.users_detail?.picture_path,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const historyTransaction = async() => {
    try {
      const res = await axios.post(`http://localhost:5000/transaction/paid-orderList`,
      {},
      {
        headers: {
          auth: getTokenId,
          Accept: "application/json",
          "Content-Type": "application/json",
        }})
        setHistory(res.data.data)
        console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const userTransaction = async () => {
    try {
      if (getTokenId) {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}transaction/order-list`,
          {},
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res.data.data);
        setOrderList(res.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  if (!getTokenId) {
    navigate("/register");
  }


  const dateToString = profile?.birth_date;
  const date = new Date(dateToString);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  return (
    <>
    { profile ? 
        <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* <!-- Profile Card --> */}
            <div className="bg-white p-3 border-t-4 border-[#c9403e]">
              <div className="image overflow-hidden">
                <img
                  src={getProfilePicture(profile?.picture_path)}
                  className="w-24 rounded-full shadow-lg"
                  alt="Avatar"
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {profile?.first_name}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                {profile?.email || cacheUserGoogle?.email}
              </h3>

              {/* Change and Delete profile Picture */}
              <div className="flex justify-start my-4">
                <div>
                  <div className="relative" data-te-dropdown-ref>
                    <a
                      className="flex items-center whitespace-nowrap rounded my-bg-main px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
                      href="#"
                      type="button"
                      id="dropdownMenuButton2"
                      data-te-dropdown-toggle-ref
                      aria-expanded="false"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Edit Profile
                      <span className="ml-2 w-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                    <ul
                      className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                      aria-labelledby="dropdownMenuButton2"
                      data-te-dropdown-menu-ref
                    >
                      <li>
                        <div
                          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          // onClick={() => handleShowPicture("changePicture")}
                          data-te-target="#changePicture"
                          data-te-toggle="modal"
                          role="button"
                          data-te-dropdown-item-ref
                        >
                          Change picture
                        </div>
                      </li>
                      <li>
                        <div
                          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          // onClick={() => handleShowProfile("editProfile")}
                          data-te-dropdown-item-ref
                          data-te-target="#editProfile"
                          data-te-toggle="modal"
                          role="button"
                        >
                          Edit Profile
                        </div>
                      </li>
                      <li>
                        <div
                          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                          // onClick={() => handleShowPassword("changePassword")}
                          data-te-dropdown-item-ref
                          data-te-target="#changePassword"
                          data-te-toggle="modal"
                          role="button"
                        >
                          Change Password
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Status */}
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-[#c9403e] py-1 px-2 rounded text-white text-sm">
                      {profile?.status === "confirmed"
                        ? "Active"
                        : "Not Active"}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">Jan 01, 2023</span>
                </li>
              </ul>
            </div>
            {/* <!-- End of profile card --> */}
            <div className="my-4"></div>
            {/* <!-- Friends card --> */}
            <div className="bg-white p-3 hover:shadow">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-[#c9403e]">
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>Confirmed</span>
              </div>
              <div className="grid grid-cols-1 shadow-md xl:mb-10">
                <div id="tasks" className="my-5">
                  <div
                    id="task"
                    className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                  >
                    <div className="inline-flex items-center space-x-2">
                      <div>
                        {profile?.status === "confirmed" ? (
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
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
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
                        )}
                      </div>
                      <div>Identity</div>
                    </div>
                  </div>
                  <div
                    id="task"
                    className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                  >
                    <div className="inline-flex items-center space-x-2">
                      <div>
                        {profile?.email?.length === 0 ? (
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
                        ) : (
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
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                      <div>Email address</div>
                    </div>
                  </div>
                  <div
                    id="task"
                    className="flex justify-between items-center border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                  >
                    <div className="inline-flex items-center space-x-2">
                      <div>
                        {profile?.phone_number?.length === 0 ? (
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
                        ) : (
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
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </div>
                      <div>Phone number</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End of friends card --> */}
          </div>

         {location.pathname === '/user-profile' ? 
         <>


          {/* <!-- Right Side --> */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* <!-- Profile tab --> */}
            {/* <!-- About Section --> */}
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-[#c9403e]">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{profile?.first_name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{profile?.last_name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold md:mr-5">Email</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href={`mailto:${profile?.email}`}
                      >
                        {profile?.email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{profile?.gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">
                      {dateToString ? <>{`${day} ${month} ${year}`}</> : ""}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No</div>
                    <div className="px-4 py-2">+62 {profile?.phone_number}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">{profile?.address}</div>
                  </div>
                </div>
              </div>

              <Modal
                profile={profile}
              />
              {/* </button> */}
            </div>
            {/* <!-- End of about section --> */}

            <div className="my-4"></div>

            {/* <!-- Experience and education --> */}
            <div className="bg-white pb-24 md:p-3 md:pb-0 shadow-sm rounded-sm ">
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-[#c9403e]">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">My Booking</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {orderList &&
                      orderList.map((value, index) => {
                        return (
                          <li>
                            <Link  to={`/transaction/${value?.room_id}/${value?.order_id}`} >
                            <div key={index} className="text-[#df6e6c]">
                              {value?.room?.property?.name}, {value?.room?.name} Room
                            </div>
                            <div className="text-gray-500 text-xs">
                              {value?.createdAt.split("T")[0]}
                            </div>
                            </Link>
                          </li>
                        );
                      })}
                    <div className="">
                      <li>
                        <Link to='/user-reservation'>
                        <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                          Show More
                        </button>
                        </Link>
                      </li>
                    </div>
                  </ul>
                </div>
                <div className="">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-[#c9403e]">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Renting History</span>
                  </div>

                  <div className="">
                  <ul className="list-inside space-y-2">
                    {history &&
                      history.map((value, index) => {
                        return (
                          <li>
                            <Link  to={`/transaction/${value?.room_id}/${value?.order_id}`} >
                            <div key={index} className="text-[#df6e6c]">
                              {value?.room?.property?.name}, {value?.room?.name} Room
                            </div>
                            <div className="text-gray-500 text-xs">
                              {value?.createdAt.split("T")[0]}
                            </div>
                            </Link>
                          </li>
                        );
                      })}
                    <div className="">
                      <li>
                        <Link to='/user-reservation'>
                        <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                          Show More
                        </button>
                        </Link>
                      </li>
                    </div>
                  </ul>
                  </div>
                </div>
              </div>
              {/* <!-- End of Experience and education grid --> */}
            </div>
            {/* <!-- End of profile tab --> */}
          </div>
          </>
          :

          null
        }
        </div>
      </div>
      :
      null
    }

    {cacheUserGoogle ? 
    <div className="container md:mx-auto md:my-5 md:p-5">
    <div className="md:flex md:no-wrap md:-mx-2 ">
      {/* <!-- Left Side --> */}
      <div className="w-full md:w-3/12 md:mx-2">
        {/* <!-- Profile Card --> */}
        <div className="bg-white p-3 border-t-4 border-[#c9403e]">
          <div className="image overflow-hidden">
            <img
              src={
                !profile?.picture_path
                  ? `https://tecdn.b-cdn.net/img/new/avatars/2.webp`
                  : `${process.env.REACT_APP_API_BASE_URL}${profile?.picture_path}`
              }
              className="w-24 rounded-full shadow-lg"
              alt="Avatar"
            />
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
            {profile?.first_name}
          </h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">
            {profile?.email}
          </h3>

          {/* Change and Delete profile Picture */}
          <div className="flex justify-start my-4">
            <div>
              <div className="relative" data-te-dropdown-ref>
                <a
                  className="flex items-center whitespace-nowrap rounded my-bg-main px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
                  href="#"
                  type="button"
                  id="dropdownMenuButton2"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Edit Profile
                  <span className="ml-2 w-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
                <ul
                  className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton2"
                  data-te-dropdown-menu-ref
                >
                  <li>
                    <div
                      className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      // onClick={() => handleShowPicture("changePicture")}
                      data-te-target="#changePicture"
                      data-te-toggle="modal"
                      role="button"
                      data-te-dropdown-item-ref
                    >
                      Change picture
                    </div>
                  </li>
                  <li>
                    <div
                      className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      // onClick={() => handleShowProfile("editProfile")}
                      data-te-dropdown-item-ref
                      data-te-target="#editProfile"
                      data-te-toggle="modal"
                      role="button"
                    >
                      Edit Profile
                    </div>
                  </li>
                  <li>
                    <div
                      className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      // onClick={() => handleShowPassword("changePassword")}
                      data-te-dropdown-item-ref
                      data-te-target="#changePassword"
                      data-te-toggle="modal"
                      role="button"
                    >
                      Change Password
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status */}
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              <span className="ml-auto">
                <span className="bg-[#c9403e] py-1 px-2 rounded text-white text-sm">
                  {profile?.status === "confirmed"
                    ? "Active"
                    : "Not Active"}
                </span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Member since</span>
              <span className="ml-auto">Jan 01, 2023</span>
            </li>
          </ul>
        </div>
        {/* <!-- End of profile card --> */}
        <div className="my-4"></div>
        {/* <!-- Friends card --> */}
        <div className="bg-white p-3 hover:shadow">
          <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
            <span className="text-[#c9403e]">
              <svg
                className="h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
            <span>Confirmed</span>
          </div>
          <div className="grid grid-cols-3">
            <div id="tasks" className="my-5">
              <div
                id="task"
                className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
              >
                <div className="inline-flex items-center space-x-2">
                  <div>
                    {profile?.status === "confirmed" ? (
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
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
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
                    )}
                  </div>
                  <div>Identity</div>
                </div>
              </div>
              <div
                id="task"
                className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
              >
                <div className="inline-flex items-center space-x-2">
                  <div>
                    {profile?.email?.length === 0 ? (
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
                    ) : (
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
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>Email address</div>
                </div>
              </div>
              <div
                id="task"
                className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
              >
                <div className="inline-flex items-center space-x-2">
                  <div>
                    {profile?.phone_number?.length === 0 ? (
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
                    ) : (
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
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>Phone number</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End of friends card --> */}
      </div>

     {location.pathname === '/user-profile' ? 
     <>
      {/* <!-- Right Side --> */}
      <div className="w-full md:w-9/12 mx-2 h-64">
        {/* <!-- Profile tab --> */}
        {/* <!-- About Section --> */}
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-[#c9403e]">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide">About</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Name</div>
                <div className="px-4 py-2">{profile?.first_name}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Last Name</div>
                <div className="px-4 py-2">{profile?.last_name}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email</div>
                <div className="px-4 py-2">
                  <a
                    className="text-blue-800"
                    href={`mailto:${profile?.email}`}
                  >
                    {profile?.email}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gender</div>
                <div className="px-4 py-2">{profile?.gender}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Birthday</div>
                <div className="px-4 py-2">
                  {dateToString ? <>{`${day} ${month} ${year}`}</> : ""}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No</div>
                <div className="px-4 py-2">+62 {profile?.phone_number}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">
                  Current Address
                </div>
                <div className="px-4 py-2">{profile?.address}</div>
              </div>
            </div>
          </div>

          <Modal
            // handleCloseProfile={() => handleCloseProfile("editProfile")}
            profile={profile}
          />
          {/* </button> */}
        </div>
        {/* <!-- End of about section --> */}

        <div className="my-4"></div>

        {/* <!-- Experience and education --> */}
        <div className="bg-white pb-24 md:p-3 md:pb-0 shadow-sm rounded-sm ">
          <div className="grid grid-cols-2">
            <div>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span className="text-[#c9403e]">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">My Booking</span>
              </div>
              <ul className="list-inside space-y-2">
                {orderList &&
                  orderList.map((value, index) => {
                    return (
                      <li>
                        <div className="text-[#df6e6c]">
                          {value?.room?.property?.name}, {value?.room?.name} Room
                        </div>
                        <div className="text-gray-500 text-xs">
                          {value?.createdAt.split("T")[0]}
                        </div>
                      </li>
                    );
                  })}
                <div className="">
                  <li>
                    <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                      Show More
                    </button>
                  </li>
                </div>
              </ul>
            </div>
            <div className="">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                <span className="text-[#c9403e]">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      fill="#fff"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">History</span>
              </div>

              <div className="">
                <ul className="list-inside space-y-2">
                  <li>
                    <div className="text-[#df6e6c]">
                      Villa Bumi Andung Bandung
                    </div>
                    <div className="text-gray-500 text-xs">
                      Mar 15, 2023
                    </div>
                  </li>
                  <li>
                    <div className="text-[#df6e6c]">
                      Villa Bumi Andung Bandung
                    </div>
                    <div className="text-gray-500 text-xs">
                      Mar 15, 2023
                    </div>
                  </li>
                  <li>
                    <div className="text-[#df6e6c]">
                      Villa Bumi Andung Bandung
                    </div>
                    <div className="text-gray-500 text-xs">
                      Mar 15, 2023
                    </div>
                  </li>
                  <li>
                    <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                      Show More
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- End of Experience and education grid --> */}
        </div>
        {/* <!-- End of profile tab --> */}
      </div>
      </>
      :

      null
    }
    </div>
  </div>
  :
   null
   }
      
    </>
  );
};

export default Profiling;
