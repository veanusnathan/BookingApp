import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaSnapchatGhost, FaHome } from "react-icons/fa";
import { MdOutlineHomeWork  } from "react-icons/md"
import { Link, useLocation } from "react-router-dom";
import logo from "./../../supports/assets/logo.png";

const Footer = () => {

  const location = useLocation()
  const path = window.location.pathname;
  const slice = path.split('/')
  const id = slice[2]

    const d = new Date();
    let year = d.getFullYear();


  const web = [
    <BsTwitter />,
    <BsInstagram />,
    <BsFacebook />,
    <FaSnapchatGhost />,
  ];

  const mobile = [
    <Link to='/'><FaHome /></Link>  ,
    <Link to='/tenant-login'><MdOutlineHomeWork  /></Link>,
  ]
  return (
    <>
    {/* web */}
   {location.pathname === `/room-details/${id}` ? null :
    
    <>
     <div className="bg-white border-t-2 shadow-md shadow-gray-300 bottom-0 h-20 w-full hidden md:flex items-center justify-center gap-6 mt-20">
     <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
        <span className="flex pr-2">© {year} Vcation.inc</span> 
     </div>
      {/* {web.map((web) => (
        <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
          {web} 
        </div>
      ))} */}
    </div>
    

    {location.pathname === '/user-profile'? <div className="bg-white border-t-2 shadow-md shadow-gray-300 fixed bottom-0 h-20 w-full flex md:hidden items-center justify-center gap-6 ">
    {mobile.map((mobile) => (
      <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
        {mobile}
      </div>
    ))}
  </div> :
   <div className="bg-white border-t-2 shadow-md shadow-gray-300 bottom-0 h-20 w-full flex md:hidden items-center justify-center gap-6 ">
    {mobile.map((mobile) => (
      <div className="text-[30px] text-gray-600 hover:text-black duration-100 ease-out ">
        {mobile}
      </div>
    ))}
  </div>}
    </>
   }
  </>
  );
};

export default Footer;