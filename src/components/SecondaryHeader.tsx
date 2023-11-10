"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiFillStar, AiFillThunderbolt, AiOutlineStar } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BiFilter } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";

export const SecondaryHeader = () => {
  const [star, setStar] = useState(false);

  return (
    <div className="bg-black/[25%] w-screen pl-6 relative h-fit text-white max-lg:flex-wrap inline-flex flex-row items-center px-2 py-2.5">
      <div className="flex items-center flex-nowrap relative min-h-[32px] max-w-full gap-1">
        <button className="text-lg font-bold px-3 py-1 hover:bg-white/[15%] rounded-[4px] ">
          Trello
        </button>
        <button
          onClick={() => setStar(!star)}
          className="basic-button hover:scale-125"
        >
          {star ? <AiOutlineStar size={20} /> : <AiFillStar size={20} />}
        </button>
        <button className="flex items-center gap-2 basic-button">
          <Image
            src={`/workplace.svg`}
            width={20}
            height={20}
            alt="wp"
            className="invert"
          />
          <span className="hidden 2xl:flex">Workplace visible</span>
        </button>
        <button className="hover:bg-white/[15%] text-white flex items-center gap-1 px-2 py-1 text-sm rounded-sm">
          <Image
            src={`/board.svg`}
            width={20}
            height={20}
            alt="wp"
            className="invert"
          />
          Board
          <FiChevronDown size={25} />
        </button>
      </div>
      <div className="relative flex items-center min-h-[32px] flex-nowrap ml-auto ">
        <button className="basic-button">
          <Image
            src={`/rocket.svg`}
            width={20}
            height={20}
            alt="wp"
            className="invert"
          />
          <span className="hidden 2xl:flex">Power-Ups</span>
        </button>
        <button className="basic-button">
          <AiFillThunderbolt size={20} />
          <span className="hidden 2xl:flex">Automation</span>
        </button>
        <button className="basic-button">
          <BiFilter size={20} />
          <span className="hidden 2xl:flex">Filter</span>
        </button>
        <p className="px-2 text-2xl font-extralight text-gray-500">|</p>
        <div className="flex gap-1">
          <button className="p-[5px] rounded-full font-bold text-gray-180 text-[10px] hover:bg-white/[15%]">
            <div className="bg-[#182946] p-[5px] rounded-full">VN</div>
          </button>
          <button className="bg-gray-300 hover:bg-white text-black flex items-center gap-1 px-2 py-1 text-sm rounded-sm ml-1">
            <Image
              src={`/share.svg`}
              width={20}
              height={20}
              alt="wp"
              className=""
            />
            Share
          </button>
          <button className="basic-button">
            <SlOptions size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
