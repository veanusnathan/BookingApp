import React from "react";

const Filter = ({ icon, title }) => {
  return (
    <div className="flex justify-center items-center text-white bg-[#c9403e] hover:bg-white hover:text-[#c9403e] duration-200 ease-out gap-2 px-1 md:px-3 sm:mx-0 md:mx-1 lg:mx-1 rounded-full text-[14px] sm:text-[16px]">
      {icon}
      {title}
    </div>
  );
};

export default Filter;
