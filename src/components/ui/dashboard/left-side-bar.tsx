"use client";
import Image from "next/image";
import profile from "../../../../public/profile.jpg";
import { Badge, Button } from "antd";
import { LuBellDot } from "react-icons/lu";
import { GoGraph, GoSun } from "react-icons/go";
import { HiOutlineChevronDoubleRight, HiOutlineHome } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiKeyboardLight, PiUsersBold } from "react-icons/pi";
import CustomButton, { Position } from "@/components/button";
import { FaCirclePlus } from "react-icons/fa6";
import { LiaDownloadSolid } from "react-icons/lia";
import CustomDrawer from "./drawer";
import { useState } from "react";

const tabs = [
  { name: "Home", icon: <HiOutlineHome size={23} color="gray" /> },
  { name: "Boards", icon: <PiKeyboardLight size={23} color="gray" /> },
  { name: "Settings", icon: <IoSettingsOutline size={23} color="gray" /> },
  { name: "Teams", icon: <PiUsersBold size={23} color="gray" /> },
  { name: "Analytics", icon: <GoGraph size={23} color="gray" /> },
];

const LeftSideBar = () => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState("40%");
  const [action, setAction] = useState("");

  return (
    <div className="flex flex-col justify-between w-80 h-screen pt-8 px-5 border-r-2">
      <div>
        <div className="flex justify-start items-center">
          <Image src={profile} alt="" className="w-8 h-8 rounded-lg mr-3" />
          <p className="text-[21px] font-medium">Joe gardener</p>
        </div>
        <div className="flex justify-between items-center my-5">
          <div className="w-2/5 flex justify-between items-center">
            <LuBellDot size={22} color="gray" />
            <Badge dot={true} color="#FFB800">
              <GoSun size={22} color="gray" />
            </Badge>
            <HiOutlineChevronDoubleRight size={22} color="gray" />
          </div>
          <Button className="bg-gray-200" type="text">
            Logout
          </Button>
        </div>
        <div>
          {tabs.map((tab, idx) => (
            <div key={idx} className="flex items-center justify-start py-2 px-1.5 first:bg-slate-100 rounded">
              {tab.icon}
              <p className="ml-3 text-lg">{tab.name}</p>
            </div>
          ))}
        </div>
        <div className="mx-1 mt-3">
          <CustomButton
            iconPosition={Position.END}
            title="Create new task"
            icon={<FaCirclePlus color="white" size={22} />}
            bgColor={`linear-gradient(180deg, #4C38C2 0%, #2F2188 100%),
              linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))`}
            customStyles="w-full h-14" color={""} onClick={()=>{setOpen(true)}}/>
        </div>
      </div>
      <div className="bg-gray-100 flex items-center justify-center rounded-lg mb-5">
        <LiaDownloadSolid size={25} />
        <div className="flex flex-col ml-3 py-1.5">
          <p className="text-lg text-gray-900">Download the app</p>
          <p className="text-sm text-gray-500">Get the full experience</p>
        </div>
      </div>
      <CustomDrawer
        open={open}
        width={width}
        onClose={() => setOpen(false)}
        onWidthChange={(width) => setWidth(width)}
        action={action}
      />
    </div>
  );
};

export default LeftSideBar;
