import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router-dom";


function EditProfile() {
  //   const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [profilePicture, setProfilePicture] = useState([]);

  useEffect(() => {
    getProfile();
    // if (loading) {
    //   setTimeout(() => {
    //     // reset({
    //     //   first_name: '',
    //     //   last_name: '',
    //     //   email: '',
    //     //   gender: '',
    //     //   phone_number: '',
    //     //   address: '',
    //     //   birth_date: '',
    //     // });
    //     setLoading(false);
    //   }, 2000);
    // }
  }, []);

  let onImagesValidation = (e) => {
    try {
      let files = [...e.target.files];

      if (files.length > 2) throw { message: "Select Just 1 Image!" };

      files.forEach((value) => {
        if (value.size > 2000000)
          throw { message: `${value.name} more than 100kb` };
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

  let onSubmitPP = async() => {
      try {

        let fd = new FormData();
        if(!selectedImages) throw {message: "please Upload Your Image"}
        selectedImages.forEach(value => {
          fd.append('images', value)
      })

      let getTokenId = localStorage.getItem("token")
      if(getTokenId){
        let res = await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}users/profile-picture`, fd,
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
      }

      
        
      } catch (error) {
        console.log(error.message)
      }
  }


  const getProfile = async () => {
    try {
       
      let getTokenId = localStorage.getItem("token");
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

        console.log(response.data.data)

        setLoading(true)
      }
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        setLoading(false);
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }finally{
      setLoading(false)
    }
  };

 

  return (
    <>
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-gray-800">
          <div className="block rounded-lg shadow-lg bg-white">
            <div className="flex flex-wrap ">
              <div className="grow-0 shrink-0 basis-auto block w-full lg:flex lg:w-6/12 xl:w-4/12">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}`}
                  alt="Trendy Pants and Shoes"
                  className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                />
              </div>
              <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
                <div className="px-6 py-12 md:px-12">
                  <h2 className="text-3xl font-bold mb-6">Settings</h2>
                  {/* <p className="text-gray-500 mb-6">
                    Nunc tincidunt vulputate elit. Mauris varius purus malesuada
                    neque iaculis malesuada. Aenean gravida magna orci, non
                    efficitur est porta id. Donec magna diam.
                  </p> */}

                  <div className="grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-1 gap-x-6">
                    <div className="mb-6">
                      <p className="flex items-center">
                        <button
                          type="button"
                          className="block w-full my-main text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline  hover:shadow-xs "
                          data-te-toggle="modal"
                          data-te-target="#staticBackdrop"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Edit Profile
                        </button>

                        <div
                          data-te-modal-init
                          className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                          id="staticBackdrop"
                          data-te-backdrop="static"
                          data-te-keyboard="false"
                          tabindex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div
                            data-te-modal-dialog-ref
                            className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
                          >
                            <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <h5
                                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
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
                              {/* <h1 className="text-white font-thin text-center pb-4 border-b border-solid border-gray-500">
                  Async Set Form Values
                </h1> */}

                              {/* modal */}
                              <div
                                data-te-modal-body-ref
                                className="relative p-4"
                              >
                                <div class="flex justify-center">
                                  <div class="mb-3 w-96">
                                    <label
                                      for="formFile"
                                      class="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                    >
                                      Upload Your Picture
                                    </label>
                                    <input
                                      class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
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
                      className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                      data-te-modal-dismiss
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => onSubmitPP()}
                    >
                      Save Changes
                    </button>
                  </div>
                              </div>
                            </div>
                          </div>
                          <Toaster />
                        </div>
                      </p>
                    </div>
                    

                    <div className="mb-6">
                      <p className="flex items-center">
                        <button>Change Password</button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default EditProfile;
