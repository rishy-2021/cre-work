import React, { FC, useEffect, useState } from "react";
import { Button, Divider, Input, Select } from "antd";
import { RxCross2 } from "react-icons/rx";
import CustomButton, { Position } from "@/components/button";
import { GoShareAndroid } from "react-icons/go";
import { FaRegStar } from "react-icons/fa6";
import {
  MdOutlineCreateNewFolder,
  MdOutlineDashboardCustomize,
  MdOutlineZoomOutMap,
  MdZoomInMap,
} from "react-icons/md";
import { AiOutlineSun } from "react-icons/ai";
import { BsExclamationDiamond } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { PiPencilSimpleLight } from "react-icons/pi";
import { LuPlus } from "react-icons/lu";
import TextArea from "antd/es/input/TextArea";
import { z } from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTask } from "@/utils/api";
import DatePicker from "./date-picker";
import { DateTime } from 'luxon';

interface Props {
  onClose: () => void;
  onChangeWidth: (width: string) => void;
  taskStatus?: string;
}

const priority = [
  { lebel: "Urgent", value: "Urgent" },
  { lebel: "Medium", value: "Medium" },
  { lebel: "Low", value: "Low" },
];

const status = [
  { lebel: "To DO", value: "To do" },
  { lebel: "In progress", value: "In progress" },
  { lebel: "Under review", value: "Under review" },
  { lebel: "Finished", value: "Finished" },
];

export enum Status {
  TO_DO = "To do",
  IN_PROGRESS = "In progress",
  UNDER_REVIEW = "Under review",
  FINISHED = "Finished",
}

export enum Priority {
  HIGH = "High",
  URGENT = "Urgent",
  MEDIUM = "Medium",
  LOW = "Low",
}

interface CustomProperties {
  lebel: string;
  value: string;
}

export interface AddTaskInput {
  title: string;
  status: string;
  priority: string;
  deadline: string;
  description: string;
  customProperties?: CustomProperties[];
}

export const addTaskInput: AddTaskInput = {
  title: "",
  status: "",
  priority: "",
  deadline: "",
  description: "",
  customProperties: [],
};

