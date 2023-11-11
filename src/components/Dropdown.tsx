"use client";
import { Popover } from "@mui/material";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DropDownProps {
  title?:string,
  options: string[];
}

export const Dropdown = ({ options,title }: DropDownProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="bg-transparent">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-2 py-1 "
      >
        {title}
        <FiChevronDown size={18} />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className="mt-5"
      >
        <div className="bg-[#1D2125] text-[#9EACBA] w-screen max-w-[250px] border border-gray-800">
          {options?.map((option,index) => (
            <button className="basic-button w-full justify-between" key={index}>
              {option}
              <span className="-rotate-90">
                <FiChevronDown size={18} />
              </span>
            </button>
          ))}
        </div>
      </Popover>
    </div>
  );
};
