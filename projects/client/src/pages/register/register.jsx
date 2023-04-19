import { useRef, useState, useReducer } from "react";
import person from "./../../supports/assets/stressed-person-using-computer-at-desk.png";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiTarget } from "react-icons/fi";
import Loader from "components/loader/loader";


function Register(props) {
  const [disabledButton, setDisabledButton] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const[selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();
  // const [state, dispatch] = useReducer(reducer, InitialState);

  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const phoneNumber = useRef();

  const tenantFirstName = useRef();
  const tenantLastName = useRef();
  const tenantEmail = useRef();
  const tenantPassword = useRef();
  const tenantPhoneNumber = useRef();


  const location = useLocation();

  let onSubmit = async () => {
    try {
      let inputFirstName = firstName.current.value;
      let inputLastName = lastName.current.value;
      let inputEmail = email.current.value;
      let inputPassword = password.current.value;
      let inputPhoneNumber = phoneNumber.current.value;

      
      // Validation
      if(inputFirstName.length === 0 || inputPassword.length === 0 || inputEmail.length === 0 || inputPhoneNumber.length === 0) throw {message: 'Field cannot blank'}

      if(!inputEmail.includes("@") || inputEmail.length < 10 ) throw {message: 'email must contain @ and contain at least 10 char'}
      if(inputPassword.length < 8 ) throw {message: 'Password at least 8 character'}
      if(inputPhoneNumber.length < 9) throw {message: 'Phone Number not Valid'}

      // Regex Validation
      let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
      if(!regex.test(inputPassword)) throw {message: 'Password must contains letter and any number'}
      
      setLoading(true)
      setDisabledButton(true)
      
      // send All valid data
      let dataToSend = {
        first_name: inputFirstName,
        last_name: inputLastName,
        email: inputEmail,
        password: inputPassword,
        phone_number: inputPhoneNumber,
      };
      let register = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}users/register`,
        dataToSend
      );

      localStorage.setItem("token", `${register.data.data.token}`)
      setTimeout(() => {
        toast.success("Register Success");
      }, 5500);
      // when its finish clear all input field
      setTimeout(() => {
        firstName.current.value = "";
        lastName.current.value = "";
        email.current.value = "";
        password.current.value = "";
        phoneNumber.current.value = "";
        toast.success("Check your email");
      }, 6000);

      setTimeout(() => {
        navigate(`/activation/${register?.data?.id}`)
      }, 6500)

      
    } catch (error) {
      // dispatch({type: "setDisabledButton", payload: true})
      setLoading(false)
      if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404" || error.message ===  "Request failed with status code 500"){
        toast.error(error.response.data.message)
      }else{
        toast.error(error.message)
      }
    }finally{
      setTimeout(() => {
        setLoading(false)
        setDisabledButton(false)
      }, 5000);
    }
  };

let onImagesValidation = (e) => {
  try {
    let files = [...e.target.files]


    if(files.length > 2 ) throw {message : 'Select Just 1 Image!'}

    files.forEach((value) => {
      if(value.size > 2000000) throw {message: `${value.name} more than 2Mb`}
    })

    setSelectedImages(files)
    toast.success("Upload success!")
  } catch (error) {
    if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
      console.log("tes1")
      toast.error(error.response.data.message)
    }else{
      console.log("tes sini")
      toast.error(error.message)
    }
  }
}

  let onSubmitTenant = async() => {
     try {
      let inputFirstName = tenantFirstName.current.value;
      let inputLastName = tenantLastName.current.value;
      let inputEmail = tenantEmail.current.value;
      let inputPassword = tenantPassword.current.value;
      let inputPhoneNumber = tenantPhoneNumber.current.value;

      console.log(inputFirstName)

      setDisabledButton(true)
      setLoading(true)
      let fd = new FormData();
      if(!selectedImages) throw {message: "please upload your KTP"}
      selectedImages.forEach(value => {
          fd.append('images', value)
      })

      fd.append('first_name', inputFirstName)
      fd.append('last_name', inputLastName)
      fd.append('email', inputEmail)
      fd.append('password', inputPassword)
      fd.append('phone_number', inputPhoneNumber)
        
      
      let tenantRegister = await axios.post(`${process.env.REACT_APP_API_BASE_URL}tenant/register`, fd)

      
      localStorage.setItem("tokenTid", `${tenantRegister.data.data.token}`)

      setTimeout(() => {
        toast.success("Register Success");
      }, 5500);
      setTimeout(() => {
        tenantFirstName.current.value = "";
        tenantLastName.current.value = "";
        tenantEmail.current.value = "";
        tenantPassword.current.value = "";
        tenantPhoneNumber.current.value = "";
        toast.success("Check your email");
      }, 6000);

      setTimeout(() => {
        navigate(`/tenant-activation/${tenantRegister?.data?.id}`)
      }, 6500)
      
     } catch (error) {
      setLoading(false)
      setDisabledButton(false)
      if(error.message ===  "Request failed with status code 400" || error.message ===  "Request failed with status code 404"){
        toast.error(error.response.data.message)
      }else{
        toast.error(error.message)
      }
     }finally{
      setTimeout(() => {
        setLoading(false)
        setDisabledButton(false)
      }, 5000);
     }
  }

  
  if((localStorage.getItem("token") && localStorage.getItem("tokenUid")) && location.pathname !== '/tenant-register') {
    return <Navigate to="/" />;
  }


  return (
    <>
      {location.pathname !== "/tenant-register" ? (
        // register user
        <section className="h-screen">
          <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img src={person} className="w-full" alt="Register" />
              </div>
              <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <div className="title flex justify-center text-bold text-3xl pb-5">
                  <p>Registration Form</p>
                </div>
                <form>
                  <div className="mb-6 flex">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputFirstName"
                      placeholder="First Name"
                      ref={firstName}
                    />
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal ml-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputLastName"
                      placeholder="Last Name"
                      ref={lastName}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputEmail"
                      placeholder="Email address"
                      ref={email}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputPassword"
                      placeholder="Password"
                      ref={password}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="number"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputPhoneNumber"
                      placeholder="Phone Number"
                      ref={phoneNumber}
                    />
                  </div>

                  <div className="text-center flex flex-col lg:text-left">
                    <button
                      type="button"
                      className="inline-block px-7 py-3 my-bg-button-dark text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => onSubmit()}
                      disabled={disabledButton}
                      // disabled={state.disabledButton}
                    >
                      {loading ? 
                        <Loader />
                       : "Create Account"}
                    </button>
                  </div>

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0 flex ">
                      Or Login 
                    </p>
                  </div>

                  <div className="flex flex-row items-center justify-center lg:justify-start">
                    <p className="text-lg mb-0 mr-4"></p>
                    <button
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      className="inline-block p-3 my-bg-light text-white font-medium text-xl leading-tight uppercase rounded-full shadow-md hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white active:shadow-lg transition duration-150 ease-in-out mx-1"
                      onClick={() => props.myGoogle.onLoginWithGoogle()}
                    >
                      <FcGoogle />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Toaster />
        </section>
      ) : (
        // regiter tenant
        <section className="h-screen">
          <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
              <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                <img src={person} className="w-full" alt="Register" />
              </div>
              <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <div className="title flex justify-center text-bold text-3xl pb-5">
                  <p>Tenant Registration Form</p>
                </div>
                <form>
                  <div className="mb-6 flex">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputFirstName"
                      placeholder="First Name"
                      ref={tenantFirstName}
                    />
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal ml-2 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputLastName"
                      placeholder="Last Name"
                      ref={tenantLastName}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputEmail"
                      placeholder="Email address"
                      ref={tenantEmail}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputPassword"
                      placeholder="Password"
                      ref={tenantPassword}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="number"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="inputPhoneNumber"
                      placeholder="Phone Number"
                      ref={tenantPhoneNumber}
                    />
                  </div>

                  <div className="mb-6">
                  <label
                        for="formFile"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                      >
                        Upload your KTP
                      </label>
                      <input
                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                        type="file"
                        id="formFile"
                        accept="image/*" multiple onChange={(e) => onImagesValidation(e)} 
                      />
                  </div>

                  <div className="text-center flex flex-col lg:text-left">
                    <button
                      type="button"
                      className="inline-block px-7 py-3 my-bg-button-dark text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => onSubmitTenant()}
                    >
                      {loading ? <Loader /> : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Toaster />
        </section>
      )}
    </>
  );
}

export default Register;
