import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Loader from "components/loader/loader";

function ResetPassword() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const {id} = useParams();

  const validatePassword = (e) => {
      console.log(e)
    if (e === "") {
      setMsg("Field Cannot Blank ");
    } else if (e.length < 8) {
      setMsg("Password Cannot less than 8 Char");
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(e)) {
      setMsg("Password must contains letter and any number");
    } else {
      setMsg("");
      setPassword(e)
    }
  };

  const validateNewPassword = (e) => {
      console.log(e)
    if (e === "") {
      setMsg("Field Cannot Blank ");
    } else if (e.length < 8) {
      setMsg("Password Cannot les than 8 Char");
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(e)) {
      setMsg("Password must contains letter and any number");
    } else if(e != password){
        setMsg("Password not Match")
    }else {
      setMsg("");
    }
  };

  const inputNewPassword = async(data) => {
      try {
          setLoading(true)
          const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}users/reset-password/${id}`, {
            id: id,
            password: data.input_password,
            confirm_password: data.confirm_password
          })
          console.log(res)
          toast.success(res.data.message)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
      } catch (error) {
        setLoading(false)
          toast.error(error.response.data.message)
          console.log(error)
      }finally{
        setLoading(false)
      }

  }
  return (
    <>
      <div className="wrapper flex justify-center py-[100px]">
        <div className="block max-w-md rounded-lg bg-white p-6 shadow-lg ">
          <div className="p text-4xl flex justify-center mb-5">
            Reset Form
          </div>
          <form
                    onSubmit={handleSubmit(inputNewPassword)}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="form grid bg-white max-w-md mx-auto p-6 rounded-lg">
                      {/* New Password */}
                      <label
                        className="block mb-3 text-black font-medium"
                        htmlFor="input_password"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-white text-black mb-4"
                          type={showPassword ? "text" : "password"}
                          {...register("input_password")}
                          id="input_password"
                          onChange={(e) => validatePassword(e.target.value)}
                          placeholder="Input your Password"
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
                        className="block mb-3 text-black font-medium"
                        htmlFor="confirm_password"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                      <input
                        className="block w-full p-3 rounded-md border border-solid border-gray-500 bg-white text-black mb-4"
                        type={showNewPassword ? "text" : "password"}
                        {...register("confirm_password")}
                        onChange={(e) => validateNewPassword(e.target.value)}
                        id="confirm_password"
                        placeholder="Confirm Your password"
                      />
                      <div className=" text-red-700 text-sm font-semibold ">
                        {msg ? msg : null}
                      </div>
                      <div className="absolute password-icon text-2xl right-5 top-3.5 my-main">
                        {showNewPassword ? (
                          <AiFillEye
                            onClick={() =>
                              setShowNewPassword((showNewPassword) => !showNewPassword)
                            }
                          />
                        ) : (
                          <AiFillEyeInvisible
                            onClick={() =>
                              setShowNewPassword((showNewPassword) => !showNewPassword)
                            }
                          />
                        )}
                      </div>
                      </div>

                      <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <button
                          type="submit"
                          className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                          data-te-modal-dismiss
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-5 inline-block rounded my-bg-button-dark px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-emerald-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-emerald-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-emerald-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                            // onClick={() => props.handleClosePassword("changePassword")
                            // }
                        >
                          {loading ? <Loader /> : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  </form>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default ResetPassword;
