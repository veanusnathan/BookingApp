import axios from "axios";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes,Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Register from "./pages/register/register";
import Activation from "./pages/activation/activation";
import TenantActivation from "./pages/activation/tenantActivation";
import Login from "./pages/login/login";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebase";
import Dashboard from "./pages/dashboard/dashboard";
import Profiling from "./pages/profiling/userProfiling";
import Rentals from "./pages/rental/Rentals";
import Details from "./pages/rental_details/RentalDetails";
import RoomDetails from "pages/room_details/roomDetails";
import SearchRoom from "pages/search/searchRoom";
import Transaction from "pages/transaction/transaction";
import EditProfile from "components/edit_profile/editProfile";
import ForgotPassword from "pages/forget_password/forgetPassword";
import ResetPassword from "pages/reset_password/reset_password";
import NotFound from "pages/not_found/notFound";
import { AuthProvider } from "state/user-firebase/AuthContext";
import { useAuthValue } from "state/user-firebase/AuthContext";
import Reservation from "pages/reservation/reservation";
import EditProperty from "components/edit_property/edit_property";

const provider = new GoogleAuthProvider();

function App() {
  const [username, setUsername] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [tenantRedirect, setTenantRedirect] = useState(false);
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({})
  const [cacheUserGoogle, setCacheUserGoogle] = useState(null)

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkIsLogin();
  }, []);


  let checkIsLogin = async () => {
    try {
      let getTokenId = localStorage.getItem("token");
      if (getTokenId) {
        let response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}users/keep-login`,
          {},
          {
            headers: {
              auth: getTokenId,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response) {
          setUsername(response.data.data.first_name);
        } else {
          setUsername("");
        }

        if (response.status === 201) {
          setRedirect(true);
        }
      }
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        toast.error(error.response.data.message);
      } 
    }
  };

  let onLogin = async (inputEmailOrPhoneNumber, inputPassword, checkbox) => {
    try {
      if (inputEmailOrPhoneNumber.length === 0 || inputPassword.length === 0)
        throw { message: "Field Cannot Blank" };

      setLoading(true)
      // insert props into object
      let dataToSend = {
        emailOrPhone: inputEmailOrPhoneNumber,
        password: inputPassword,
      };
      let response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}users/login/`,
        dataToSend
      );
      console.log(response);
      localStorage.setItem("token", `${response.data.data.token}`);
      if (checkbox) {
        localStorage.setItem("email", `${response.data.data.findEmailAndPhoneNumber.email}`);
        localStorage.setItem("password", `${response.data.data.findEmailAndPhoneNumber.password}`)
      }

      
      setTimeout(() => {
      toast.success("Login Success!");
      setUsername(response.data.data.findEmailAndPhoneNumber.first_name);
      }, 3000);
      setTimeout(() => {
        setRedirect(true);
      }, 4000);
      
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
        setLoading(false)
      }, 2000);
      
    }
  };

  let tenantLogin = async (
    inputEmailOrPhoneNumber,
    inputPassword,
    checkbox
  ) => {
    try {
      
      if (inputEmailOrPhoneNumber.length === 0 || inputPassword.length === 0)
        throw { message: "Field Cannot Blank" };
        setLoading(true)
      // insert props into object
      let dataToSend = {
        emailOrPhone: inputEmailOrPhoneNumber,
        password: inputPassword,
      };
      let response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}tenant/login/`,
        dataToSend
      );

        localStorage.setItem("tokenTid", `${response.data.data.token}`);
      if (checkbox) {
        localStorage.setItem("email", `${response.data.data.findEmailAndPhoneNumber.email}`);
      }
      
      setTimeout(() => {
        toast.success("Login Success!");
        setTenantName(response.data.data.findEmailAndPhoneNumber.first_name);
        
      }, 3000);
      setTimeout(() => {
        setTenantRedirect(true);
      }, 4000);
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
        setLoading(false)
      }, 2000);
      
    }
  };

  let onLoginWithGoogle = async () => {
    try {
      let response = await signInWithPopup(auth, provider);
      console.log(response)
      setUsername(response._tokenResponse.firstName);
      
      // localStorage.setItem("tokenUid", `${response.user.uid}`);
      
      let dataToSend = {
        first_name: response?._tokenResponse?.firstName,
        last_name: response?._tokenResponse?.lastName,
        email: response.user.email,
        password: "",
        phone_number: response?.user?.phoneNumber,
        google_id: response?.user?.uid,
        isFromGoogle: true,
        picture_path: response?.user?.photoURL
      };


      const {data: register} = await axios.post(`${process.env.REACT_APP_API_BASE_URL}users/register`, dataToSend)
      console.log(register)
      if(!register.isError){
        toast.success("Login With Google Success")
        localStorage.setItem("token", register?.data?.token)
        setTimeout(() => {
          setRedirect(true);
        }, 2000);
      }
      
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404" ||
        error.message ===  "Request failed with status code 500"
      ) {
        toast.error(error.response.data.message);
      } else {
        console.log(error)
        toast.error(error.message);
      }
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem("tokenUid");
  //       console.log(token)
  //       if (token) {
  //         const credential = GoogleAuthProvider.credential(token)
  //         await signInWithCredential(auth, credential);
  //         // const user = await currentUser.getTokenId();
  //         // setCurrentUser(user);
  //         // console.log(user)
  //       }else{
  //         setCacheUserGoogle(null)
  //       }
  //     } catch (error) {
  //       setCacheUserGoogle(null)
  //       // localStorage.removeItem("tokenUid");
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // onAuthStateChanged(auth, (user) => {
  //   setCacheUserGoogle(user)
  //   // localStorage.setItem("token", user.accessToken)
  //   console.log(user.accessToken)
  // })

  // onAuthStateChanged(auth, (userFromFireBase) => {
  //   if (userFromFireBase) {
  //     setUsername(userFromFireBase.displayName);
  //   }
  // });


  let onLogout = async () => {
    try {
      localStorage.removeItem("token");
      setUsername(""); // dan merubah username menjadi string kosong
      setRedirect(false);
      // localStorage.removeItem("tokenTid");
      setUsername("");
      setRedirect(false);
      // await signOut(auth);
      localStorage.removeItem("tokenUid");
      setUsername("");
      setRedirect(false); // jadi ketika ke trigger clik button logout maka redirect akan false
    } catch (error) {
      if (
        error.message === "Request failed with status code 400" ||
        error.message === "Request failed with status code 404"
      ) {
        console.log("tes1");
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }finally{
      navigate('/');
    }
  };

  return (
    <>

    {/* myFunc={{onLogout}} */}
    <Navbar data={{username}} myFunc={{onLogout}}/>

    <AuthProvider value={{cacheUserGoogle}} >       
    <Routes>
    {location.pathname !== '/' ? null :
            <>
            {/* <div className="sm:mx-6 md:mx-10 lg:mx-16 px-3"> */}
            <Route path='/' element={<Rentals />} />
            {/* </div> */}
            </>
            }


      {/* Users*/}
      <Route path='/register' element={<Register myGoogle={{onLoginWithGoogle}} />} /> {/* myGoogle={{onLoginWithGoogle}} */}
      <Route path='/activation/:id' element={<Activation />} />
      <Route path='/login' element={<Login myFunc={{onLogin}} isRedirect={{redirect}} isLoading={{loading}} myGoogle={{onLoginWithGoogle}}/>}  /> {/*myGoogle={{onLoginWithGoogle}} */}
      <Route path='/forget-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:id' element={<ResetPassword />} />
      <Route path='/user-profile' element={<Profiling />}/>
      <Route path='/user-reservation' element={<Reservation />} />

      {/* Tenant */}
      <Route path='/dashboard' element={<Dashboard name={{tenantName}} />} />
      <Route path='/dashboard-reservation' element={<Dashboard />} />
      <Route path='/dashboard-profile' element={<Dashboard />} />
      <Route path='/tenant-register' element={<Register />} />
      <Route path='/tenant-activation/:id' element={<TenantActivation />} />
      <Route path='/tenant-login' element={<Login myFunc={{tenantLogin}} isRedirect={{tenantRedirect}} isLoading={{loading}} />} />
      <Route path='/tenant-forget-password' element={<ForgotPassword />} />
      
      
      

      {/* property */}
      <Route path='/details/:id' element={<Details />} />
      <Route path='/category/:id' element={<Rentals />} />
      <Route path='/room-details/:id' element={<RoomDetails />} />
      <Route path='/search-results' element={<SearchRoom />} />
      <Route path='/edit-profile' element={<EditProfile />} />
      <Route path='/dashboard-createlisting' element={<Dashboard />} />
      <Route path='/dashboard-createroom' element={<Dashboard />} />
      <Route path='/dashboard-propertylist' element={<Dashboard />} />
      <Route path='/dashboard-edit-property' element={<Dashboard />} />
      <Route path='/dashboard-edit-room' element={<Dashboard />} />
      <Route path='/dashboard-edit-price' element={<Dashboard />} />
      

      {/* transaction */}
      <Route path='/transaction/:id/:order_id' element={<Transaction />} />
      <Route path='/transaction/:id/:order_id1/:order_id2' element={<Transaction />} />
      <Route path='/tenant-transaction/:id/:order_id' element={<Transaction />} />
      <Route path='/dashboard-sales-report' element={<Dashboard />} />
      <Route path='/dashboard-sales-report-room' element={<Dashboard />} />
      <Route path='*' element={<NotFound />} />
      {/* <Route path="/calendar" element={<Calendars/>} /> */}
    </Routes>
    </AuthProvider>
    <Footer/>
    </>
  );
}
export default App;

