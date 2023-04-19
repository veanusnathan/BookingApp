import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import date from "date-fns/esm/locale/da/index.js";
import Loader from "../loader/loader";
import { Link } from "react-router-dom";

function Modal(props) {
  let getTokenId = localStorage.getItem("token");
  const { register, handleSubmit, reset } = useForm({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [disable, setDisable] = useState(false);
  const [username, setUsername] = useState({
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  const bookedRoom = async () => {
    const endDate = `${props?.endDate?.year}-${props?.endDate?.month}-${props?.endDate?.date}`;
    const startDate = `${props?.endDate?.year}-${props?.startDate?.month}-${props?.startDate?.date}`;

    try {
      setLoading(true);
      if (!getTokenId) {
        navigate("/register");
      }
      if (getTokenId) {
        const booking = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}transaction/booked`,
          {
            check_in: startDate,
            check_out: endDate,
            total_guest: props?.totalGuest,
            room_id: props?.placeId,
            price: props?.price
          },
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        toast.success(booking.data.message);

        setTimeout(() => {
          if (booking?.data?.data?.length <= 2) {
            navigate(
              `/transaction/${props?.placeId}/${booking?.data?.data?.[0]?.order_id}`, {state: props?.price}
            );
          } else {
            navigate(
              `/transaction/${props?.placeId}/${booking?.data?.data?.[0]?.order_id}/${booking?.data?.data?.[2]?.order_id}`, {state: props?.price}
            );
          }
        }, 2000);
      }
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
      setLoading(false);
    }
  };

  const cancelOrder = async() => {
    try {
      setLoading(true)
      const res = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}transaction/cancel`,
      {
        room_id: props?.data?.id,
        order_id1: props?.data?.order_id || props?.data?.order_id1,
        order_id2: props?.data?.order_id2 || null
      } )

      setTimeout(() => {
        toast.success(res?.data?.message)
      }, 5000);

      setTimeout(() => {
        window.location.reload();
      }, 5500)
      
      // setTimeout(() => {
      //   if(res?.data?.data?.length <= 1){
      //     navigate(`/transaction/${props?.data?.id}/${props?.data?.order_id || props?.data?.order_id1}`)
      //   }else{
      //     navigate(`/transaction/${props?.data?.id}/${props?.data?.order_id1}/${props?.data?.order_id2}`)
      //   }
      // }, 2000);

    } catch (error) {
      setLoading(false)
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }finally{
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (data?.first_name?.length === 0)
        throw { message: "Please fill first name" };
      if (data?.last_name?.length === 0)
        throw { message: "Please fill last name" };
      if (!data?.email?.includes("@") || data?.email?.length < 10)
        throw { message: "email must contain @ and contain at least 10 char" };
      if (data?.phone_number?.length < 9)
        throw { message: "Phone Number not Valid" };
      if (data?.gender?.length === 0) throw { message: "Choose a gender" };

      if (getTokenId) {
        let res = await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}users/edit`,
          {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            gender: data.gender,
            phone_number: data.phone_number,
            address: data.address,
            birth_date: data.birth_date,
          },
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        
        setTimeout(() => {
          toast.success("Update Profile Success");
        }, 5000);
        

        setTimeout(() => {
          window.location.reload();
        }, 6000)
      }
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

  let onImagesValidation = (e) => {
    try {
      let files = [...e.target.files];

      if (files.length > 2) throw { message: "Select Just 1 Image!" };

      files.forEach((value) => {
        if (value.size > 2000000)
          throw { message: `${value.name} more than 2Mb` };
      });

      setSelectedImages(files);
      toast.success("Upload success!");
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  let onSubmitPP = async () => {
    try {
      setLoading(true);
      let fd = new FormData();
      if (!selectedImages) throw { message: "please Upload Your Image" };
      selectedImages.forEach((value) => {
        fd.append("images", value);
      });

      if (getTokenId) {
        let res = await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}users/profile-picture`,
          fd,
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setTimeout(() => {
          toast.success(res.data.message);
        }, 5000);

        setTimeout(() => {
          window.location.reload();
        }, 6000)
      }
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
      // setTimeout(() => {
      //   setCloseModal(false);
      // }, 5000);
    }
  };

  const validateProfile = (e) => {
    if (e === "") {
      setMsg("Field Cannot Blank ");
    } else {
      setMsg("");
    }
  };

  const validatePassword = (e) => {
    if (e === "") {
      setMsg("Field Cannot Blank ");
    } else if (e?.length < 8) {
      setMsg("Password Cannot les than 8 Char");
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(e)) {
      setMsg("Password must contains letter and any number");
    } else {
      setMsg("");
    }
  };

  const validateNewPassword = (e) => {
    if (e === "") {
      setMsg("Field Cannot Blank ");
    } else if (e?.length < 8) {
      setMsg("Password Cannot les than 8 Char");
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(e)) {
      setMsg("Password must contains letter and any number");
    } else {
      setMsg("");
    }
  };

  const changePassword = async (data) => {
    try {
      setDisable(true);
      setLoading(true);
      if (getTokenId) {
        let res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}users/change-password`,
          {
            old_password: data.old_password,
            new_password: data.new_password,
          },
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          setTimeout(() => {
            toast.success(res.data.message);
          }, 5000);
        }
        setTimeout(() => {
          window.location.reload();
        }, 6000)
      }
    } catch (error) {
      setLoading(false);
      if (error.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error.message);
        toast.error(error.message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  // useEffect(() => {
  //   if (modalOpen === false) {
  //     window.location.reload();
  //   }
  // }, [modalOpen]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        reset({
          first_name: "",
          last_name: "",
          email: "",
          gender: "",
          phone_number: "",
          address: "",
          birth_date: "",
          formFile: "",
          old_password: "",
          new_password: "",
          formFile: "",
        });
      }, 4000);
    }
  }, [loading, reset]);

  return (
    <>
      {/* Change Description Modal */}

      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden \"
        id="editProfile"
        tabindex="-1"
        aria-labelledby="editProfile"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none mt-10">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-opacity-100 p-4 ">
              <h5
                className="text-xl text-xl font-semi-bold leading-normal"
                id="editProfile"
              >
                Edit Profile
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
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
              </button>
            </div>

            <div data-te-modal-body-ref className="relative p-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-2xl mx-auto"
              >
                <div className="form bg-gray-600 max-w-md mx-auto p-6 rounded-lg">
                  {/* first_name */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="first_name"
                  >
                    First name
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4 capitalize"
                    type="text"
                    {...register("first_name")}
                    id="first_name"
                    defaultValue={props?.profile?.first_name}
                    onChange={(e) => validateProfile(e.target.value)}
                  />
                  <div className="text-red-700 text-sm font-semibold ">
                    {msg ? msg : null}
                  </div>
                  {/* last_name */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="last_name"
                    onChange={(e) => validateProfile(e.target.value)}
                  >
                    Last name
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4 capitalize"
                    type="text"
                    {...register("last_name")}
                    id="last_name"
                    defaultValue={props?.profile?.last_name}
                  />
                  <div className=" text-red-700 text-sm font-semibold ">
                    {msg ? msg : null}
                  </div>
                  {/* email */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4 "
                    type="text"
                    {...register("email")}
                    id="email"
                    defaultValue={props?.profile?.email}
                    onChange={(e) => validateProfile(e.target.value)}
                  />
                  <div className=" text-red-700 text-sm font-semibold ">
                    {msg ? msg : null}
                  </div>
                  {/* gender */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4 capitalize"
                    name="gender"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  {/* Phone Number */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="phone_number"
                  >
                    Phone Number
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4 capitalize"
                    type="number"
                    {...register("phone_number")}
                    id="phone_number"
                    defaultValue={props?.profile?.phone_number}
                    onChange={(e) => validateProfile(e.target.value)}
                  />
                  <div className=" text-red-700 text-sm font-semibold ">
                    {msg ? msg : null}
                  </div>
                  {/* address */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4 capitalize"
                    type="text"
                    {...register("address")}
                    id="address"
                    defaultValue={props?.profile?.address}
                    onChange={(e) => validateProfile(e.target.value)}
                  />
                  <div className=" text-red-700 text-sm font-semibold ">
                    {msg ? msg : null}
                  </div>
                  '{/* birthdate */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="birth_date"
                  >
                    Birth date
                  </label>
                  <input
                    className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4 capitalize"
                    type="date"
                    {...register("birth_date")}
                    id="birth_date"
                    defaultValue={props?.profile?.birth_date}
                    onChange={(e) => validateProfile(e.target.value)}
                  />
                  <div className=" text-red-700 text-sm font-semibold ">
                    {msg ? msg : null}
                  </div>
                  <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal my-main transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      data-te-modal-dismiss
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-1 inline-block rounded my-bg-button-dark px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-emerald-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus::bg-emerald-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-emerald-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      {loading ? (
                        <div className="h-fit flex justify-center">
                          <Loader />
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Change Profile Picture Modal */}

      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden"
        id="changePicture"
        tabindex="-1"
        aria-labelledby="changePictureLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] "
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none ">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-opacity-100 p-4 ">
              <h5
                className="text-xl font-semi-bold leading-normal "
                id="changePicture"
              >
                Change Picture
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
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
              </button>
            </div>

            <div data-te-modal-body-ref className="relative p-4">
              <form
                onSubmit={handleSubmit(onSubmitPP)}
                className="max-w-2xl mx-auto"
              >
                <div className="form bg-gray-600 max-w-md mx-auto p-6 rounded-lg">
                  <div className="flex justify-center">
                    <div className="mb-3 w-96">
                      <label
                        htmlFor="formFile"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                      >
                        Upload Your Picture
                      </label>
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                        type="file"
                        id="formFile"
                        accept="image/*"
                        multiple
                        onChange={(e) => onImagesValidation(e)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal my-main transition duration-150 ease-in-out hover:bg-primary-accent-300 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      data-te-modal-dismiss
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-1 inline-block rounded my-bg-button-dark px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-emerald-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus::bg-emerald-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-emerald-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      // data-te-modal-dismiss={closeModal}
                    >
                      {loading ? (
                        <div className="h-fit w-full flex justify-center">
                          <Loader />
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div
        data-te-modal-init
        className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="changePassword"
        tabindex="-1"
        aria-labelledby="changePassword"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2  border-opacity-100 p-4 ">
              <h5
                className="text-xl font-medium leading-normal "
                id="changePassword"
              >
                Change Password
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
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
              </button>
            </div>

            <div data-te-modal-body-ref className="relative p-4">
              <form
                onSubmit={handleSubmit(changePassword)}
                className="max-w-2xl mx-auto"
              >
                <div className="form grid bg-gray-600 max-w-md mx-auto p-6 rounded-lg">
                  {/* old password */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="old_password"
                  >
                    Old Password
                  </label>
                  <div className="relative">
                    <input
                      className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                      type={showPassword ? "text" : "password"}
                      {...register("old_password")}
                      id="old_password"
                      onChange={(e) => validatePassword(e.target.value)}
                      placeholder="Input Your Old Password"
                    />
                    <div className="absolute password-icon text-2xl right-5 top-3.5 my-main">
                      {showPassword ? (
                        <AiFillEye
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      ) : (
                        <AiFillEyeInvisible
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        />
                      )}
                    </div>
                  </div>

                  {/* New Password */}
                  <label
                    className="block mb-3 text-white font-medium"
                    htmlFor="new_password"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-transparent text-gray-100 mb-4"
                      type={showNewPassword ? "text" : "password"}
                      {...register("new_password")}
                      onChange={(e) => validateNewPassword(e.target.value)}
                      id="new_password"
                      placeholder="Input New Password"
                    />
                    <div className="absolute password-icon my-main text-2xl right-5 top-3.5">
                      {showNewPassword ? (
                        <AiFillEye
                          onClick={() =>
                            setShowNewPassword(
                              (showNewPassword) => !showNewPassword
                            )
                          }
                        />
                      ) : (
                        <AiFillEyeInvisible
                          onClick={() =>
                            setShowNewPassword(
                              (showNewPassword) => !showNewPassword
                            )
                          }
                        />
                      )}
                    </div>
                    <div className=" text-sm font-semibold ">
                      {msg ? msg : null}
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 ">
                    <button
                      type="button"
                      className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal my-main transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      data-te-modal-dismiss
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() =>
                        props.handleClosePassword("changePassword")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-1 inline-block rounded my-bg-button-dark px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-emerald-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-emerald-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-emerald-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => setModalOpen(true)}
                    >
                      {loading ? (
                        <div className="h-fit w-full flex justify-center">
                          <Loader />
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction modal */}
      <div
        data-te-modal-init
        className="fixed top-[100px] left-[55px] md:top-0 md:left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="transaction"
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-fit translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none my-bg-light bg-clip-padding text-current shadow-lg outline-none ">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-400 border-opacity-100 p-4 ">
              <h5
                className="text-xl font-semibold leading-normal text-black"
                id="transaction"
              >
                Confirmation Booked
              </h5>
              <button
                type="button"
                className="box-content text-black rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
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
              </button>
            </div>

            <div data-te-modal-body-ref className="relative p-4">
              <div className="flex flex-col justify-center ">
                <div
                  className="relative mb-3 w-full"
                  data-te-input-wrapper-init
                >
                  <div
                    className="text-center rounded-lg text-black p-4 w-full peer block min-h-[auto] w-fit rounded border-0 bg-neutral-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput5"
                  >
                    <address>
                      {props?.details?.[0]?.property?.name}
                      <br />
                      {props?.details?.[0]?.property?.address},{" "}
                      {props?.details?.[0]?.property?.locations?.[0]?.name},{" "}
                      {
                        props?.details?.[0]?.property?.locations?.[0]?.city
                          ?.city
                      }
                    </address>
                  </div>
                </div>
                <div
                  className="relative mb-3 w-full"
                  data-te-input-wrapper-init
                >
                  <label
                    for="exampleFormControlInput5"
                    className="rounded-lg text-black p-4 w-full peer block min-h-[auto] w-fit rounded border-0 bg-neutral-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  >
                    You stayed for {props?.daysCheck} Night(s)
                  </label>
                </div>
                <div
                  className="relative mb-3 w-full"
                  data-te-input-wrapper-init
                >
                  <label
                    for="exampleFormControlInput5"
                    className="rounded-lg text-black p-4 w-full peer block min-h-[auto] w-fit rounded border-0 bg-neutral-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  >
                    Total Price Rp.{" "}
                    {`${(
                      props?.price *
                      Math.ceil(props?.totalGuest / 2)
                    ).toLocaleString()}`}
                  </label>
                </div>
                <div
                  className="relative mb-3 w-full"
                  data-te-input-wrapper-init
                >
                  <label
                    for="exampleFormControlInput5"
                    className="rounded-lg text-black p-4 w-full peer block min-h-[auto] w-fit rounded border-0 bg-neutral-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  >
                    Room Booked {Math.ceil(props?.totalGuest / 2)}, with {props?.totalGuest} Guest
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center justify-evenly rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded my-bg-main px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-rose-accent-100 focus:bg-rose-accent-100 focus:outline-none focus:ring-0 active:bg-rose-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Cancel
              </button>
              {/* <Link
                to={`/transaction/${props?.placeId}/${props?.daysCheck}`}
              > */}
              <button
                type="submit"
                className="ml-1 inline-block rounded my-bg-button-dark px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-emerald-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-emerald-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-emerald-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-modal-dismiss
                onClick={bookedRoom}
              >
                {loading ? (
                  <div className="h-fit flex justify-center">
                    <Loader />
                  </div>
                ) : (
                  "Checkout"
                )}
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order */}

      <div
        data-te-modal-init
        class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="cancelOrder"
        tabindex="-1"
        aria-labelledby="cancelOrder"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none ">
            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 ">
              <h5
                class="text-xl font-medium leading-normal text-neutral-800 "
                id="cancelOrder"
              >
                Canceling Order
              </h5>
              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="relative flex-auto p-4" data-te-modal-body-ref>
              Are You Sure Want to Cancel The Order ?
            </div>
            <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 ">
              <button
                type="button"
                class="inline-block rounded my-bg-button-dark px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-emerald-accent-700 focus:bg-emerald-accent-700focus:outline-none focus:ring-0 active:bg-emerald-accent-700"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                No
              </button>
              <button
                type="button"
                class="ml-1 inline-block rounded my-bg-main px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-rose-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-rose-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-rose-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => cancelOrder()}
              >
                {loading ? <Loader /> : "Yes"} 
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default Modal;
