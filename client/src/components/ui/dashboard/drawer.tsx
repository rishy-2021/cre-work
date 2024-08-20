import { Drawer } from 'antd'
import React, { FC } from 'react'
import TaskMutation, { Task } from './task-mutation'

interface Props {
    open: boolean;
    onClose:()=> void;
    width:string;
    onWidthChange: (width:string) => void;
    action:string;
    task?: Task;
}

const CustomDrawer:FC<Props> = ({open, width, onClose, onWidthChange, action, task}) => {
  return (
    <Drawer closable={false} onClose={onClose} open={open} width={width}>
    <TaskMutation
      onClose={onClose}
      onChangeWidth={onWidthChange}
      taskStatus={action}
      task={task}
    />
  </Drawer>
  )
}

export default CustomDrawer;
