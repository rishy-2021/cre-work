import React, { FC } from "react";
import ToDo from "./to-do-container";
import InProgress from "./in-progress-container";
import UnderReview from "./under-review";
import Finished from "./finished-container";

interface Props {
  onOpen:(todo:string)=> void;
}

const TaskContainer:FC<Props> = ({onOpen}) => {
  return (
    <div className="flex flex-wrap justify-between items-start bg-white p-4 mt-4 mr-4 rounded-lg">
      <ToDo onOpen={onOpen} />
      <InProgress onOpen={onOpen}/>
      <UnderReview onOpen={onOpen}/>
      <Finished onOpen={onOpen}/>
    </div>
  );
};

export default TaskContainer;
