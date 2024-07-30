import { Tag } from "antd";
import React from "react";
import { MdOutlineAccessTime } from "react-icons/md";

const TaskBox = () => {
  return (
    <div className="flex flex-col border bg-[#F9F9F9] rounded-lg justify-center items-start p-4 mb-4">
      <p className="text-base font-medium text-[#606060]">
        Implement User Authentication
      </p>
      <p className="text-sm font-normal text-[#797979] mt-1 mb-2.5">
        Develop and integrate user authentication using email and password.
      </p>
      <Tag color="#FF6B6B">Urgent</Tag>
      <div className="flex justify-start items-center my-3">
      <MdOutlineAccessTime size={22}/>
        <p className="text-[#606060] ml-2">2024-08-15</p>
      </div>
      <p className="text-sm text-[#797979] ml-1.5">1 hr ago</p>
    </div>
  );
};

export default TaskBox;
