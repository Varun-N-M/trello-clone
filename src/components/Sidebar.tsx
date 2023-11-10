"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import { BiSolidChevronLeft } from "react-icons/bi";
import { SiTrello } from "react-icons/si";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { BsPlusLg } from "react-icons/bs";
import { FaTableList } from "react-icons/fa6";
import { AiFillStar, AiOutlineCalendar, AiOutlineStar } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";

export const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [star, setStar] = useState(false);

  return (
    <>
      {sidebar ? (
        <>
          <div className="bg-[#1D2125] text-[#9EACBA] w-screen max-w-fit absolute z-20 h-screen">
            <div className="flex flex-row flex-1 flex-wrap  border-b border-gray-700 w-full gap-3 items-center px-2 py-1.5">
              <button>
                <Image
                  src="/V.png"
                  height={38}
                  width={38}
                  alt="logo"
                  className="rounded-md object-contain"
                />
              </button>
              <div className="flex flex-col ">
                <button className="text-lg font-bold">
                  My workspace enivaga
                </button>
                <p className="text-xs">Free</p>
              </div>
              <button
                className="text-white p-2 rounded-sm bg-[#22262b] hover:bg-white/[15%]"
                onClick={() => setSidebar(false)}
              >
                <BiSolidChevronLeft size={20} />
              </button>
            </div>
            <div className="flex flex-col items-start py-4 font-semibold">
              <button className="w-full text-left flex items-center hover:bg-white/[15%] py-1 px-5">
                <span className="mr-4">
                  <SiTrello size={15} />
                </span>
                Boards
              </button>
              <button className="w-full text-left flex items-center hover:bg-white/[15%] py-1 px-4">
                <span className="mr-4">
                  <MdOutlinePersonOutline size={19} />
                </span>
                Members
                <span className="ml-auto">
                  <BsPlusLg size={20} />
                </span>
              </button>
              <button className="w-full text-left flex items-center hover:bg-white/[15%] py-1 px-4">
                <span className="mr-4">
                  <TbSettings size={19} />
                </span>
                Workplace settings
                <span className="ml-auto">
                  <FiChevronDown size={18} />
                </span>
              </button>
            </div>
            <div className="px-3">
              <h3 className="font-bold">Workspace views</h3>
              <div className="my-3">
                <button className="w-full text-left flex items-center hover:bg-white/[15%] py-1 px-5">
                  <span className="mr-4">
                    <FaTableList size={16} />
                  </span>
                  Table
                </button>
                <button className="w-full text-left flex items-center hover:bg-white/[15%] py-1 px-5">
                  <span className="mr-4">
                    <AiOutlineCalendar size={19} />
                  </span>
                  Calender
                </button>
              </div>
            </div>
            <div className="">
              <h3 className="font-bold px-3">Your Boards</h3>
              <button className="bg-white/[15%] font-bold flex items-center w-full px-5 py-1 my-3">
                <span className="h-5 w-5 background-gradient mr-1"/>
                todo
                <span className="ml-auto flex flex-row items-center gap-2">
                  <SlOptions size={15} />
                  <button
                    onClick={() => setStar(!star)}
                    className="hover:scale-125"
                  >
                    {star ? (
                      <AiOutlineStar size={20} />
                    ) : (
                      <AiFillStar size={20} />
                    )}
                  </button>
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            className="px-2 bg-[#1D2125] absolute z-10 h-screen "
            onClick={() => setSidebar(true)}
          />
          <button
            className="text-white p-1 w-fit h-fit absolute z-20 hover:bg-gray-600 border border-gray-700 rounded-full -rotate-90 mt-3 bg-[#1D2125]"
            onClick={() => setSidebar(true)}
          >
            <FiChevronDown size={18} />
          </button>
        </>
      )}
    </>
  );
};
