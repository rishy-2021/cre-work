import { Tag } from "antd";
import React, { FC } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { AddTaskInput } from "./task-mutation";
import { DateTime } from "luxon";

interface Props {
  task:AddTaskInput
}

const priorityColors = {
  Urgent : "#FF6B6B",
  Medium: "#FFA235",
  Low: "#0ECC5A"
}

const TaskBoxBody:FC<Props> = ({task}) => {
  return (
    <div className="flex flex-col border bg-[#F9F9F9] rounded-lg justify-center items-start p-4 mb-4">
      <p className="text-base font-medium text-[#606060]">
        {task.title}
      </p>
      <p className="text-sm font-normal text-[#797979] mt-1 mb-2.5">
        {task?.description}.
      </p>
      <Tag color={ task.priority === "Urgent" ? "#FF6B6B": task.priority ==="Medium" ? "#FFA235" : "#FF6B6B"} className="rounded-lg py-0.5 px-1.5">{task?.priority}</Tag>
    {task.deadline &&   <div className="flex justify-start items-center mt-3">
      <MdOutlineAccessTime size={22}/>
        <p className={`ml-2`}>{task.deadline && DateTime.fromISO(task.deadline).toLocaleString()}</p>
      </div>}
      <p className="text-sm text-[#797979] ml-1.5 mt-3">1 hr ago</p>
    </div>
  );
};

export default TaskBoxBody;
