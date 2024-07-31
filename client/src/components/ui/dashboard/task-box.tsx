import { Tag } from "antd";
import React, { FC } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { AddTaskInput } from "./task-mutation";

interface Props {
  task:AddTaskInput
}

const TaskBox:FC<Props> = ({task}) => {
  return (
    <div className="flex flex-col border bg-[#F9F9F9] rounded-lg justify-center items-start p-4 mb-4">
      <p className="text-base font-medium text-[#606060]">
        {task.title}
      </p>
      <p className="text-sm font-normal text-[#797979] mt-1 mb-2.5">
        {task.description}.
      </p>
      <Tag color="#FF6B6B">{task.priority}</Tag>
      <div className="flex justify-start items-center my-3">
      <MdOutlineAccessTime size={22}/>
        <p className="text-[#606060] ml-2">{task.deadline}</p>
      </div>
      <p className="text-sm text-[#797979] ml-1.5">1 hr ago</p>
    </div>
  );
};

export default TaskBox;
