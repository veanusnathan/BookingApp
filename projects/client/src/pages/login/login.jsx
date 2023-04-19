import { useRef, useState } from "react";
import person from "./../../supports/assets/administrator-working-at-desk.png";
import { FcGoogle } from "react-icons/fc";
import { Toaster } from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "components/loader/loader";

function Login(props) {
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showTenantPassword, setShowTenantPassword] = useState(false)
  const navigate = useNavigate()

  const emailOrPhone = useRef();
  const password = useRef();

  const location = useLocation();

  const user = location.pathname === '/login'
  const tenant = location.pathname === '/tenant-login'



  const onCheckbox = (event) => {
    setRememberMe(event.target.checked)

  }

  if(user && localStorage.getItem('token')){
      return <Navigate to='/' />
    }
  if(tenant && localStorage.getItem("tokenTid")){
    return <Navigate to='/dashboard' />
  }

  // if(localStorage.getItem("tokenTid")){
  //   return <Navigate to='/dashboard' />
  // }

  return (
    <>
      {user && <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img src={person} className="w-full" alt="Sample" />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
            <div className="title flex justify-center text-bold text-4xl pb-5">
              <p>Login Form</p>
            </div>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Sign in with</p>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="inline-block p-3 my-bg-light text-white font-medium text-xl text-white leading-tight uppercase rounded-full shadow-md hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white active:shadow-lg transition duration-150 ease-in-out mx-1"
                  onClick={() => props.myGoogle.onLoginWithGoogle()} 
                >
                  <FcGoogle />
                </button>
              </div>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address or phone number"
                  defaultValue={localStorage.getItem("email") ? localStorage.getItem("email") : null}
                  ref={emailOrPhone}
                  required
                />
              </div>

              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  ref={password}
                  required
                />
                <div className="absolute password-icon my-main text-2xl right-5 top-3.5">
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

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck2"
                    onChange={onCheckbox}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 mr-4 md:mr-0"
                    for="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>
                <a href="/forget-password" className="text-gray-800">
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left mb-24">
                <button
                  type="button"
                  className="inline-block px-7 py-3 my-bg-button-dark text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-emerald-800 hover:shadow-lg focus:bg-emerald-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => props.myFunc.onLogin(emailOrPhone.current.value, password.current.value, rememberMe)}
                >
                  {props?.isLoading?.loading ? <div className="px-3"><Loader /> </div> : "Login"}
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <a
                    href='/register'
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </section>}
      
      
    {tenant && <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img src={person} className="w-full" alt="Sample" />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
              <div className="title flex justify-center text-bold text-4xl pb-5">
                <p>Tenant Login Form</p>
              </div>

                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address or phone number"
                    ref={emailOrPhone}
                    required
                  />
                </div>

                <div className="mb-6 relative">
                  <input
                    type={showTenantPassword ? "text" : "password"}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    ref={password}
                    required
                    />
                    <div className="absolute password-icon my-main text-2xl right-5 top-3.5">
                    {showTenantPassword ? (
                      <AiFillEye
                        onClick={() =>
                          setShowTenantPassword((showTenantPassword) => !showTenantPassword)
                        }
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() =>
                          setShowTenantPassword((showTenantPassword) => !showTenantPassword)
                        }
                      />
                    )}
                    </div>
                  
                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                      onChange={onCheckbox}
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      for="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="/tenant-forget-password" className="text-gray-800">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center lg:text-left mb-24">
                  <button
                    type="button"
                    className="inline-block px-7 py-3 my-bg-button-dark text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-emerald-800 hover:shadow-lg focus:bg-emerald-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => props.myFunc.tenantLogin(emailOrPhone.current.value, password.current.value, rememberMe)}
                  >
                     {props?.isLoading?.loading ? <div className="px-3"><Loader /> </div> : "Login"}
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      href='/tenant-register'
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Toaster />
      </section>
}
    
    </>
  );
}

export default Login;