const TaskMutation: FC<Props> = ({ onClose, onChangeWidth, taskStatus }) => {
  const [isZoomOut, setZoomOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const customPropertyValidationSchema = z.object({
    lebel: z.string().min(1, { message: "Lebel is required" }),
    value: z.string().min(1, { message: "Fiels value is required" }),
  });

  const taskValidationSchema = z.object({
    title: z.string().min(1, { message: "Required*" }),
    status: z
      .nativeEnum(Status)
      .nullable()
      .refine((val) => val !== null, {
        message: "Status cannot be null",
      }),
    priority: z
      .nativeEnum(Priority, { required_error: "Priority is required" })
      .nullable()
      .refine((val) => val !== null, {
        message: "Priority cannot be null",
      }),
    deadline: z.object({}),
    description: z.string().min(1, { message: "Description is required" }),
    customProperties: z.array(customPropertyValidationSchema).optional(),
  });

  const form = useForm<AddTaskInput>({
    defaultValues: { ...addTaskInput },
    resolver: zodResolver(taskValidationSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = form;
  const taskCustomProperties = useFieldArray({
    control,
    name: "customProperties",
  });

  const onSubmit = async (formData: AddTaskInput) => {
    setIsLoading(true);
    try {
      const newTask = await createTask(formData);
      if (newTask) {
        onClose();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (taskStatus) {
      reset({ ...addTaskInput, status: taskStatus });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <Button
            icon={<RxCross2 size={22} />}
            type="text"
            onClick={() => {
              onClose();
              onChangeWidth("45%");
              reset();
            }}
          />
          <Button
            icon={
              isZoomOut ? (
                <MdZoomInMap size={22} />
              ) : (
                <MdOutlineZoomOutMap size={22} />
              )
            }
            type="text"
            className="ml-2"
            onClick={() => {
              onChangeWidth(isZoomOut ? "45%" : "100%");
              setZoomOut(!isZoomOut);
            }}
          />
        </div>
        <div className="flex">
          <CustomButton
            iconPosition={Position.END}
            title={"Share"}
            icon={<GoShareAndroid color="gray" size={21} />}
            bgColor={`#F4F4F4`}
            color={"#797979"}
            customStyles="w-full h-9 mr-4"
            onClick={() => {}}
          />
          <CustomButton
            iconPosition={Position.END}
            title={"Favorite"}
            icon={<FaRegStar color="gray" size={21} />}
            bgColor={`#F4F4F4`}
            color={"#797979"}
            customStyles="w-full h-9 mr-4"
            onClick={() => {}}
          />
        </div>
      </div>
      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Input
                placeholder="Title"
                className={`h-14 text-5xl font-semibold text-[#CCCCCC] border-none`}
                onChange={onChange}
                value={value}
                status={error && "error"}
                suffix={
                  error && (
                    <p
                      className={
                        "flex text-sm items-start justify-start h-full px-1 text-red-600"
                      }
                    >
                      {error.message}
                    </p>
                  )
                }
              />
            </>
          );
        }}
        name="title"
      />
      <div className="">
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <div className="flex my-5">
                <div className="flex items-center w-1/3 px-3">
                  <AiOutlineSun size={20} color="gray" />
                  <p className="ml-7">Status</p>
                </div>
                <Select
                  placeholder="Select status"
                  onChange={onChange}
                  options={status}
                  disabled={!!taskStatus}
                  value={value || null}
                  className="w-40"
                  status={error && "error"}
                />
                {error && (
                  <p
                    className={
                      "flex text-sm items-center h-8 pl-4 text-red-600"
                    }
                  >
                    Required*
                  </p>
                )}
              </div>
            );
          }}
          name="status"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <div className="flex my-5">
                <div className="flex items-center w-1/3 px-3">
                  <BsExclamationDiamond size={20} color="gray" />
                  <p className="ml-7">Priority</p>
                </div>
                <Select
                  placeholder="Select status"
                  onChange={onChange}
                  options={priority}
                  className="w-40"
                  value={value || null}
                  status={error && "error"}
                />
                {error && (
                  <p
                    className={
                      "flex text-sm items-center h-8 pl-4 text-red-600"
                    }
                  >
                    Required*
                  </p>
                )}
              </div>
            );
          }}
          name="priority"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <div className="flex my-5">
                <div className="flex items-center w-1/3 px-3">
                  <CiCalendar size={20} />
                  <p className="ml-7">deadline</p>
                </div>
                <DatePicker
                  placeholder="Select date"
                  className="w-40"
                  status={error && "error"}
                  onChange={(v) => v && onChange(v.toUTC().toISO())}
                  value={value ? DateTime.fromISO(value) : null}
                />
                {error && (
                  <p
                    className={
                      "flex text-sm items-center h-8 pl-4 text-red-600"
                    }
                  >
                    Required*
                  </p>
                )}
              </div>
            );
          }}
          name="deadline"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <div className="flex my-5">
                <div className="flex items-start w-1/3 px-3">
                  <PiPencilSimpleLight size={20} color="gray" />
                  <p className="ml-7">Description</p>
                </div>
                <TextArea
                  className="outline-0 border-0 w-40 h-10"
                  placeholder="Description"
                  value={value}
                  onChange={onChange}
                  status={error && "error"}
                />
                {error && (
                  <p
                    className={
                      "flex text-sm items-center h-8 pl-4 text-red-600"
                    }
                  >
                    Required*
                  </p>
                )}
              </div>
            );
          }}
          name="description"
        />
        {taskCustomProperties.fields.map(({ lebel, value, id }, index) => (
          <div className="flex my-5" key={id}>
            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <div className="flex items-center w-1/3 px-3" key={id}>
                    <MdOutlineDashboardCustomize size={20} color="gray" />
                    <Input
                      className="outline-0 border-0 w-32 ml-5"
                      placeholder="lebel"
                      value={value}
                      onChange={onChange}
                      status={error && "error"}
                      suffix={
                        error && (
                          <p
                            className={
                              "flex text-xs items-start pl-4 text-red-600"
                            }
                          >
                            Required*
                          </p>
                        )
                      }
                    />
                  </div>
                );
              }}
              name={`customProperties.${index}.lebel`}
            />
            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    className="outline-0 border-0 w-40"
                    placeholder="value"
                    value={value}
                    onChange={onChange}
                    status={error && "error"}
                    suffix={
                      error && (
                        <p className={"text-xs items-center pl-4 text-red-600"}>
                          Required*
                        </p>
                      )
                    }
                  />
                );
              }}
              name={`customProperties.${index}.value`}
            />
          </div>
        ))}
        <div
          className="flex justify-start w-60 items-center my-2 pl-3 hover:bg-gray-200 rounded-lg p-3 cursor-pointer"
          onClick={() => taskCustomProperties.append({ lebel: "", value: "" })}
        >
          <LuPlus size={20} />
          <p className="ml-7 text-lg">Add custom property</p>
        </div>
        <Button
          style={{
            background: `linear-gradient(180deg, #4C38C2 0%, #2F2188 100%),
              linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))`,
          }}
          className="w-56 text-white text-lg font-medium mt-7"
          icon={<MdOutlineCreateNewFolder size={20} />}
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          Save task
        </Button>
      </div>
      <Divider className="my-5" />
      <p className="text-[#C0BDBD] text-lg">
        Start writing, or drag your own files here.
      </p>
    </div>
  );
};

export default TaskMutation;
