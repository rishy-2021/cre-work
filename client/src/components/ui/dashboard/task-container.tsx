import React, { FC } from "react";
import ToDo from "./to-do-container";
import InProgress from "./in-progress-container";
import UnderReview from "./under-review";
import Finished from "./finished-container";
import { AddTaskInput } from "./task-mutation";

interface Props {
  onOpen:(todo:string)=> void;
  tasks:AddTaskInput[]
}

const TaskContainer:FC<Props> = ({onOpen, tasks}) => {

  const todos = tasks.filter((task)=> task.status === 'To do');
  const inProgress = tasks.filter((task)=> task.status === 'In progress');
  const underReview = tasks.filter((task)=> task.status === 'Under review');
  const finished = tasks.filter((task)=> task.status === 'Finished');

  return (
    <div className="flex flex-wrap justify-between items-start bg-white p-4 mt-4 mr-4 rounded-lg">
      <ToDo onOpen={onOpen} tasks={todos}/>
      <InProgress onOpen={onOpen} tasks={inProgress}/>
      <UnderReview onOpen={onOpen} tasks = {underReview}/>
      <Finished onOpen={onOpen} tasks = {finished} />
    </div>
  );
};

export default TaskContainer;
