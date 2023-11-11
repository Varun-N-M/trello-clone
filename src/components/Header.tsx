"use client";

import React from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FiChevronDown } from "react-icons/fi";
import { SiTrello } from "react-icons/si";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa";
import { PiQuestion } from "react-icons/pi";
import { BsPlusLg } from "react-icons/bs";
import { Dropdown } from "./Dropdown";

export const Header = () => {
  return (
    <div className="bg-[#1D2125] w-screen absolute z-20 text-[#9EACBA] border border-gray-600 font-semibold  px-2 py-[6px] flex justify-between items-center">
      <div className="flex justify-center items-center">
        <button className="p-1 hover:bg-white/[15%] rounded-md">
          <CgMenuGridO size={21} />
        </button>
        <button className="flex items-center gap-1 text-[19px] font-bold ml-1 px-2 py-1 hover:bg-white/[15%] rounded-md">
          <span>
            <SiTrello size={15} />
          </span>
          Trello
        </button>
        <div className="hidden max-lg:flex max-lg:items-center hover:bg-white/[15%]">
          <Dropdown title="More" options={["Workspace", "Recent", "Starred", "Template"]}/>
          
        </div>
        <div className="flex max-lg:hidden">
          <button className="basic-button">
            Workspaces
            <span>
              <FiChevronDown size={18} />
            </span>
          </button>
          <button className="basic-button">
            Recent
            <span>
              <FiChevronDown size={18} />
            </span>
          </button>
          <button className="basic-button">
            Starred
            <span>
              <FiChevronDown size={18} />
            </span>
          </button>
          <button className="basic-button">
            Template
            <span>
              <FiChevronDown size={18} />
            </span>
          </button>
        </div>
        <button className="px-2 py-1 text-sm text-center hover:bg-blue-300/[95%] rounded-[4px] bg-[#579DFF] text-gray-700 ml-1 flex items-center">
          <span className="max-md:hidden">Create</span>
          <span className="hidden max-md:flex max-md:text-black">
            <BsPlusLg size={20} />
          </span>
        </button>
      </div>
      <div className="flex justify-center items-center gap-1">
        <div className="flex items-center gap-2 px-2 rounded-md border-[0.5px] max-md:py-2 max-md:bg-transparent max-md:border-none border-gray-600 bg-[#22272B] hover:bg-white/[10%] ">
          <AiOutlineSearch size={16} />
          <input
            placeholder="Search"
            className="bg-transparent text-sm outline-none px-2 py-[5px] max-md:hidden "
          />
        </div>
        <button className="p-2 hover:bg-white/[15%] rounded-full ml-2">
          <div className="rotate-45">
            <FaRegBell size={18} />
          </div>
        </button>
        <button className="p-2 hover:bg-white/[15%] rounded-full">
          <PiQuestion size={18} />
        </button>
        <button className="p-[5px] rounded-full font-bold text-gray-180 text-[10px] hover:bg-white/[15%]">
          <div className="bg-[#182946] p-[5px] rounded-full">VN</div>
        </button>
      </div>
    </div>
  );
};
