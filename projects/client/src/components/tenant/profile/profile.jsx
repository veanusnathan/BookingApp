import Modal from "./../modal/modalTenant"

function Profile(props){
    const {details} = props;
    return(
        <>
        <div className="relative my-bg-light pt-12 md:pt-32 pb-32  mt-5 shadow-lg rounded-lg">
              <div className="px-4 md:px-10 mx-auto w-full">
                {/* <!-- Right Side --> */}
                <div className="w-full mx-2 md:w-9/12  md:ml-[100px] h-64 relative md:top-[-50px] ">
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
                          <div className="px-4 py-2 font-semibold">
                            First Name
                          </div>
                          <div className="px-4 py-2">{details?.first_name}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Last Name
                          </div>
                          <div className="px-4 py-2">{details?.last_name}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Email</div>
                          <div className="px-4 py-2">
                            <a
                              className="text-blue-800"
                              href={`mailto:${details?.email}`}
                            >
                              {details?.email}
                            </a>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            KTP Proof
                          </div>
                          <div className="inline-flex items-center space-x-2">
                            <div className="pl-2">
                              {details?.ktp_path ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer ml-4 "
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
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Contact No
                          </div>
                          <div className="px-4 py-2">
                            {details?.phone_number
                              ? `+62${details?.phone_number}`
                              : null}
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Current Address
                          </div>
                          <div className="px-4 py-2">{details?.address}</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Verified :
                          </div>
                          <div className="px-4 py-2 my-main">
                            {details?.status === "confirmed"
                              ? "Active"
                              : "Not Active"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Modal details={details}
                      // showEditProfile={show.editProfile}
                      // handleCloseProfile={() => handleCloseProfile("editProfile")}
                    //   details={details}
                    />
                    {/* <Modal
                // showChangePicture={show.changePicture}
                // handleClosePicture={() => handleClosePicture("changePicture")}
              />
              <Modal
                // showChangePassword={show.changePassword}
                // handleClosePassword={() =>
                //   handleClosePassword("changePassword")
                // }
              /> */}
                    {/* </button> */}
                  </div>
                  {/* <!-- End of about section --> */}

                  <div className="my-4"></div>
                  {/* <!-- End of profile tab --> */}
                </div>
              </div>
            </div>
        </>
    )
}

export default Profile;