"use client";
import CustomButton, { Position } from "@/components/button";
import { AddTaskInput, Status, Task } from "@/components/ui/dashboard/task-mutation";
import CustomDrawer from "@/components/ui/dashboard/drawer";
import FeatureBox from "@/components/ui/dashboard/feature-box";
import TaskContainer from "@/components/ui/dashboard/task-container";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { LuCalendar } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { SlQuestion } from "react-icons/sl";
import { TbAutomaticGearbox } from "react-icons/tb";
import { apiRequest, updateTask } from "@/utils/api";

const buttonActions = [
  { lebel: "Calendar", icon: <LuCalendar color="gray" size={22} /> },
  { lebel: "Automation", icon: <TbAutomaticGearbox color="gray" size={22} /> },
  { lebel: "Filter", icon: <CiFilter color="gray" size={22} /> },
  { lebel: "Share", icon: <GoShareAndroid color="gray" size={22} /> },
];

const features = [
  {
    image: "undraw_opinion.png",
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    image: "undraw_posts.png",
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    image: "undraw_share.png",
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState("40%");
  const [action, setAction] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleFetchTasks = async () => {
    try {
      const data = await apiRequest('/tasks');
      // setTasks(renameIdField(await response.json()));
      // console.log(response.json())
      setTasks(data);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleTaskUpdate = async (taskId: string, newStatus: string) => {
    console.log('Updating task status:', taskId, newStatus);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
    try {
     const data = await updateTask(taskId, {status:newStatus})
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  };


  useEffect(()=>{
    handleFetchTasks()
  },[])

  return (
    <div className="bg-[#F7F7F7] h-screen w-full py-5 px-4">
      <div className="flex items-center justify-between py-2 pr-3">
        <p className="text-5xl font-semibold text-[#080808]">
          Good morning, Joe!
        </p>
        <div className="flex items-center">
          <p className="mr-2">Help & feedback</p>
          <SlQuestion />
        </div>
      </div>
      <div className="flex flex-wrap justify-between mt-4 pr-4">
        {features.map((feature, idx) => (
          <FeatureBox {...feature} key={idx} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 pr-4">
        <Input
          className="w-48 h-10 text-lg"
          placeholder="Search"
          suffix={<RiSearchLine />}
        />
        <div className="flex justify-between items-center">
          {buttonActions.map(({ lebel, icon }, idx) => (
            <CustomButton
              iconPosition={Position.END}
              title={lebel}
              icon={icon}
              bgColor={`#F4F4F4`}
              color="#797979"
              customStyles="w-full h-10 mr-4"
              onClick={() => {}}
              key={idx}
            />
          ))}
          <CustomButton
            iconPosition={Position.END}
            title="Create new"
            icon={<FaCirclePlus color="white" size={22} />}
            bgColor={`linear-gradient(180deg, #4C38C2 0%, #2F2188 100%),
                linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))`}
            customStyles="w-full h-10"
            color="white"
            onClick={() => {
              setOpen(true);
              setAction("");
            }}
          />
        </div>
      </div>
      <TaskContainer
        tasks={tasks}
        onOpen={(action) => {
          setAction(action);
          setOpen(true);
        }}
        handleTaskUpdate={handleTaskUpdate}
      />
      <CustomDrawer
        open={open}
        width={width}
        onClose={() => {
          setOpen(false)
          handleFetchTasks()
        }}
        onWidthChange={(width) => setWidth(width)}
        action={action}
        key={action}
      />
    </div>
  );
};

export default Dashboard;
